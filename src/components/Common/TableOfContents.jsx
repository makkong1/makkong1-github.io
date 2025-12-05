import { useState, useEffect } from 'react';

function TableOfContents({ sections }) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [sections]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div style={{
      position: 'sticky',
      top: '2rem',
      alignSelf: 'flex-start',
      minWidth: '200px',
      maxWidth: '250px',
      padding: '1.5rem',
      backgroundColor: 'var(--card-bg)',
      borderRadius: '8px',
      border: '1px solid var(--nav-border)',
      maxHeight: 'calc(100vh - 4rem)',
      overflowY: 'auto'
    }}>
      <h3 style={{
        marginBottom: '1rem',
        fontSize: '1rem',
        color: 'var(--text-color)',
        fontWeight: 'bold'
      }}>
        목차
      </h3>
      <nav>
        {sections.map(({ id, title }) => (
          <div
            key={id}
            onClick={() => scrollToSection(id)}
            style={{
              padding: '0.5rem 0.75rem',
              marginBottom: '0.25rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              color: activeSection === id ? 'var(--link-color)' : 'var(--text-secondary)',
              backgroundColor: activeSection === id ? 'var(--nav-bg)' : 'transparent',
              transition: 'all 0.2s ease',
              fontWeight: activeSection === id ? '500' : 'normal'
            }}
            onMouseEnter={(e) => {
              if (activeSection !== id) {
                e.target.style.color = 'var(--link-color)';
                e.target.style.backgroundColor = 'var(--nav-bg)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== id) {
                e.target.style.color = 'var(--text-secondary)';
                e.target.style.backgroundColor = 'transparent';
              }
            }}
          >
            {title}
          </div>
        ))}
      </nav>
    </div>
  );
}

export default TableOfContents;

