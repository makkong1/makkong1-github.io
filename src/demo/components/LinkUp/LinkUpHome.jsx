import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--text-color);
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 3rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const FeatureCard = styled.div`
  background: var(--card-bg);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary-color);
  }

  h3 {
    margin-bottom: 0.5rem;
    color: var(--text-color);
  }

  p {
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
`;

function LinkUpHome({ setActiveTab }) {
  return (
    <Container>
      <Title>LinkUp Demo</Title>
      <Subtitle>
        노션 스타일의 콘텐츠 에디터와 실시간 소통이 가능한<br />
        커뮤니티 플랫폼 데모에 오신 것을 환영합니다.
      </Subtitle>

      <CardGrid>
        <FeatureCard onClick={() => setActiveTab('board')}>
          <h3>📝 게시판</h3>
          <p>노션 스타일로 작성된<br/>게시글을 확인해보세요.</p>
        </FeatureCard>
        <FeatureCard onClick={() => setActiveTab('editor')}>
          <h3>✍️ 에디터 (체험)</h3>
          <p>직관적인 블록형 에디터를<br/>직접 체험해보세요.</p>
        </FeatureCard>
        <FeatureCard onClick={() => setActiveTab('notifications')}>
          <h3>🔔 실시간 알림</h3>
          <p>댓글 및 반응에 대한<br/>실시간 알림을 확인하세요.</p>
        </FeatureCard>
      </CardGrid>
    </Container>
  );
}

export default LinkUpHome;
