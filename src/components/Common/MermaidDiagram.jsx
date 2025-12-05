import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

function MermaidDiagram({ chart }) {
  const containerRef = useRef(null);
  const [svgContent, setSvgContent] = useState(null);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      mermaid.initialize({ 
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose',
        fontFamily: 'inherit'
      });
      setIsInitialized(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    if (!chart || !isInitialized || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        setError(null);
        setSvgContent(null);
        
        const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        // mermaid.render을 사용하여 SVG 생성
        const { svg } = await mermaid.render(id, chart);
        setSvgContent(svg);
      } catch (err) {
        console.error('Mermaid render error:', err);
        setError('다이어그램을 불러올 수 없습니다: ' + err.message);
      }
    };

    renderDiagram();
  }, [chart, isInitialized]);

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
