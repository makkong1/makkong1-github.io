import { useState } from 'react';
import styled from 'styled-components';

// 이미지 import
import mainImg from './assets/main.png';
import editorImg from './assets/editor.png';
import postDetail1Img from './assets/post_detail_1.png';
import postDetail2Img from './assets/post_detail_2.png';
import notionPageImg from './assets/notion_page.png';
import activityImg from './assets/activity.png';
import loginImg from './assets/login.png';
import signupImg from './assets/signup.png';

const GalleryContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  gap: 2rem;
  min-height: calc(100vh - 100px);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  width: 280px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
    flex-direction: row;
    padding-bottom: 1rem;
  }
`;

const FeatureButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${props => props.active ? 'var(--primary-color)' : 'var(--card-bg)'};
  color: ${props => props.active ? 'white' : 'var(--text-color)'};
  border: 1px solid ${props => props.active ? 'var(--primary-color)' : 'var(--border-color)'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  font-weight: 500;

  &:hover {
    background: ${props => props.active ? 'var(--primary-color)' : 'var(--bg-secondary)'};
    transform: translateX(5px);
  }

  @media (max-width: 768px) {
    white-space: nowrap;
    &:hover { transform: translateY(-2px); }
  }
`;

const MainContent = styled.div`
  flex: 1;
  background: var(--card-bg);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ImageFrame = styled.div`
  width: 100%;
  aspect-ratio: 16/10;
  background: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border: 1px solid var(--border-color);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 실제 스크린샷 비율에 맞춰 'contain'으로 변경 가능 */
    transition: transform 0.3s;
  }

  &:hover img {
    transform: scale(1.02);
  }
`;

const Description = styled.div`
  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: var(--text-color);
  }
  p {
    color: var(--text-secondary);
    line-height: 1.6;
  }
`;

const Notice = styled.div`
  background-color: var(--bg-secondary);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-left: 4px solid var(--primary-color);
`;

const IconSpan = styled.span`
  font-size: 1.2rem;
`;

function LinkUpGallery() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    { 
      id: 6, 
      label: '메인 화면', 
      icon: '🏠', 
      image: mainImg, 
      desc: 'LinkUp의 메인 대시보드입니다. 주요 게시글과 활동 요약을 한눈에 볼 수 있습니다.' 
    },
    { 
      id: 1, 
      label: '게시글 작성', 
      icon: '✍️', 
      image: editorImg, 
      desc: '마크다운 및 다양한 블록을 지원하는 노션 스타일의 게시글 작성 에디터입니다.' 
    },
    { 
      id: 2, 
      label: '게시글 상세 (1)', 
      icon: '📄', 
      image: postDetail1Img, 
      desc: '작성된 게시글을 열람하는 화면입니다. 깔끔한 타이포그래피와 레이아웃을 제공합니다.' 
    },
    { 
      id: 3, 
      label: '게시글 상세 (2)', 
      icon: '💬', 
      image: postDetail2Img, 
      desc: '댓글 및 반응형 요소가 포함된 게시글 상세 화면의 하단부입니다.' 
    },
    { 
      id: 4, 
      label: '노션 페이지', 
      icon: '📓', 
      image: notionPageImg, 
      desc: '사용자 정의가 가능한 노션 스타일의 페이지 뷰입니다.' 
    },
    { 
      id: 7, 
      label: '활동 내역', 
      icon: '📊', 
      image: activityImg, 
      desc: '사용자의 작성 글, 댓글, 좋아요 등 주요 활동 내역을 타임라인으로 확인합니다.' 
    },
    { 
      id: 5, 
      label: '로그인', 
      icon: '🔐', 
      image: loginImg, 
      desc: '보안이 강화된 로그인 화면입니다. 소셜 로그인 및 이메일 로그인을 지원합니다.' 
    },
    { 
      id: 8, 
      label: '회원가입', 
      icon: '👤', 
      image: signupImg, 
      desc: '신규 사용자 등록 화면입니다. 유효성 검사 및 프로필 설정이 포함되어 있습니다.' 
    },
  ];

  const current = features[activeFeature];

  return (
    <GalleryContainer>
      <Sidebar>
        <Notice>
          ℹ️ LinkUp 프로젝트의 실제 구동 화면을 캡처한 갤러리입니다.
        </Notice>
        {features.map((feature, index) => (
          <FeatureButton
            key={feature.id}
            active={activeFeature === index}
            onClick={() => setActiveFeature(index)}
          >
            <IconSpan>{feature.icon}</IconSpan>
            {feature.label}
          </FeatureButton>
        ))}
      </Sidebar>

      <MainContent>
        <Description>
          <h2>{current.label}</h2>
          <p>{current.desc}</p>
        </Description>
        <ImageFrame>
          <img src={current.image} alt={current.label} />
        </ImageFrame>
      </MainContent>
    </GalleryContainer>
  );
}

export default LinkUpGallery;
