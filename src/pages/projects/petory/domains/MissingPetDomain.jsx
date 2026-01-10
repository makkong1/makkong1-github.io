import { Link } from 'react-router-dom';
import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../../components/Common/TableOfContents';

function MissingPetDomain() {
  const sections = [
    { id: 'intro', title: '도메인 소개' },
    { id: 'features', title: '주요 기능' },
    { id: 'troubleshooting', title: '트러블슈팅' },
    { id: 'db-optimization', title: 'DB 최적화' },
    { id: 'entities', title: 'Entity 구조' },
    { id: 'security', title: '보안 및 권한 체계' },
    { id: 'relationships', title: '다른 도메인과의 연관관계' },
    { id: 'api', title: 'API 엔드포인트' },
    { id: 'docs', title: '관련 문서' }
  ];
  const entityDiagram = `erDiagram
    Users ||--o{ MissingPetBoard : "reports"
    MissingPetBoard ||--o{ MissingPetComment : "has"
    
    MissingPetBoard {
        Long idx PK
        Long user_idx FK
        String title
        String content
        String petName
        String species
        String breed
        MissingPetGender gender
        String age
        String color
        LocalDate lostDate
        String lostLocation
        BigDecimal latitude
        BigDecimal longitude
        MissingPetStatus status
        LocalDateTime createdAt
        LocalDateTime updatedAt
        Boolean isDeleted
    }
    
    MissingPetComment {
        Long idx PK
        Long board_idx FK
        Long user_idx FK
        String content
        String address
        Double latitude
        Double longitude
        LocalDateTime createdAt
        Boolean isDeleted
    }`;

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>실종 신고 도메인</h1>
          
          {/* 1. 도메인 소개 */}
          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>도메인 소개</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                MissingPet 도메인은 실종 동물 신고 및 관리 시스템으로, 반려동물을 잃어버린 사용자가 신고하고 다른 사용자들이 목격 정보를 제공할 수 있습니다.
              </p>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                위치 기반 검색, 파일 첨부, 알림 발송 등의 기능을 제공하며, 게시글과 댓글 조회를 분리하여 조인 폭발을 방지하고 성능을 최적화했습니다.
              </p>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginTop: '1rem',
                border: '1px solid var(--nav-border)'
              }}>
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '1rem' }}>핵심 성과</h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  color: 'var(--text-secondary)',
                  lineHeight: '1.8',
                  fontSize: '0.9rem'
                }}>
                  <li>• 게시글 목록 조회 쿼리: <strong style={{ color: 'var(--text-color)' }}>105개 → 3개</strong> (97% 감소)</li>
                  <li>• 백엔드 응답 시간: <strong style={{ color: 'var(--text-color)' }}>571ms → 106ms</strong> (81% 개선)</li>
                  <li>• 메모리 사용량: <strong style={{ color: 'var(--text-color)' }}>11MB → 3MB</strong> (73% 감소)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. 주요 기능 */}
          <section id="features" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>주요 기능</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1. 실종 동물 신고</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>사용자가 실종 동물 정보를 신고하고 사진을 첨부할 수 있습니다.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• 실종 동물 신고 생성/조회/수정/삭제 (이메일 인증 필요)</li>
                  <li>• 실종 동물 정보 입력 (이름, 종, 품종, 성별, 나이, 색상, 실종 날짜, 실종 장소)</li>
                  <li>• 위치 정보 저장 (위도, 경도, 주소) - 현재 검색 기능 미구현 (향후 반경 기반 검색 구현 예정)</li>
                  <li>• 이미지 첨부 (첫 번째 파일만 저장, FileTargetType.MISSING_PET)</li>
                  <li>• Soft Delete (게시글 삭제 시 관련 댓글도 함께 Soft Delete)</li>
                  <li>• 서비스 분리: 게시글과 댓글 조회를 분리하여 조인 폭발 방지</li>
                </ul>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>2. 실종 동물 상태 관리</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>실종 동물의 상태를 관리하여 실종 중, 발견됨, 해결됨 상태를 구분합니다.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• MISSING (실종 중) - 신고 시 기본 상태</li>
                  <li>• FOUND (발견됨) - 찾음 처리</li>
                  <li>• RESOLVED (해결됨) - 해결 처리</li>
                </ul>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>3. 목격 정보 댓글</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>댓글로 목격 정보를 제공하고 실종자와 소통할 수 있습니다.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• 목격 정보 댓글 작성 (내용, 목격 위치 주소, 위도, 경도)</li>
                  <li>• 이미지 첨부 지원 (첫 번째 파일만 저장, FileTargetType.MISSING_PET_COMMENT)</li>
                  <li>• 알림 발송 (댓글 작성자가 게시글 작성자가 아닌 경우에만 알림, 비동기 처리, @Async 사용)</li>
                  <li>• 실종제보 채팅 연동 ("목격했어요" 버튼으로 제보자-목격자 간 1:1 채팅 시작)</li>
                  <li>• 댓글은 별도 API로 조회 (GET /api/missing-pets/{'{id}'}/comments) - 조인 폭발 방지</li>
                </ul>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>4. 위치 정보 저장</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>실종 위치 및 목격 위치 정보를 저장합니다. (현재 위치 기반 검색 기능은 미구현)</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• 실종 위치 정보 저장 (위도, 경도 - BigDecimal 타입, precision=15, scale=12, 주소)</li>
                  <li>• 목격 위치 정보 저장 (위도, 경도 - Double 타입, 주소)</li>
                  <li>• 위치 정보는 데이터 저장 용도로만 사용</li>
                  <li>• 향후 구현 예정: 하버사인 공식 또는 MySQL의 공간 인덱스(GIS)를 활용한 반경 기반 검색 기능</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. 트러블슈팅 */}
          <section id="troubleshooting" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>트러블슈팅</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1. 게시글 목록 조회 시 N+1 문제</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>문제:</strong> 게시글 목록 조회 시 Converter에서 `board.getComments()` 접근으로 LAZY 로딩 발생, 게시글 103개 조회 시 댓글 조회 쿼리가 103번 실행됨 (총 105개 쿼리)</p>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>해결:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                  <li>• Converter 메서드 분리: `toBoardDTOWithoutComments()` 메서드 추가로 댓글 접근 완전 제거</li>
                  <li>• 서비스 분리: 게시글과 댓글 조회를 완전히 분리하여 조인 폭발 방지</li>
                  <li>• 배치 조회: 파일 첨부 정보를 IN 절로 한 번에 조회</li>
                  <li>• 댓글 수 배치 조회: `getCommentCountsBatch()` 메서드로 모든 게시글의 댓글 수를 한 번에 조회 (IN 절 + GROUP BY)</li>
                  <li>• 댓글 목록은 별도 API로 조회: GET /api/missing-pets/{'{id}'}/comments</li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>효과:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                  <li>• 쿼리 수: 105개 → 3개 (97% 감소)</li>
                  <li>• 백엔드 응답 시간: 571ms → 106ms (81% 개선)</li>
                  <li>• 메모리 사용량: 11MB → 3MB (73% 감소)</li>
                  <li>• 댓글 목록 조회 쿼리: 103번 → 0번 (100% 제거)</li>
                  <li>• 댓글 수 조회 쿼리: 103번 → 1번 (배치 조회로 최적화)</li>
                </ul>
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  border: '1px solid var(--link-color)'
                }}>
                  <Link
                    to="/domains/missing-pet/optimization"
                    style={{
                      color: 'var(--link-color)',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      display: 'inline-block',
                      marginBottom: '0.5rem'
                    }}
                  >
                    → N+1 문제 해결 상세 보기
                  </Link>
                  <p style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    marginTop: '0.5rem',
                    marginBottom: 0
                  }}>
                    (시퀀스 다이어그램, 테스트 코드, 상세 최적화 과정 포함)
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. DB 최적화 */}
          <section id="db-optimization" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>DB 최적화</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>인덱스 전략</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>missing_pet_board 테이블:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                  <li>• 사용자별 게시글 조회: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX idx_missing_pet_user ON missing_pet_board(user_idx, is_deleted, created_at)</code></li>
                  <li>• 위치 기반 검색: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX idx_missing_pet_location ON missing_pet_board(latitude, longitude)</code></li>
                  <li>• 상태별 조회: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX idx_missing_pet_status ON missing_pet_board(status, is_deleted, created_at)</code></li>
                  <li>• 외래키 (user_idx): <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX FKrid0u1qvm8e07etghggxnu1b1 ON missing_pet_board(user_idx)</code></li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>missing_pet_comment 테이블:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0' }}>
                  <li>• 사용자별 댓글 조회: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX FKe3sca61815j9cxi608oxmrfjt ON missing_pet_comment(user_idx)</code></li>
                  <li>• 게시글별 댓글 조회: <code style={{ backgroundColor: 'var(--bg-color)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>CREATE INDEX FKpodx5stuchr73mrjgffir72ii ON missing_pet_comment(board_idx)</code></li>
                </ul>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>선정 이유:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• 자주 조회되는 컬럼 조합 (status, is_deleted, created_at)</li>
                  <li>• WHERE 절에서 자주 사용되는 조건</li>
                  <li>• JOIN에 사용되는 외래키 (user_idx, board_idx)</li>
                  <li>• 위치 기반 검색을 위한 인덱스 (latitude, longitude)</li>
                </ul>
              </div>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>쿼리 최적화</h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>게시글 + 작성자 조회 (JOIN FETCH):</strong></p>
                <pre style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  overflow: 'auto',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  fontFamily: 'monospace',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
{`@Query("SELECT b FROM MissingPetBoard b " +
       "JOIN FETCH b.user u " +
       "WHERE b.isDeleted = false AND u.isDeleted = false " +
       "AND u.status = 'ACTIVE' " +
       "ORDER BY b.createdAt DESC")
List<MissingPetBoard> findAllByOrderByCreatedAtDesc();`}
                </pre>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>파일 배치 조회:</strong></p>
                <pre style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  overflow: 'auto',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  fontFamily: 'monospace',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
{`// 게시글 ID 목록으로 한 번에 파일 조회 (IN 절 사용)
List<Long> boardIds = boards.stream()
    .map(MissingPetBoard::getIdx)
    .collect(Collectors.toList());
Map<Long, List<FileDTO>> filesByBoardId = attachmentFileService
    .getAttachmentsBatch(FileTargetType.MISSING_PET, boardIds);`}
                </pre>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Converter 메서드 분리:</strong></p>
                <pre style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-color)',
                  borderRadius: '6px',
                  overflow: 'auto',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  fontFamily: 'monospace',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
{`// 댓글을 접근하지 않는 메서드로 N+1 문제 완전 해결
public MissingPetBoardDTO toBoardDTOWithoutComments(MissingPetBoard board) {
    return MissingPetBoardDTO.builder()
        .idx(board.getIdx())
        .userId(board.getUser().getIdx())
        // ... 기타 필드들
        .comments(Collections.emptyList()) // 댓글은 빈 리스트
        .commentCount(0)
        .build();
}`}
                </pre>
                <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>개선 포인트:</strong></p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li>• JOIN FETCH로 게시글+작성자 정보를 한 번에 조회 (댓글 제외)</li>
                  <li>• 배치 조회로 파일을 한 번에 조회 (IN 절 사용)</li>
                  <li>• Converter 메서드 분리로 댓글 접근 완전 제거 (LAZY 로딩 트리거 방지)</li>
                  <li>• 서비스 분리로 조인 폭발 방지 및 확장성 향상</li>
                  <li>• 활성 사용자 필터링 (삭제되지 않고 활성 상태인 사용자만 조회)</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="entities" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Entity 구조</h2>
        
        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1.5rem'
        }}>
          <MermaidDiagram chart={entityDiagram} />
        </div>

        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>MissingPetBoard (실종 동물 게시판)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 필드:</strong></div>
            <div>• idx (PK), user (신고자), title, content</div>
            <div>• petName, species, breed, gender (MissingPetGender enum: M, F), age, color</div>
            <div>• lostDate, lostLocation, latitude (BigDecimal, precision=15, scale=12), longitude</div>
            <div>• status (MissingPetStatus enum: MISSING/FOUND/RESOLVED)</div>
            <div>• createdAt, updatedAt, isDeleted, deletedAt</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• ManyToOne → Users</div>
            <div>• OneToMany → MissingPetComment (cascade=CascadeType.ALL, LAZY 로딩)</div>
            <div>• 폴리모픽 관계 → AttachmentFile (FileTargetType.MISSING_PET)</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>특징:</strong></div>
            <div>• BaseTimeEntity 미사용 (@PrePersist, @PreUpdate로 직접 시간 관리)</div>
            <div>• Soft Delete 지원 (isDeleted, deletedAt)</div>
          </div>
        </div>

        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>MissingPetComment</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>주요 필드:</strong></div>
            <div>• idx (PK), board (게시글), user (작성자)</div>
            <div>• content (목격 정보), address, latitude (Double), longitude</div>
            <div>• createdAt, isDeleted, deletedAt</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>연관관계:</strong></div>
            <div>• ManyToOne → MissingPetBoard, Users</div>
            <div>• 폴리모픽 관계 → AttachmentFile (FileTargetType.MISSING_PET_COMMENT)</div>
            <div style={{ marginTop: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>특징:</strong></div>
            <div>• BaseTimeEntity 미사용 (@PrePersist로 직접 createdAt 관리)</div>
            <div>• Soft Delete 지원 (isDeleted, deletedAt)</div>
            <div>• 목격 위치 정보 포함 (주소, 위도, 경도)</div>
          </div>
        </div>
      </section>

          {/* 5. 보안 및 권한 체계 */}
          <section id="security" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>보안 및 권한 체계</h2>
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
                lineHeight: '1.8'
              }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>이메일 인증</strong>: 실종 제보 작성/수정/삭제 시 이메일 인증 필요 (EmailVerificationRequiredException)</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>작성자만 수정/삭제 가능</strong>: 신고 작성자만 본인 신고 수정/삭제 가능</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>소프트 삭제</strong>: isDeleted, deletedAt 플래그로 논리 삭제</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>연관 댓글 삭제</strong>: 게시글 삭제 시 MissingPetCommentService.deleteAllCommentsByBoard()로 관련 댓글도 함께 Soft Delete</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>활성 사용자 필터링</strong>: 삭제되지 않고 활성 상태인 사용자만 조회 (u.isDeleted = false AND u.status = 'ACTIVE')</li>
              </ul>
            </div>
          </section>

          {/* 6. 다른 도메인과의 연관관계 */}
          <section id="relationships" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>다른 도메인과의 연관관계</h2>
        
        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>User 도메인:</strong></div>
            <div>• Users가 실종 신고 작성, 목격 정보 제공</div>
            <div>• 이메일 인증 확인 (실종 제보 작성/수정/삭제 시 EmailVerificationRequiredException)</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>File 도메인:</strong></div>
            <div>• 실종 동물 사진 첨부 (FileTargetType.MISSING_PET, MISSING_PET_COMMENT)</div>
            <div>• syncSingleAttachment()로 파일 동기화 (첫 번째 파일만 저장)</div>
            <div>• getAttachmentsBatch()로 배치 조회하여 N+1 문제 해결</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Notification 도메인:</strong></div>
            <div>• 댓글 작성 시 알림 발송 (댓글 작성자가 게시글 작성자가 아닌 경우)</div>
            <div>• 비동기 처리 (@Async 사용, 알림 발송 실패해도 댓글 작성은 성공)</div>
            <div>• NotificationType.MISSING_PET_COMMENT 사용</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Report 도메인:</strong></div>
            <div>• 부적절한 신고 접수</div>
            <div style={{ marginTop: '1rem', marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-color)' }}>Chat 도메인:</strong></div>
            <div>• "목격했어요" 버튼으로 제보자-목격자 간 1:1 채팅 시작</div>
            <div>• ConversationService.createMissingPetChat()로 실종제보 채팅방 생성</div>
          </div>
        </div>
      </section>

          {/* 7. API 엔드포인트 */}
          <section id="api" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>API 엔드포인트</h2>
        
        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>실종 제보 (/api/missing-pets)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div>• GET / - 실종 제보 목록 조회 (status 파라미터로 필터링, 댓글 제외)</div>
            <div>• GET /{'{id}'} - 특정 실종 제보 조회 (댓글 수만 포함, 댓글 목록은 별도 API로 조회)</div>
            <div>• POST / - 실종 제보 생성 (인증 필요, 이메일 인증 필요, 파일 첨부 지원)</div>
            <div>• PUT /{'{id}'} - 실종 제보 수정 (인증 필요, 이메일 인증 필요, 선택적 업데이트, 파일 첨부 지원)</div>
            <div>• PATCH /{'{id}'}/status - 상태 변경 (RequestBody: {"{"}"status": "MISSING"{"}"}, 모든 인증된 사용자 가능)</div>
            <div>• DELETE /{'{id}'} - 실종 제보 삭제 (인증 필요, 이메일 인증 필요, 관련 댓글도 함께 Soft Delete, 응답: {"{"}"success": true{"}"})</div>
          </div>
        </div>

        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)',
          marginBottom: '1rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>댓글 (/api/missing-pets/{'{id}'}/comments)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div>• GET / - 댓글 목록 조회 (삭제되지 않은 댓글만, 작성자 정보 포함, 첨부 파일 배치 조회)</div>
            <div>• POST / - 댓글 작성 (인증 필요, 파일 첨부 지원 - 첫 번째 파일만 저장, 알림 발송 비동기 처리)</div>
            <div>• DELETE /{'{commentId}'} - 댓글 삭제 (인증 필요, Soft Delete, 응답: {"{"}"success": true{"}"})</div>
          </div>
        </div>

        <div className="section-card" style={{
          padding: '1.5rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>채팅 (/api/missing-pets/{'{boardIdx}'}/start-chat)</h3>
          <div style={{ 
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
          }}>
            <div>• POST /?witnessId={'{witnessId}'} - 실종제보 채팅 시작 (인증 필요)</div>
          </div>
        </div>
      </section>

          {/* 8. 관련 문서 */}
          <section id="docs" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>관련 문서</h2>
        <div className="section-card" style={{
          padding: '1rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--nav-border)'
        }}>
          <a 
            href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/domains/missing-pet.md" 
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: 'var(--link-color)',
              textDecoration: 'none',
              display: 'block',
              marginBottom: '0.5rem'
            }}
          >
            → Missing Pet 도메인 상세 문서
          </a>
          <a 
            href="https://github.com/makkong1/makkong1-github.io/blob/main/docs/troubleshooting/missing-pet/n-plus-one-query-issue.md" 
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: 'var(--link-color)',
              textDecoration: 'none',
              display: 'block'
            }}
          >
            → N+1 문제 해결 상세 문서
          </a>
        </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default MissingPetDomain;
