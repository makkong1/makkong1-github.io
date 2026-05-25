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

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
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
        fontFamily: 'inherit',
      });
      setIsInitialized(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;

    mermaid.initialize({
      startOnLoad: false,
      theme: isDarkMode ? 'dark' : 'default',
      securityLevel: 'loose',
      fontFamily: 'inherit',
    });
  }, [isDarkMode, isInitialized]);

  useEffect(() => {
    if (!chart || !isInitialized || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        setError(null);
        setSvgContent(null);

        const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        let { svg } = await mermaid.render(id, chart);

        if (isDarkMode) {
          svg = svg.replace(/fill="[^"]*"/g, (match) => {
            if (
              match.includes('fill="#333"') ||
              match.includes('fill="#000"') ||
              match.includes('fill="black"')
            ) {
              return 'fill="rgba(255, 255, 255, 0.87)"';
            }
            return match;
          });
          svg = svg.replace(/stroke="[^"]*"/g, (match) => {
            if (
              match.includes('stroke="#333"') ||
              match.includes('stroke="#000"') ||
              match.includes('stroke="black"')
            ) {
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

  // SVG 렌더링 후 다크모드에 맞게 텍스트 색상 조정
  useEffect(() => {
    if (!svgContent || !containerRef.current) return;

    const svgElement = containerRef.current.querySelector('svg');
    if (!svgElement) return;

    if (isDarkMode) {
      const textElements = svgElement.querySelectorAll('text, tspan');
      textElements.forEach((text) => {
        const fill = text.getAttribute('fill');
        if (
          !fill ||
          fill === '#333' ||
          fill === '#000' ||
          fill === 'black' ||
          fill === '#333333'
        ) {
          text.setAttribute('fill', 'rgba(255, 255, 255, 0.87)');
        }
      });

      const lineElements = svgElement.querySelectorAll('line, path, polyline, polygon');
      lineElements.forEach((line) => {
        const stroke = line.getAttribute('stroke');
        if (
          stroke === '#333' ||
          stroke === '#000' ||
          stroke === 'black' ||
          stroke === '#333333'
        ) {
          line.setAttribute('stroke', 'rgba(255, 255, 255, 0.87)');
        }
      });
    }
  }, [svgContent, isDarkMode]);

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
          minHeight: '200px',
        }}
      >
        {error}
      </div>
    );
  }

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
        minHeight: '200px',
      }}
    >
      {svgContent ? (
        <div
          dangerouslySetInnerHTML={{ __html: svgContent }}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        />
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)',
            minHeight: '200px',
          }}
        >
          다이어그램 로딩 중...
        </div>
      )}
    </div>
  );
}

export default MermaidDiagram;
