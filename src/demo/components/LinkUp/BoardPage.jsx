import styled from 'styled-components';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: var(--text-color);
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

const BoardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PostItem = styled.div`
  background: var(--card-bg);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--primary-color);
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }
`;

const PostTitle = styled.h3`
  font-size: 1.1rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Tag = styled.span`
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  background: ${props => props.color || '#eee'};
  color: #333;
  border-radius: 4px;
  font-weight: 500;
`;

const PostMeta = styled.div`
  font-size: 0.85rem;
  color: var(--text-secondary);
  display: flex;
  gap: 1rem;
`;

function BoardPage() {
  const dummyPosts = [
    { id: 1, title: 'LinkUp 프로젝트 개발 후기', author: 'makkong1', date: '2024.12.25', views: 128, likes: 42, tag: '회고', tagColor: '#ffeaa7' },
    { id: 2, title: 'Spring Boot 3.3 마이그레이션 가이드', author: 'dev_kim', date: '2024.12.24', views: 85, likes: 12, tag: 'Tip', tagColor: '#74b9ff' },
    { id: 3, title: 'Redis 캐싱으로 성능 최적화하기', author: 'backend_master', date: '2024.12.23', views: 256, likes: 89, tag: 'Tech', tagColor: '#ff7675' },
    { id: 4, title: '노션 스타일 에디터 구현 노하우 공유', author: 'frontend_wiz', date: '2024.12.20', views: 104, likes: 35, tag: 'Tech', tagColor: '#ff7675' },
    { id: 5, title: '오늘의 점심 메뉴 추천받습니다', author: 'newbie', date: '2024.12.25', views: 42, likes: 5, tag: '잡담', tagColor: '#fab1a0' },
  ];

  return (
    <Container>
      <Header>
        <Title>📋 게시판</Title>
        <Button>새 글 작성</Button>
      </Header>

      <BoardList>
        {dummyPosts.map(post => (
          <PostItem key={post.id}>
            <PostTitle>
              <Tag color={post.tagColor}>{post.tag}</Tag>
              {post.title}
            </PostTitle>
            <PostMeta>
              <span>작성자: {post.author}</span>
              <span>날짜: {post.date}</span>
              <span>조회 {post.views}</span>
              <span>좋아요 {post.likes}</span>
            </PostMeta>
          </PostItem>
        ))}
      </BoardList>
    </Container>
  );
}

export default BoardPage;
