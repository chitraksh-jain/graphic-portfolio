import React, { useRef, useState, useEffect } from 'react';
import { Layers, Package, Monitor, ArrowRight } from 'lucide-react';

export default function Services() {
  const sectionRef = useRef(null);
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
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) observer.disconnect();
    };
  }, []);

  const services = [
    {
      title: "Brand Identity",
      description: "Developing robust design languages, typographic guidelines, and bespoke logo marks that reflect the core character and vision of your brand.",
      icon: <Layers size={28} />,
      gradient: "linear-gradient(135deg, rgba(13, 148, 136, 0.2) 0%, transparent 100%)",
      color: "var(--clr-teal)",
      deliverables: ["Visual Styleguides", "Logo Design", "Typography Systems", "Brand Collateral"],
      floatClass: "float-slow"
    },
    {
      title: "Product Packaging",
      description: "Creating tangible experiences through tactile packaging structures and premium labels that demand attention on store shelves and unboxing videos.",
      icon: <Package size={28} />,
      gradient: "linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, transparent 100%)",
      color: "var(--clr-violet)",
      deliverables: ["Structure Prototyping", "Label Graphics", "Unboxing Design", "Sustainability Audit"],
      floatClass: "float-med"
    },
    {
      title: "Digital Content",
      description: "Crafting cutting-edge visual campaigns, responsive website assets, motion design, and high-impact social media layouts optimized for modern screens.",
      icon: <Monitor size={28} />,
      gradient: "linear-gradient(135deg, rgba(244, 63, 94, 0.2) 0%, transparent 100%)",
      color: "var(--clr-coral)",
      deliverables: ["Web UI Mockups", "Motion Graphics", "Social Media Kits", "Vector Illustration"],
      floatClass: "float-fast"
    }
  ];

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="section-padding"
      style={{
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden'
      }}
    >
      {/* Decorative backdrop mesh elements */}
      <div 
        style={{
          position: 'absolute',
          top: '30%',
          left: '-20%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(13,148,136,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      
      <div className="app-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div 
          className={`fade-up ${isVisible ? 'active' : ''}`}
          style={{
            textAlign: 'center',
            maxWidth: '680px',
            margin: '0 auto 80px'
          }}
        >
          <div 
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--clr-teal)',
              marginBottom: '16px'
            }}
          >
            My Expertise
          </div>
          <h2 
            className="text-display"
            style={{
              fontSize: 'clamp(2.5rem, 4vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: '20px'
            }}
          >
            Services Gallery
          </h2>
          <p style={{ color: 'var(--clr-text-secondary)', fontSize: '1.15rem' }}>
            A fusion of functional grids, bold typography, and visual mastery designed to lift your digital presence.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div 
          className="services-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '30px',
            width: '100%'
          }}
        >
          {services.map((svc, idx) => (
            <div 
              key={idx}
              className={`glass-panel pop-up ${isVisible ? 'active' : ''} ${svc.floatClass} service-card`}
              style={{
                padding: '48px 36px',
                textAlign: 'left',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                transitionDelay: `${idx * 0.15}s`,
                background: `linear-gradient(180deg, rgba(255,255,255,0.015) 0%, rgba(255,255,255,0.005) 100%)`
              }}
            >
              {/* Icon Container with radial backdrop blur */}
              <div 
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: svc.color,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: svc.gradient,
                  marginBottom: '32px',
                  position: 'relative'
                }}
              >
                {svc.icon}
              </div>

              {/* Title */}
              <h3 
                style={{
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  marginBottom: '16px',
                  color: '#fff'
                }}
              >
                {svc.title}
              </h3>

              {/* Description */}
              <p 
                style={{
                  color: 'var(--clr-text-secondary)',
                  fontSize: '0.98rem',
                  lineHeight: 1.6,
                  marginBottom: '32px',
                  flexGrow: 1
                }}
              >
                {svc.description}
              </p>

              {/* Deliverables divider */}
              <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)', marginBottom: '24px' }} />

              {/* Deliverables Bullet List */}
              <ul 
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                {svc.deliverables.map((item, id) => (
                  <li 
                    key={id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '0.9rem',
                      color: 'rgba(255,255,255,0.85)'
                    }}
                  >
                    <ArrowRight size={14} style={{ color: svc.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 991px) {
          .services-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          .service-card {
            animation: none !important;
            padding: 40px 28px !important;
          }
        }
        
        .service-card {
          transition: all 0.5s var(--transition-smooth) !important;
        }
        
        .service-card:hover {
          transform: translateY(-8px) scale(1.01) !important;
          border-color: rgba(255, 255, 255, 0.15) !important;
          background: rgba(255, 255, 255, 0.04) !important;
          box-shadow: 0 24px 60px rgba(0,0,0,0.4) !important;
        }
      `}</style>
    </section>
  );
}
