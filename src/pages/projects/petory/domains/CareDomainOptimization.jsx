import { Link } from 'react-router-dom';
import MermaidDiagram from '../../../../components/Common/MermaidDiagram';
import TableOfContents from '../../../../components/Common/TableOfContents';

function CareDomainOptimization() {
  const sections = [
    { id: 'intro', title: '개요' },
    { id: 'test-design', title: '문제 재현 방식 (테스트 설계)' },
    { id: 'before', title: '성능 측정 결과 (개선 전)' },
    { id: 'optimization', title: '성능 최적화 및 동시성 제어' },
    { id: 'after', title: '성능 개선 결과 (개선 후)' }
  ];

  const beforeOptimizationSequence = `sequenceDiagram
    participant User as 사용자
    participant Frontend as Frontend
    participant Service as CareRequestService
    participant Repo as CareRequestRepository
    participant Converter as CareRequestConverter
    participant PetConverter as PetConverter
    participant FileService as AttachmentFileService
    participant DB as MySQL
    
    User->>Frontend: GET /api/care-requests
    Frontend->>Service: getAllCareRequests()
    Service->>Repo: findAllActiveRequests()
    Repo->>DB: 메인 쿼리 (CareRequest, User, Pet) (1)
    DB-->>Repo: 1004개 CareRequest 반환
    
    Note over Service,DB: N+1 문제 발생
    loop 각 CareRequest마다 (1004번)
        Converter->>DB: getApplications() (2, 3, 4...)
        DB-->>Converter: CareApplication 개별 조회
    end
    
    loop 각 Pet마다 (~700번)
        PetConverter->>FileService: getAttachments(PET, petIdx) (5, 6, 7...)
        FileService->>DB: File 개별 조회
        PetConverter->>DB: getVaccinations() (8, 9, 10...)
        DB-->>PetConverter: PetVaccination 개별 조회
    end
    
    Service-->>Frontend: List<CareRequestDTO>
    Frontend-->>User: 펫케어 요청 목록 표시
    
    Note over Service,DB: 총 ~2400개 쿼리 발생`;

  const afterOptimizationSequence = `sequenceDiagram
    participant User as 사용자
    participant Frontend as Frontend
    participant Service as CareRequestService
    participant Repo as CareRequestRepository
    participant Converter as CareRequestConverter
    participant PetConverter as PetConverter
    participant FileService as AttachmentFileService
    participant DB as MySQL
    
    User->>Frontend: GET /api/care-requests
    Frontend->>Service: getAllCareRequests()
    Service->>Repo: findAllActiveRequests()
    Note over Repo,DB: Fetch Join으로 한 번에 조회
    Repo->>DB: 메인 쿼리 (CareRequest, User, Pet, CareApplication) (1)
    DB-->>Repo: 1004개 CareRequest 반환 (applications 포함)
    
    Note over Service,DB: 배치 조회로 최적화
    Converter->>PetConverter: toDTOList(pets)
    PetConverter->>FileService: getAttachmentsBatch(PET, petIndices) (2)
    FileService->>DB: File 배치 조회 (IN 절)
    DB-->>FileService: 모든 Pet의 File 한 번에 조회
    
    Note over PetConverter,DB: @BatchSize로 배치 조회
    PetConverter->>DB: PetVaccination 배치 조회 (3, 4...)
    Note over DB: 50개씩 배치로 조회 (약 20번)
    DB-->>PetConverter: PetVaccination 배치 조회 결과
    
    Converter->>Converter: 미리 변환된 PetDTO 사용
    Service-->>Frontend: List<CareRequestDTO>
    Frontend-->>User: 펫케어 요청 목록 표시
    
    Note over Service,DB: 총 4-5개 쿼리로 감소<br/>99.8% 쿼리 수 감소`;

  return (
    <div className="domain-page-wrapper" style={{ padding: '2rem 0' }}>
      <div className="domain-page-container" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div className="domain-page-content" style={{ flex: 1 }}>
          <div style={{ marginBottom: '1rem' }}>
            <Link 
              to="/domains/care" 
              style={{ 
                color: 'var(--link-color)', 
                textDecoration: 'none',
                fontSize: '0.9rem'
              }}
            >
              ← Care 도메인으로 돌아가기
            </Link>
          </div>
          <h1 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Care 도메인 - 성능 최적화 상세</h1>
          
          {/* 1. 개요 */}
          <section id="intro" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>개요</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>Care 도메인 고도화 여정의 Part 2: 성능 최적화 (Performance)</strong>
              </p>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                앞선 <strong>Part 1(데이터 정합성)</strong>에서 Race Condition을 해결하여 데이터의 신뢰성을 확보한 후,
                사용자 경험을 극대화하기 위해 <strong style={{ color: 'var(--text-color)' }}>대량 조회 시 발생하는 심각한 N+1 문제</strong>를 해결했습니다.
              </p>
              <div style={{
                padding: '0.75rem',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '4px',
                marginBottom: '1rem',
                fontSize: '0.9rem',
                borderLeft: '3px solid var(--link-color)'
              }}>
                ℹ️ <strong>참고:</strong> Part 1 (거래 확정 동시성 문제) 내용은 <Link to="/domains/care" style={{ color: 'var(--link-color)', textDecoration: 'none' }}>Care 도메인 메인 페이지</Link>에서 확인할 수 있습니다.
              </div>
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
                  <li>• 펫케어 요청 목록 조회: <strong style={{ color: 'var(--text-color)' }}>2400개 쿼리 → 4-5개 쿼리</strong> (99.8% 감소)</li>
                  <li>• 실행 시간: <strong style={{ color: 'var(--text-color)' }}>1084ms → 66ms</strong> (94% 감소)</li>
                  <li>• 메모리 사용량: <strong style={{ color: 'var(--text-color)' }}>21MB → 6MB</strong> (71% 감소)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. 문제 재현 방식 (테스트 설계) */}
          <section id="test-design" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>문제 재현 방식 (테스트 설계)</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                위 상황을 재현하기 위해 다음과 같은 테스트를 구성했습니다.
              </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8'
              }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>대량 데이터 환경</strong>: CareRequest 1004개, Pet ~700개</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>실제 사용 패턴 반영</strong>: 전체 조회 및 검색 조회 시나리오</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>성능 지표 측정</strong>: 쿼리 수, 실행 시간, 메모리 사용량</li>
              </ul>
            </div>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>시퀀스 다이어그램 (최적화 전)</h3>
              <MermaidDiagram chart={beforeOptimizationSequence} />
            </div>
          </section>

          {/* 3. 성능 측정 결과 (개선 전) */}
          <section id="before" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 측정 결과 (개선 전)</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <div style={{
                overflowX: 'auto'
              }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  color: 'var(--text-secondary)'
                }}>
                  <thead>
                    <tr style={{
                      borderBottom: '2px solid var(--nav-border)'
                    }}>
                      <th style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                        fontWeight: 'bold'
                      }}>항목</th>
                      <th style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                        fontWeight: 'bold'
                      }}>전체 조회 (1004개)</th>
                      <th style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                        fontWeight: 'bold'
                      }}>검색 조회 (325개)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>쿼리 수</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--text-color)' }}>~2400개</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--text-color)' }}>~780개</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>백엔드 실행 시간</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--text-color)' }}>1084ms</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--text-color)' }}>225ms</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>프론트엔드 실행 시간</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--text-color)' }}>1164ms</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--text-color)' }}>317ms</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem' }}>메모리 사용량 (백엔드)</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--text-color)' }}>21MB</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--text-color)' }}>6MB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px'
              }}>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  <strong style={{ color: 'var(--text-color)' }}>테스트 환경:</strong> CareRequest 1004개, Pet ~700개, CareApplication ~1000개
                </p>
              </div>
            </div>
          </section>

          {/* 4. 성능 최적화 및 동시성 제어 */}
          <section id="optimization" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 최적화 및 동시성 제어</h2>
            
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>1단계: CareApplication N+1 문제 해결</h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>Fetch Join 적용</strong>: CareApplication을 메인 쿼리에 포함하여 한 번에 조회
              </p>
              <pre style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                fontFamily: 'monospace',
                lineHeight: '1.6',
                marginTop: '1rem'
              }}>
{`@Query("SELECT cr FROM CareRequest cr " +
       "JOIN FETCH cr.user " +
       "LEFT JOIN FETCH cr.pet " +
       "LEFT JOIN FETCH cr.applications " +
       "WHERE cr.isDeleted = false")
List<CareRequest> findAllActiveRequests();`}
              </pre>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginTop: '1rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>효과:</strong> CareApplication 조회 쿼리 1000번 → 0번 (메인 쿼리에 포함)
              </p>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>2단계: File 조회 N+1 문제 해결</h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>배치 조회 패턴</strong>: 모든 Pet의 File을 한 번에 조회 (IN 절 사용)
              </p>
              <pre style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                fontFamily: 'monospace',
                lineHeight: '1.6',
                marginTop: '1rem'
              }}>
{`// Pet ID 목록 추출
List<Long> petIds = pets.stream()
    .map(Pet::getIdx)
    .collect(Collectors.toList());

// 배치 조회 (IN 절)
Map<Long, List<FileDTO>> attachmentsMap = 
    attachmentFileService.getAttachmentsBatch(
        FileTargetType.PET, petIds);`}
              </pre>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginTop: '1rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>효과:</strong> File 조회 쿼리 ~700번 → 1번 (배치 조회)
              </p>
            </div>

            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>3단계: PetVaccination N+1 문제 해결</h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>@BatchSize 적용</strong>: Hibernate의 @BatchSize 어노테이션으로 배치 조회 (최대 50개씩)
              </p>
              <pre style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                fontFamily: 'monospace',
                lineHeight: '1.6',
                marginTop: '1rem'
              }}>
{`@Entity
@BatchSize(size = 50)
public class Pet {
    @OneToMany(mappedBy = "pet")
    private List<PetVaccination> vaccinations;
}`}
              </pre>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', marginTop: '1rem' }}>
                <strong style={{ color: 'var(--text-color)' }}>효과:</strong> PetVaccination 조회 쿼리 ~700번 → 1-2번 (배치 조회)
              </p>
            </div>
          </section>

          {/* 5. 성능 개선 결과 (개선 후) */}
          <section id="after" style={{ marginBottom: '3rem', scrollMarginTop: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>성능 개선 결과 (개선 후)</h2>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginBottom: '1rem'
            }}>
              <div style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '6px',
                marginBottom: '1rem',
                border: '2px solid var(--link-color)'
              }}>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-muted)',
                  margin: 0,
                  fontStyle: 'italic'
                }}>
                  📌 <strong style={{ color: 'var(--text-color)' }}>홈페이지 숫자 카드의 근거는 여기</strong>
                </p>
              </div>
              <div style={{
                overflowX: 'auto'
              }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  color: 'var(--text-secondary)'
                }}>
                  <thead>
                    <tr style={{
                      borderBottom: '2px solid var(--nav-border)'
                    }}>
                      <th style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                        fontWeight: 'bold'
                      }}>항목</th>
                      <th style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                        fontWeight: 'bold'
                      }}>개선 전</th>
                      <th style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                        fontWeight: 'bold'
                      }}>개선 후</th>
                      <th style={{
                        padding: '0.75rem',
                        textAlign: 'left',
                        color: 'var(--text-color)',
                        fontWeight: 'bold'
                      }}>개선율</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>쿼리 수 (전체 조회)</td>
                      <td style={{ padding: '0.75rem' }}>~2400개</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>4-5개</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>99.8% ↓</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>백엔드 실행 시간 (전체 조회)</td>
                      <td style={{ padding: '0.75rem' }}>1084ms</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>66ms</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>94% ↓</td>
                    </tr>
                    <tr style={{
                      borderBottom: '1px solid var(--nav-border)'
                    }}>
                      <td style={{ padding: '0.75rem' }}>프론트엔드 실행 시간 (전체 조회)</td>
                      <td style={{ padding: '0.75rem' }}>1164ms</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>399ms</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>66% ↓</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem' }}>메모리 사용량 (백엔드, 전체 조회)</td>
                      <td style={{ padding: '0.75rem' }}>21MB</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>6MB</td>
                      <td style={{ padding: '0.75rem', fontWeight: 'bold', color: 'var(--link-color)' }}>71% ↓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>시퀀스 다이어그램 (최적화 후)</h3>
              <MermaidDiagram chart={afterOptimizationSequence} />
            </div>
            <div className="section-card" style={{
              padding: '1.5rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--nav-border)',
              marginTop: '1rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>얻은 교훈 / 설계 인사이트</h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                color: 'var(--text-secondary)',
                lineHeight: '1.8'
              }}>
                <li>• <strong style={{ color: 'var(--text-color)' }}>단계별 최적화</strong>: 한 번에 모든 문제를 해결하기보다 단계별로 접근하여 효과 측정</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>Fetch Join의 한계</strong>: 중첩 컬렉션은 Fetch Join으로 해결하기 어려우므로 @BatchSize 활용</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>배치 조회 패턴</strong>: 폴리모픽 관계(File)는 배치 조회로 효율적으로 처리 가능</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>쿼리 수 vs 실행 시간</strong>: 쿼리 수 감소가 항상 실행 시간 감소를 보장하지는 않지만, DB 부하는 대폭 감소</li>
                <li>• <strong style={{ color: 'var(--text-color)' }}>실제 측정의 중요성</strong>: 예상했던 15-20개보다 훨씬 적은 4-5개 쿼리만 실행되어 예상보다 우수한 결과</li>
              </ul>
            </div>
          </section>
        </div>
        <TableOfContents sections={sections} />
      </div>
    </div>
  );
}

export default CareDomainOptimization;

