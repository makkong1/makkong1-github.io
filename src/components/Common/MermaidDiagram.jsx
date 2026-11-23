import { useEffect, useRef, useState } from 'react';

const MERMAID_CONFIG = {
  startOnLoad: false,
  securityLevel: 'loose',
  fontFamily: 'inherit',
  flowchart: {
    useMaxWidth: true,
    htmlLabels: false,
  },
};

// mermaid 는 메인 번들에 넣지 않고 다이어그램이 있는 페이지에서 처음 필요할 때 받는다.
// (홈에는 다이어그램이 없다. 정적 import 였을 때 mermaid 가 메인 청크에 들어가
//  첫 화면에서 1.5MB 를 같이 내려받고 있었다.)
let mermaidPromise = null;
function loadMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = import('mermaid').then((mod) => mod.default);
  }
  return mermaidPromise;
}

function MermaidDiagram({ chart, flat = false }) {
  const containerRef = useRef(null);
  const [svgContent, setSvgContent] = useState(null);
  const [error, setError] = useState(null);
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
    if (!chart || !containerRef.current) return;

    let cancelled = false;

    // initialize 와 render 를 한 흐름에 둔다. 테마가 바뀔 때 두 effect 로 나누면
    // 비동기 로딩에서 재설정보다 렌더가 먼저 끝날 수 있다.
    const renderDiagram = async () => {
      try {
        setError(null);
        setSvgContent(null);

        const mermaid = await loadMermaid();
        if (cancelled) return;

        mermaid.initialize({
          ...MERMAID_CONFIG,
          theme: isDarkMode ? 'dark' : 'default',
        });

        const id = `mermaid-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

        let { svg } = await mermaid.render(id, chart);
        if (cancelled) return;

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
        if (cancelled) return;
        console.error('Mermaid render error:', err);
        setError('다이어그램을 불러올 수 없습니다: ' + err.message);
      }
    };

    renderDiagram();
    return () => {
      cancelled = true;
    };
  }, [chart, isDarkMode]);

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
