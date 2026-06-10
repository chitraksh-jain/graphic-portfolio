import React, { useRef, useState, useEffect } from 'react';

export default function About() {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <section 
      id="about" 
      className="section-padding"
      style={{
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden'
      }}
    >
      <div className="app-container">
        <div 
          ref={containerRef}
          className={`glass-panel fade-up ${isVisible ? 'active' : ''}`}
          style={{
            padding: '80px 60px',
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '60px',
            alignItems: 'center',
            textAlign: 'left',
            overflow: 'hidden'
          }}
        >
          {/* Subtle background decorative element */}
          <div 
            style={{
              position: 'absolute',
              top: '-20%',
              right: '-10%',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(244,63,94,0.06) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />

          {/* Left Text Block */}
          <div>
            <div 
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--clr-teal)',
                marginBottom: '20px'
              }}
            >
              Who I Am
            </div>
            
            <h2 
              className="text-display"
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
                lineHeight: 1.15,
                fontWeight: 800,
                marginBottom: '28px'
              }}
            >
              Hi, I’m Chitraksh Jain.
            </h2>
            
            <p 
              style={{
                fontSize: 'clamp(1.1rem, 1.8vw, 1.45rem)',
                lineHeight: 1.6,
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.9)',
                letterSpacing: '-0.01em',
                marginBottom: '20px'
              }}
            >
              I specialize in turning abstract concepts into high-impact visual stories. If you can think of it, I can design it.
            </p>
          </div>

          {/* Right Floating Visual Metaphor / Info Panel */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            {/* Design Principles Floating Glass Card */}
            <div 
              className="glass-panel float-fast"
              style={{
                padding: '24px 30px',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.06)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)'
              }}
            >
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--clr-coral)' }}>Core Philosophy</h3>
              <p style={{ color: 'var(--clr-text-secondary)', fontSize: '0.95rem' }}>
                Good design isn't just what it looks like. It is how it shifts perspective, evokes emotion, and builds bridges between imagination and reality.
              </p>
            </div>

            <div 
              className="glass-panel float-slow"
              style={{
                padding: '24px 30px',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.06)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                alignSelf: 'flex-end',
                width: '90%'
              }}
            >
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--clr-violet)' }}>Vision</h3>
              <p style={{ color: 'var(--clr-text-secondary)', fontSize: '0.95rem' }}>
                To defy gravity in design, lifting brands through vibrant expression and seamless user narratives.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Styles for responsiveness */}
      <style>{`
        @media (max-width: 991px) {
          #about .glass-panel {
            grid-template-columns: 1fr !important;
            padding: 50px 30px !important;
            gap: 40px !important;
          }
          #about .float-slow, #about .float-fast {
            align-self: stretch !important;
            width: 100% !important;
            animation: none !important; /* disable float to save power and layout on smaller screens */
          }
        }
      `}</style>
    </section>
  );
}
