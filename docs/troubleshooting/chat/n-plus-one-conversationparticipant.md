# 채팅방 참여자 조회 N+1 쿼리 문제

## 📋 요약

**문제**: `ConversationParticipant` 조회 경로에서 N+1 쿼리가 발생하여, 채팅방 수에 비례해 DB 왕복이 증가함.

**케이스**
- **케이스 A** (`getConversation`): `participantRepository.findByConversationIdxAndStatus()` 단건 조회가 경로에 따라 반복될 수 있음.
- **케이스 B** (`getMyConversations`): `ConversationConverter.toDTO()`에서 `conversation.getParticipants()` 접근으로 `@OneToMany(LAZY)` 개별 lazy load → **수정 완료**.

**추가 이슈**: `findLatestMessagesByConversationIdxs` 서브쿼리 컬럼명 오타 (`conversation_ids_deleted` → `is_deleted`).

---

## 1. 문제 상황

### 1.1 케이스 A — `getConversation()` 단건 참여자 쿼리

`status` 조건이 포함된 참여자 조회가 채팅방(또는 반복 단위) 수만큼 반복될 수 있음:

```
-- status 필터 포함, 반복
select ... from conversationparticipant where conversation_idx=? and status=?
select ... from conversationparticipant where conversation_idx=? and status=?
```

### 1.2 케이스 B — `getMyConversations()` Converter lazy load ✅ 수정 완료

배치 쿼리가 정상 실행된 직후, **status/isDeleted 필터 없는** lazy load가 채팅방 수만큼 추가로 발생하던 현상(수정 전):

```
-- 배치 쿼리 (정상)
[Repository] 채팅 참여자: 채팅방 목록+상태 조회 (배치)  → IN (?,?,?)
[Repository] 채팅 메시지: 채팅방별 최신 메시지 배치 조회 → IN (?,?,?)

-- 그 뒤 N+1 (수정 전)
select ... from conversationparticipant where conversation_idx=?  ← lazy load
select ... from conversationparticipant where conversation_idx=?
```

### 1.3 영향 범위

- **케이스 A**: `GET /api/conversations/{idx}` (채팅방 단건 조회)
- **케이스 B**: `GET /api/conversations` (채팅방 목록 조회) — 수정 완료
- **심각도**: 채팅방이 많을수록 DB 쿼리 수가 선형으로 증가

---

## 2. 원인 분석

### 2.1 케이스 A — 단건 Repository 호출

**파일**: `backend/main/java/com/linkup/Petory/domain/chat/service/ConversationService.java`

`conversationIdx` 하나를 받는 단건 조회가 호출 경로상 반복되면 N+1에 해당함:

```java
// getConversation() 내부 예시
List<ConversationParticipant> participants =
    participantRepository.findByConversationIdxAndStatus(conversationIdx, ParticipantStatus.ACTIVE);
```

### 2.2 케이스 B — Converter에서 LAZY 컬렉션 접근 ✅ 수정 완료

**파일**: `backend/main/java/com/linkup/Petory/domain/chat/converter/ConversationConverter.java`

`getMyConversations()`에서 `Conversation`이 `participants`를 초기화하지 않은 상태로 로드된 뒌, 컨버터가 `getParticipants()`를 호출하면 Hibernate가 채팅방마다 별도 SELECT를 발행함.

**문제 코드 (수정 전)**:

```java
.participantCount(conversation.getParticipants() != null
    ? conversation.getParticipants().size() : 0);  // LAZY → N회 쿼리
```

### 2.3 참고 — 목록 API의 배치 조회 패턴

**파일**: `ConversationService.getMyConversations()` (동일 서비스 내)

목록 경로에서는 이미 배치 조회를 사용 중:

```java
List<ConversationParticipant> allParticipants =
    participantRepository.findParticipantsByConversationIdxsAndStatus(
        conversationIdxs, ParticipantStatus.ACTIVE);
```

단건/다른 API에서도 동일한 배치 메서드 재사용 또는 FETCH 전략을 맞추는 것이 일관됨.

### 2.4 SQL 오타 — 최신 메시지 서브쿼리

**위치**: `ConversationRepository` — `findLatestMessagesByConversationIdxs` JPQL/Native 서브쿼리

```sql
-- 오타 (실제 컬럼명과 불일치)
cm2_0.conversation_ids_deleted = 0

-- 기대 컬럼명
cm2_0.is_deleted = 0
```

오타가 있으면 삭제 메시지 필터가 깨져 최신 메시지 표시가 잘못될 수 있음.

---

## 3. 해결 방안

### 3.1 케이스 A — 배치 메서드로 통일

`getConversation()` 등에서 단건 조회를 기존 배치 API로 치환:

```java
// 수정 전
List<ConversationParticipant> participants =
    participantRepository.findByConversationIdxAndStatus(conversationIdx, ParticipantStatus.ACTIVE);

// 수정 후 (단일 ID를 리스트로 넘겨 재사용)
List<ConversationParticipant> participants =
    participantRepository.findParticipantsByConversationIdxsAndStatus(
        List.of(conversationIdx), ParticipantStatus.ACTIVE);
```

### 3.2 근본 대안 — JOIN FETCH 또는 `@EntityGraph`

참여자를 채팅방과 함께 한 번에 로드:

```java
@Query("SELECT c FROM Conversation c JOIN FETCH c.participants p WHERE c.idx = :idx AND p.status = :status")
Optional<Conversation> findByIdxWithActiveParticipants(
    @Param("idx") Long idx,
    @Param("status") ParticipantStatus status);
```

### 3.3 SQL 오타 수정

`findLatestMessagesByConversationIdxs`에서:

```sql
-- 수정 전
AND cm2_0.conversation_ids_deleted = 0
-- 수정 후
AND cm2_0.is_deleted = 0
```

---

## 4. 해결 상태

### 4.1 케이스 B — 적용 완료

- **Converter**: `getParticipants()` 접근 제거 후 `participantCount(0)` 등으로 두고, 서비스에서 덮어쓰기.
- **Service**: `getMyConversations()`에서 배치로 로드한 `participants` 기준으로 `setParticipantCount(participants.size())` 등 집계 반영.

```java
// ConversationConverter — LAZY 컬렉션 직접 접근 제거
.participantCount(0);  // service에서 배치 로드 후 setParticipantCount()로 덮어씀

// ConversationService.getMyConversations()
dto.setParticipantCount(participants.size());  // participantsMap 기반
```

### 4.2 케이스 A·SQL 오타 — 확인 필요

- **케이스 A**: 단건 경로를 배치 메서드 또는 FETCH 조회로 맞추는지 코드베이스 기준으로 최종 확인.
- **SQL 오타**: `findLatestMessagesByConversationIdxs` 실제 배포 쿼리와 컬럼명 일치 여부 확인.

---

## 5. 핵심 포인트

1. **루프·다건 처리 안의 단건 Repository 호출 지양**: `findByXxx(singleId)` 패턴은 N+1의 직접 원인이 됨.
2. **Converter에서 LAZY 컬렉션 접근 지양**: `entity.getCollection().size()`는 호출 시점에 DB 쿼리를 유발함. 집계는 Service에서 이미 로드된 데이터로 설정.
3. **배치 API 우선**: `findXxxByIdxIn(List<Long> idxs)` 형태로 설계·재사용.
4. **쿼리 관측**: `spring.jpa.show-sql=true`, `logging.level.org.hibernate.SQL=DEBUG` 등으로 개발 중 N+1 조기 탐지.
