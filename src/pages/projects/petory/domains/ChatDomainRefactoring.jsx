import { Link } from 'react-router-dom';
import TableOfContents from '../../../../components/Common/TableOfContents';

function ChatDomainRefactoring() {
  const sections = [
    { id: 'intro', title: '리팩토링 개요' },
    { id: 'idor-rest', title: 'REST IDOR·실종 start-chat' },
    { id: 'active-participant-messages', title: '메시지 API ACTIVE 참여자 검증' },
    { id: 'patch-conversation-status', title: 'PATCH 채팅방 상태 권한' },
    { id: 'conversation-creator', title: 'ConversationCreatorService·REQUIRES_NEW' },
    { id: 'missing-pet-n1', title: '실종 채팅 N+1 배치 조회' },
    { id: 'fulltext-search', title: '메시지 검색 FULLTEXT' },
    { id: 'conversation-readonly', title: 'ConversationService readOnly' },
    { id: 'websocket-exception', title: 'WebSocket 예외 통일' },
    { id: 'review-summary', title: '코드 리뷰 점수판·조치 요약' },
    { id: 'summary', title: '요약·잔여 이슈' },
    { id: 'related-docs', title: '관련 문서' }
  ];

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <div style={{ marginBottom: '1rem' }}>
            <Link
              to="/domains/chat"
              style={{
                color: 'var(--link-color)',
                textDecoration: 'none',
                fontSize: '0.9rem'
              }}
            >
              ← Chat 도메인으로 돌아가기
            </Link>
          </div>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Chat 도메인 리팩토링</h1>

          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>리팩토링 개요</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                2026-04-14 기준 <strong style={{ color: 'var(--text-color)' }}>domain/chat/</strong> 코드 리뷰 및
                <strong style={{ color: 'var(--text-color)' }}> 보안·트랜잭션·검색</strong> 정리 결과를 포트폴리오 형식으로 요약합니다.
                상세 원문은 아래 GitHub 문서와 동일합니다.
              </p>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                border: '1px solid var(--nav-border)'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>대상</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '0.9rem'
                }}>
                  <li>• <code style={{ backgroundColor: 'var(--card-bg)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>domain/chat/controller/*</code>, <code style={{ backgroundColor: 'var(--card-bg)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>ConversationService</code>, <code style={{ backgroundColor: 'var(--card-bg)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>ChatMessageService</code></li>
                  <li>• <code style={{ backgroundColor: 'var(--card-bg)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>MissingPetBoardController</code> (실종 채팅 시작)</li>
                  <li>• <code style={{ backgroundColor: 'var(--card-bg)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>MeetupChatRoomEventListener</code>, <code style={{ backgroundColor: 'var(--card-bg)', padding: '0.15rem 0.35rem', borderRadius: '4px' }}>ConversationCreatorService</code> (신규)</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="idor-rest" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>REST IDOR·실종 start-chat</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><code>ChatMessageController</code>·<code>ConversationController</code>에서 <code>userId</code>·<code>senderIdx</code>·<code>requesterId</code>·<code>providerId</code>·<code>user1Id</code>·<code>user2Id</code> 등을 <strong>요청 파라미터</strong>로 받아, 로그인 주체와 불일치해도 호출 가능한 <strong>IDOR</strong> 위험.</p>
                <p style={{ marginTop: '0.75rem' }}>실종 채팅 <code>POST .../start-chat</code>에서 목격자를 클라이언트 파라미터로 받으면 동일 계열 위험.</p>
              </div>
            </div>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>적용 결과 ✅</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem'
              }}>
                <li>• JWT <code>principal</code>만으로 사용자 식별 — <code>Long.parseLong(authentication.getName())</code> 등, 스푸핑 파라미터 제거</li>
                <li>• 펫케어 채팅 생성: <code>CareApplication</code> 기준 당사자 검증</li>
                <li>• 직접 채팅: <code>otherUserId</code>만 수신, 본인은 토큰에서 결정</li>
                <li>• <code>MissingPetBoardController</code>: 목격자는 <strong>토큰 사용자만</strong>, <code>witnessId</code> 파라미터 제거</li>
              </ul>
            </div>
          </section>

          <section id="active-participant-messages" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>메시지 API ACTIVE 참여자 검증</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><code>getMessagesBefore</code>·<code>searchMessages</code> 등에 <strong>참여자 검증이 없거나</strong> <code>userId</code> 스푸핑에 취약해, 비참여 방 메시지 커서 조회·검색이 가능했음.</p>
                <p style={{ marginTop: '0.75rem' }}><code>getMessages</code>·<code>getUnreadCount</code>·<code>deleteMessage</code>(방 소속) 등도 동일 패턴으로 통일 필요.</p>
              </div>
            </div>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>적용 결과 ✅</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem'
              }}>
                <li>• <code>ChatMessageService</code>에서 <code>requireActiveParticipant</code> 패턴으로 통일 후 목록·커서·검색·읽음·unread·삭제 수행</li>
              </ul>
            </div>
          </section>

          <section id="patch-conversation-status" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>PATCH 채팅방 상태 권한</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><code>PATCH .../conversations/{'{id}'}/status</code>에 참여자·역할 검증이 없어, 인증만 되면 <strong>임의 채팅방</strong> 상태 변경 가능.</p>
              </div>
            </div>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>적용 결과 ✅</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem'
              }}>
                <li>• <code>updateConversationStatus</code>: <strong>ACTIVE 참여자</strong>만 허용 (방장 전용 정책은 미적용, 필요 시 별도 이슈)</li>
              </ul>
            </div>
          </section>

          <section id="conversation-creator" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>ConversationCreatorService·REQUIRES_NEW</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><code>ConversationService</code> 내부에서 <code>createConversation</code>(<code>@Transactional(REQUIRES_NEW)</code>)를 <strong>동일 클래스 self-invocation</strong>으로 호출해 Spring AOP 프록시를 거치지 않음 → <code>REQUIRES_NEW</code>가 무시될 수 있음.</p>
                <p style={{ marginTop: '0.75rem' }}>주석의 &quot;별도 트랜잭션&quot; 의도와 실제 동작 불일치.</p>
              </div>
            </div>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>적용 결과 ✅</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem'
              }}>
                <li>• <code>ConversationCreatorService</code> 분리 + <code>actingUserId</code>가 참여자 목록에 포함될 때만 생성 허용</li>
                <li>• <code>MeetupChatRoomEventListener</code>는 해당 빈을 직접 호출</li>
              </ul>
            </div>
          </section>

          <section id="missing-pet-n1" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>실종 채팅 N+1 배치 조회</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><code>createMissingPetChat()</code> 루프 안에서 방마다 <code>participantRepository.findByConversationIdxAndStatus</code> 반복 호출 → <strong>N+1</strong>.</p>
              </div>
            </div>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>적용 결과 ✅</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem'
              }}>
                <li>• <code>findParticipantsByConversationIdxsAndStatus</code> 배치 조회 후 <code>groupingBy</code>로 메모리 매칭</li>
              </ul>
            </div>
          </section>

          <section id="fulltext-search" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>메시지 검색 FULLTEXT</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p>양방향 LIKE 패턴(<code style={{ backgroundColor: 'var(--bg-color)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>%keyword%</code>)으로 B-tree 인덱스 미활용 → 데이터 증가 시 풀스캔·성능 저하.</p>
              </div>
            </div>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>적용 결과 ✅</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem'
              }}>
                <li>• MySQL <code>MATCH(m.content) AGAINST</code> + <code>idx_chat_message_content</code> FULLTEXT (<code>docs/migration/db/indexes.sql</code>)</li>
                <li>• <code>JpaChatMessageAdapter</code>에서 idx 순서 재조회</li>
                <li>• DB에 FULLTEXT 미적용 시 검색 쿼리 실패 가능 — 운영 반영 시 확인</li>
              </ul>
            </div>
          </section>

          <section id="conversation-readonly" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>ConversationService readOnly</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p>클래스 레벨 <code>@Transactional(readOnly = true)</code> 미적용으로 조회 메서드 간 트랜잭션 경계·LAZY 패턴이 불균형할 수 있음.</p>
              </div>
            </div>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>적용 결과 ✅</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem'
              }}>
                <li>• 클래스에 <code>@Transactional(readOnly = true)</code>, 쓰기 메서드만 <code>@Transactional</code> 유지</li>
              </ul>
            </div>
          </section>

          <section id="websocket-exception" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>WebSocket 예외 통일</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제점</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p><code>ChatWebSocketController</code>에서 사용자 미존재 등에 일반 <code>RuntimeException</code> 사용 → 도메인 예외와 혼재, 에러 계약 불명확.</p>
              </div>
            </div>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>적용 결과 ✅</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem'
              }}>
                <li>• <code>sendMessage</code> 경로에서 <code>UserNotFoundException</code> 등 기존 도메인 예외로 통일</li>
              </ul>
            </div>
          </section>

          <section id="review-summary" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>코드 리뷰 점수판·조치 요약</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>점수판 (리뷰 기준 A~E)</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem'
                }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>카테고리</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>Critical</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>Warning</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-color)' }}>Info</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={{ padding: '0.75rem' }}>JPA/쿼리 (A)</td>
                      <td style={{ padding: '0.75rem' }}>1</td>
                      <td style={{ padding: '0.75rem' }}>1</td>
                      <td style={{ padding: '0.75rem' }}>0</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={{ padding: '0.75rem' }}>트랜잭션 (B)</td>
                      <td style={{ padding: '0.75rem' }}>1</td>
                      <td style={{ padding: '0.75rem' }}>1</td>
                      <td style={{ padding: '0.75rem' }}>0</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={{ padding: '0.75rem' }}>보안 (C)</td>
                      <td style={{ padding: '0.75rem' }}>3</td>
                      <td style={{ padding: '0.75rem' }}>0</td>
                      <td style={{ padding: '0.75rem' }}>0</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={{ padding: '0.75rem' }}>정합성 (D)</td>
                      <td style={{ padding: '0.75rem' }}>0</td>
                      <td style={{ padding: '0.75rem' }}>1</td>
                      <td style={{ padding: '0.75rem' }}>0</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem' }}>코드품질 (E)</td>
                      <td style={{ padding: '0.75rem' }}>0</td>
                      <td style={{ padding: '0.75rem' }}>1</td>
                      <td style={{ padding: '0.75rem' }}>1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ marginTop: '1rem', marginBottom: 0, color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>판정</strong>: 원본 기준 수정 필요였음. 조치 반영 후 Critical·Warning 대부분 해소. 잔여는 D1 유니크(소프트 삭제·재참여 모델과 충돌 가능) 보류.
              </p>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>조치 요약 (원본 이슈 → 조치)</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem'
                }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <th style={{ padding: '0.6rem', textAlign: 'left', color: 'var(--text-color)', width: '28%' }}>원본 이슈</th>
                      <th style={{ padding: '0.6rem', textAlign: 'left', color: 'var(--text-color)' }}>조치</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={{ padding: '0.6rem', verticalAlign: 'top' }}>C1 IDOR</td>
                      <td style={{ padding: '0.6rem' }}>컨트롤러에서 userId/senderIdx 등 제거, JWT principal만. 펫케어 채팅은 CareApplication 검증. 직접 채팅은 otherUserId만.</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={{ padding: '0.6rem', verticalAlign: 'top' }}>C2 /before·/search</td>
                      <td style={{ padding: '0.6rem' }}>ACTIVE 참여자 검증, getMessages·getUnreadCount·deleteMessage 동일 패턴.</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={{ padding: '0.6rem', verticalAlign: 'top' }}>C3 PATCH /status</td>
                      <td style={{ padding: '0.6rem' }}>updateConversationStatus에 ACTIVE 참여자 검증.</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={{ padding: '0.6rem', verticalAlign: 'top' }}>B5 REQUIRES_NEW</td>
                      <td style={{ padding: '0.6rem' }}>ConversationCreatorService 분리, MeetupChatRoomEventListener는 해당 빈 직접 호출.</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={{ padding: '0.6rem', verticalAlign: 'top' }}>A2 실종 N+1</td>
                      <td style={{ padding: '0.6rem' }}>createMissingPetChat 배치 조회 + 메모리 매칭.</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={{ padding: '0.6rem', verticalAlign: 'top' }}>A3 검색</td>
                      <td style={{ padding: '0.6rem' }}>MATCH AGAINST + idx_chat_message_content FULLTEXT.</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={{ padding: '0.6rem', verticalAlign: 'top' }}>B readOnly</td>
                      <td style={{ padding: '0.6rem' }}>ConversationService 클래스 readOnly, 쓰기만 @Transactional.</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--nav-border)' }}>
                      <td style={{ padding: '0.6rem', verticalAlign: 'top' }}>E1 WebSocket</td>
                      <td style={{ padding: '0.6rem' }}>UserNotFoundException으로 통일.</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.6rem', verticalAlign: 'top' }}>실종 start-chat</td>
                      <td style={{ padding: '0.6rem' }}>목격자는 토큰 사용자만(witnessId 제거).</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section id="summary" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>요약·잔여 이슈</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>상태</h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>개선 완료</strong> (2026-04-14). 백엔드 보안·트랜잭션·검색 정리 문서와 동일한 범위입니다.
              </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '0.9rem'
              }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>잔여(D1)</strong>: <code>ConversationParticipant</code> 단순 <code>(conversation_idx, user_idx)</code> UNIQUE는 LEFT·소프트 삭제 이력과 충돌 가능 → 데이터 정리 또는 부분 유니크 전략 후 별도 마이그레이션 권장(보류).</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>Info</strong>: SendMessageRequest/CreateConversationRequest record 검토, WebSocket Principal + findByIdString 패턴은 REST와 대비해 양호.</li>
              </ul>
            </div>
          </section>

          <section id="related-docs" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>관련 문서</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.9'
              }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a
                    href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/refactoring/chat/chat-code-review-2026-04-14.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none', fontWeight: 'bold' }}
                  >
                    → Chat 도메인 코드 리뷰 결과 (전문)
                  </a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a
                    href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/refactoring/chat/chat-backend-security-transaction-2026-04-14.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--link-color)', textDecoration: 'none', fontWeight: 'bold' }}
                  >
                    → Chat 백엔드 보안·트랜잭션·검색 정리 (전문)
                  </a>
                </li>
                <li>• <Link to="/domains/chat" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>Chat 도메인 상세 페이지</Link></li>
                <li>• <Link to="/domains/chat/optimization" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>Chat 도메인 성능 최적화 페이지</Link></li>
              </ul>
            </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default ChatDomainRefactoring;
