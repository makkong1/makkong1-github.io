import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

function MermaidDiagram({ chart }) {
  const containerRef = useRef(null);
  const [svgContent, setSvgContent] = useState(null);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 다크모드 감지
  useEffect(() => {
    const checkDarkMode = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsDarkMode(theme === 'dark');
    };

    checkDarkMode();
    
    // MutationObserver로 data-theme 변경 감지
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      const theme = document.documentElement.getAttribute('data-theme');
      mermaid.initialize({ 
        startOnLoad: false,
        theme: theme === 'dark' ? 'dark' : 'default',
        securityLevel: 'loose',
        fontFamily: 'inherit'
      });
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // 다크모드 변경 시 mermaid 재초기화 및 다이어그램 재렌더링
  useEffect(() => {
    if (!isInitialized) return;
    
    mermaid.initialize({ 
      startOnLoad: false,
      theme: isDarkMode ? 'dark' : 'default',
      securityLevel: 'loose',
      fontFamily: 'inherit'
    });
  }, [isDarkMode, isInitialized]);

  useEffect(() => {
    if (!chart || !isInitialized || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        setError(null);
        setSvgContent(null);
        
        const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        // mermaid.render을 사용하여 SVG 생성
        let { svg } = await mermaid.render(id, chart);
        
        // 다크모드일 때 SVG 내부 텍스트 색상 강제 적용
        if (isDarkMode) {
          svg = svg.replace(/fill="[^"]*"/g, (match) => {
            // 기본 텍스트 색상인 경우에만 변경 (다른 색상은 유지)
            if (match.includes('fill="#333"') || match.includes('fill="#000"') || match.includes('fill="black"')) {
              return 'fill="rgba(255, 255, 255, 0.87)"';
            }
            return match;
          });
          // stroke 색상도 확인
          svg = svg.replace(/stroke="[^"]*"/g, (match) => {
            if (match.includes('stroke="#333"') || match.includes('stroke="#000"') || match.includes('stroke="black"')) {
              return 'stroke="rgba(255, 255, 255, 0.87)"';
            }
            return match;
          });
        }
        
        setSvgContent(svg);
      } catch (err) {
        console.error('Mermaid render error:', err);
        setError('다이어그램을 불러올 수 없습니다: ' + err.message);
      }
    };

    renderDiagram();
  }, [chart, isInitialized, isDarkMode]);

  if (error) {
    return (
      <div 
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          color: 'var(--text-secondary)',
          minHeight: '200px'
        }}
      >
        {error}
      </div>
    );
  }

  // SVG 렌더링 후 다크모드에 맞게 텍스트 색상 조정
  useEffect(() => {
    if (!svgContent || !containerRef.current) return;

    const svgElement = containerRef.current.querySelector('svg');
    if (!svgElement) return;

    if (isDarkMode) {
      // SVG 내부의 모든 text 요소에 색상 적용
      const textElements = svgElement.querySelectorAll('text, tspan');
      textElements.forEach((text) => {
        const fill = text.getAttribute('fill');
        // 어두운 색상이면 밝은 색상으로 변경
        if (!fill || fill === '#333' || fill === '#000' || fill === 'black' || fill === '#333333') {
          text.setAttribute('fill', 'rgba(255, 255, 255, 0.87)');
        }
      });

      // 선 색상도 조정
      const lineElements = svgElement.querySelectorAll('line, path, polyline, polygon');
      lineElements.forEach((line) => {
        const stroke = line.getAttribute('stroke');
        if (stroke === '#333' || stroke === '#000' || stroke === 'black' || stroke === '#333333') {
          line.setAttribute('stroke', 'rgba(255, 255, 255, 0.87)');
        }
      });
    }
  }, [svgContent, isDarkMode]);

  return (
    <div 
      ref={containerRef}
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '1rem',
        backgroundColor: 'var(--card-bg)',
        borderRadius: '8px',
        overflow: 'auto',
        minHeight: '200px'
      }}
    >
      {svgContent ? (
        <div 
          dangerouslySetInnerHTML={{ __html: svgContent }}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}
        />
      ) : (
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            minHeight: '200px'
          }}
        >
          다이어그램 로딩 중...
        </div>
      )}
    </div>
  );
}

export default MermaidDiagram;
