import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

const MERMAID_CONFIG = {
  startOnLoad: false,
  securityLevel: 'loose',
  fontFamily: 'inherit',
  flowchart: {
    useMaxWidth: true,
    htmlLabels: false,
  },
};

function MermaidDiagram({ chart, flat = false }) {
  const containerRef = useRef(null);
  const [svgContent, setSvgContent] = useState(null);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
        ...MERMAID_CONFIG,
        theme: theme === 'dark' ? 'dark' : 'default',
      });
      setIsInitialized(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;

    mermaid.initialize({
      ...MERMAID_CONFIG,
      theme: isDarkMode ? 'dark' : 'default',
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
      className={`mermaid-diagram${flat ? ' mermaid-diagram--flat' : ''}`}
      style={
        flat
          ? undefined
          : {
              display: 'flex',
              justifyContent: 'center',
              padding: '1rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              overflow: 'auto',
              minHeight: '200px',
            }
      }
    >
      {svgContent ? (
        <div
          className="mermaid-diagram__svg"
          dangerouslySetInnerHTML={{ __html: svgContent }}
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
