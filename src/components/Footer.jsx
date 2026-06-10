import React, { useRef, useState, useEffect } from 'react';
import { Mail, ArrowUpRight, ArrowUp } from 'lucide-react';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

export default function Footer() {
  const footerRef = useRef(null);
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
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    return () => {
      if (footerRef.current) observer.disconnect();
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="contact" 
      ref={footerRef}
      style={{
        padding: '120px 0 60px',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden'
      }}
    >
      <div className="app-container">
        
        {/* Massive CTA Card */}
        <div 
          className={`glass-panel fade-up ${isVisible ? 'active' : ''} cta-card`}
          style={{
            padding: '80px 40px',
            textAlign: 'center',
            borderRadius: '40px',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            marginBottom: '80px'
          }}
        >
          {/* Backdrop Glow blobs inside the card */}
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '320px',
              height: '320px',
              background: 'radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
              filter: 'blur(30px)'
            }}
          />

          <h2 
            className="text-display"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.8rem)',
              lineHeight: 1.1,
              fontWeight: 900,
              maxWidth: '850px',
              margin: '0 auto 36px',
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #fff 30%, var(--clr-text-secondary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Let's bring your ideas to life.
          </h2>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <a 
              href="mailto:chitraksh7440@gmail.com?subject=Project Inquiry" 
              className="btn-primary"
              style={{
                fontSize: '1.15rem',
                padding: '20px 48px',
                borderRadius: '50px'
              }}
            >
              Get In Touch
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Footer Sub-Links & Copyright */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '30px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '40px'
          }}
        >
          {/* Brand Logo info */}
          <div style={{ textAlign: 'left' }}>
            <div 
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '1.2rem',
                color: '#fff',
                marginBottom: '8px'
              }}
            >
              CHITRAKSH<span style={{ color: 'var(--clr-coral)' }}>.</span>
            </div>
            <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.88rem' }}>
              &copy; {new Date().getFullYear()} Chitraksh Jain. All rights reserved.
            </p>
            <p style={{ color: 'var(--clr-text-muted)', fontSize: 0.82 + "rem", marginTop: '6px', opacity: 0.8 }}>
              T: +91 9257757440 &nbsp;&bull;&nbsp; E: chitraksh7440@gmail.com
            </p>
          </div>

          {/* Social Icons Link List */}
          <div 
            style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center'
            }}
          >
            {[
              { icon: <GithubIcon />, url: "https://github.com/chitraksh-jain" },
              { icon: <LinkedinIcon />, url: "https://www.linkedin.com/in/chitraksh-jain-/" },
              { icon: <InstagramIcon />, url: "https://www.instagram.com/chitraksh_jai9/" }
            ].map((social, idx) => (
              <a 
                key={idx}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="social-btn-circle"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--clr-text-secondary)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  transition: 'all 0.3s ease'
                }}
              >
                {social.icon}
              </a>
            ))}

            {/* Back to Top */}
            <button 
              onClick={handleScrollToTop}
              className="social-btn-circle"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--clr-text-secondary)',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              title="Scroll to Top"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          footer .app-container {
            padding-bottom: 20px !important;
          }
          .cta-card {
            padding: 50px 20px !important;
          }
          footer div[style*="flex-wrap: wrap"] {
            flex-direction: column !important;
            text-align: center !important;
          }
          footer div[style*="text-align: left"] {
            text-align: center !important;
          }
        }
        
        .social-btn-circle:hover {
          color: #fff !important;
          background: rgba(124, 58, 237, 0.2) !important;
          border-color: rgba(124, 58, 237, 0.4) !important;
          transform: translateY(-3px);
        }
      `}</style>
    </footer>
  );
}
