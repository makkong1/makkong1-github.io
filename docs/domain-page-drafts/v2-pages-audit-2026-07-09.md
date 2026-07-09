# V2 도메인 페이지 감사 (2026-07-09)

> 목적: `src/pages/projects/petory/domains/*DomainV2.jsx` 8개를 각 도메인의 `docs/domain-page-drafts/*-domain-v2-content.md` 드래프트 + 최신 `docs/domains/*.md` / `docs/architecture/*` 문서와 대조한 결과.
> User 도메인은 이미 처리 완료(휴면 계정 섹션 추가). 나머지 7개 도메인은 **아직 미반영** — 당장 작업하지 않고 여기 기록만 해둔다.
>
> **주의**: 각 도메인에 공통으로 있던 "한계와 운영 메모(#limits) 섹션 추가" 제안은 의도적으로 이 문서에서 제외했다. User 페이지에 한 번 넣었다가 다시 뺐음 — 앞으로도 한계 섹션은 추가하지 않는 방향으로 간다.

---

## 우선순위 1 — 팩트 오류 (내용이 실제와 반대)

### MissingPet
- `MissingPetDomainV2.jsx`의 "자기 글 채팅 시작 차단 — `createMissingPetChat()`에서 제보자와 목격자 동일 여부 검증" 문구가 **틀림**. 실제로는 차단하지 않는다.
  - 근거: `docs/domains/missingpet.md:302, 374`, `docs/architecture/missingpet/실종 제보 아키텍처.md:307`, `docs/troubleshooting/missing-pet/potential-issues.md` 4.3(🔴 미해결로 분류)
  - 이 오류는 draft 문서(`missingpet-domain-v2-content.md`) 자체가 먼저 잘못 주장했고 JSX가 그대로 반영한 것으로 보임 — draft도 같이 정정 필요.
  - 조치안: 해당 bullet을 삭제하거나 "자기 글 채팅 시작은 별도로 차단하지 않음(알려진 한계)"으로 정정.

### Recommendation
- `RecommendationDomainV2.jsx` (라인 340, 582 부근) "1음절 한글은 형태소 exact match" → 실제로는 **1~2음절**. 현재 문구대로면 2음절 키워드가 반대 처리 경로(raw substring)로 빠지는 것처럼 읽혀 의미가 뒤집힘.
  - 근거: `docs/troubleshooting/petRecommendation/nlp-server-issues-2026-06-09.md:54` ("`_KO_TAG_MAP` 키가 1~2음절 단어"), `docs/architecture/recommendation/반려생활 추천 & NLP 아키텍처.md`
- 라인 582 `("아파트"→MEDICAL 오탐 방지)` 예시는 어느 문서에도 없음. 실제 구분은 "짧은 키워드(≤2자, exact match) vs `"밥을 안"`/`"안 먹"` 같은 구문(raw substring)"이지 "3음절 이상 단어"가 아님.
  - 근거: `docs/troubleshooting/petRecommendation/nlp-server-issues-2026-06-09.md` §해결방법 5
- 라인 594 "회귀 테스트 16개(오탐 방지 8 + 정상 8)" — 어느 문서에도 근거 없음. 실제 숫자 확인 후 수정하거나 제거.

---

## 우선순위 2 — 최근 추가된 정책/기능이 페이지에 통째로 빠짐

세 도메인 모두 **제재(SUSPENDED/BANNED) 정책**이 backend에 최근(2026-06-28~) 추가됐는데 V2 페이지엔 반영이 안 됨. User/Care/Chat/Meetup 공통 뿌리(제재 이벤트 전파) 이슈라 한 번에 묶어서 처리하는 게 효율적일 수 있음.

### Chat
- 제재 사용자 처리 기능 전체 누락: 메시지 전송 차단(`sendMessage()`가 sender `isSanctioned()`면 403), 목록/상세 DTO `hasSanctionedParticipant` 플래그, Care 거래 확정 차단, Meetup 취소 연동. Detail 페이지(`/domains/chat/detail`)엔 이미 반영했지만 V2 개요 페이지(`/domains/chat`)엔 없음.
  - 근거: `docs/domains/chat.md` §8("제재 정책 2026-06-28~"), `docs/architecture/chat/채팅 시스템 설계.md` §6.1

### Care
- 제재 상태일 때 요청 생성·댓글·거래 확정을 차단하는 정책 전체가 누락. Card A(거래 확정) 스니펫도 실제로는 비관적 락+에스크로 생성 사이에 "ACTIVE 참여자 제재 상태 확인"·"requester/provider 제재 재확인" 단계가 있는데 스니펫에 없음.
  - 근거: `docs/domains/care.md` §15, `docs/architecture/care/펫 케어 & 매칭 아키텍처.md:214, 220`

### Meetup
- 제재 시 모집중(RECRUITING) 모임을 자동 취소하고 참가자 row를 제거하는 정책(`UserSanctionAppliedEvent` → `AFTER_COMMIT`/`REQUIRES_NEW`)이 페이지에 없음.
  - 근거: `docs/domains/meetup.md` §15("제재 정책 2026-06-28~")
- (별개 이슈) 동시성 방어를 "비관적 락 + 원자적 UPDATE + PK 충돌 보정" 3개로만 서술 — 실제로는 **DB CHECK 제약까지 4중 방어** (`chk_participants: current_participants <= max_participants`). Detail 페이지엔 이미 4중으로 반영돼 있으니 V2도 맞추면 됨.
  - 근거: `docs/troubleshooting/meetup/race-condition-participants.md` §2.2

---

## 우선순위 3 — 세부 보완

### Board
- "실시간 vs 배치" 반응(좋아요) 신규 insert 코드 스니펫이 `boardReactionRepository.save(newReaction)`으로 돼 있는데, 실제 구현은 동시성 안전을 위해 `insertIgnore`를 쓴다.
  - 근거: `docs/domains/board.md:173, 182`, 아키텍처 문서 toggle 플로우차트 `Insert["insertIgnore"]` 노드

### Location
- 최근(2026-05-29) 반영된 반경검색 SQL `LIMIT :limit` 직접 적용이 코드 예시에 빠짐(Java `stream().limit()` → SQL LIMIT으로 바뀐 부분).
  - 근거: `docs/domains/location.md` §6, 아키텍처 문서 §6.1
- "이 지역 검색" 버튼 표시 기준이 "충분히 다를 때"로만 서술되고 실제 수식(`max(300m, radius*10%)`)이 안 적힘.
  - 근거: 아키텍처 문서 §3
- (확인 필요, 확신도 낮음) `sort=stable` 정렬 기준에 "거리"가 tie-break로 들어간다는 서술이 있는데, 문서상 `stable`의 tie-break는 `rating DESC, review_count DESC, idx ASC`로 거리가 없음. 실제 코드 확인 후 정정.

---

## 처리 순서 제안 (참고용, 확정 아님)

1. MissingPet, Recommendation 팩트 오류 정정 (근거가 명확하고 작업량 작음)
2. Meetup CHECK 제약 문구 보강 (Detail 페이지 내용 그대로 가져오면 됨, 작업량 작음)
3. Care / Chat / Meetup 제재 정책 반영 (세 도메인 다 비슷한 패턴이라 한 번에 묶어서)
4. Board insertIgnore 스니펫 정정, Location SQL LIMIT·임계값 수치 보강
