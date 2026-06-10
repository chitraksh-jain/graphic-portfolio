import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      setIsOpen(false);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`glass-panel navbar-container ${scrolled ? 'nav-scrolled' : ''}`}
      style={{
        position: 'fixed',
        top: scrolled ? '20px' : '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: scrolled ? 'calc(100% - 80px)' : 'calc(100% - 160px)',
        maxWidth: '1280px',
        height: '70px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        borderRadius: '50px',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        backdropFilter: 'blur(20px) saturate(140%)',
        backgroundColor: scrolled ? 'rgba(11, 9, 20, 0.4)' : 'rgba(255, 255, 255, 0.02)',
        borderColor: scrolled ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.06)'
      }}
    >
      {/* Logo */}
      <a 
        href="#" 
        onClick={(e) => scrollToSection(e, 'hero')}
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: '1.4rem',
          letterSpacing: '-0.03em',
          color: '#fff',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        CHITRAKSH<span style={{ color: 'var(--clr-coral)' }}>.</span>
      </a>

      {/* Desktop Navigation links */}
      <div 
        className="nav-links"
        style={{
          display: 'flex',
          gap: '32px',
          alignItems: 'center'
        }}
      >
        {[
          { name: 'Home', id: 'hero' },
          { name: 'About', id: 'about' },
          { name: 'Featured Work', id: 'featured-work' },
          { name: 'Services', id: 'services' }
        ].map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => scrollToSection(e, link.id)}
            className="nav-item-link"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: '0.95rem',
              color: 'var(--clr-text-secondary)',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
              position: 'relative'
            }}
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* Call to Action button */}
      <div className="nav-cta-container">
        <a 
          href="#contact" 
          onClick={(e) => scrollToSection(e, 'contact')}
          className="btn-primary"
          style={{
            padding: '10px 24px',
            fontSize: '0.9rem',
            borderRadius: '30px'
          }}
        >
          Let's Talk
          <ArrowUpRight size={16} />
        </a>
      </div>

      {/* Mobile Toggle Button */}
      <button 
        className="mobile-nav-toggle"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          color: '#fff',
          cursor: 'pointer'
        }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div 
          className="glass-panel mobile-menu"
          style={{
            position: 'absolute',
            top: '85px',
            right: '0',
            width: '260px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            padding: '24px',
            borderRadius: '20px',
            backdropFilter: 'blur(25px)'
          }}
        >
          {[
            { name: 'Home', id: 'hero' },
            { name: 'About', id: 'about' },
            { name: 'Featured Work', id: 'featured-work' },
            { name: 'Services', id: 'services' },
            { name: 'Contact', id: 'contact' }
          ].map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '1rem',
                color: 'var(--clr-text-secondary)',
                textDecoration: 'none',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)'
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
      
      {/* Styles inline fallback / support for responsivenes */}
      <style>{`
        @media (max-width: 1024px) {
          nav {
            width: calc(100% - 80px) !important;
            top: 20px !important;
          }
        }
        @media (max-width: 768px) {
          nav {
            width: calc(100% - 40px) !important;
            padding: 0 24px !important;
          }
          .nav-links, .nav-cta-container {
            display: none !important;
          }
          .mobile-nav-toggle {
            display: block !important;
          }
        }
        .nav-item-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1.5px;
          background-color: var(--clr-coral);
          transition: width 0.3s ease;
        }
        .nav-item-link:hover {
          color: #fff !important;
        }
        .nav-item-link:hover::after {
          width: 100%;
        }
      `}</style>
    </nav>
  );
}
