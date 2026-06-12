import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpRight, Download, FileText, Compass, X } from 'lucide-react';

// Import Udaipur Erratic Ways Assets
import erraticSunboard from '../assets/Graphic Projects/Udaipur poster sunboard_.png';
import erraticPdf from '../assets/Graphic Projects/Udaipur Itenary_20250717_185157_0000.pdf';

// Import Other Graphics
import spidermanImg from '../assets/Graphic Projects/Spiderman Poster.png';
import mangoIcecreamImg from '../assets/Graphic Projects/MANGO ICECREAM.png';
import juiceCansImg from '../assets/Graphic Projects/Juice Cans.png';
import fitstarImg from '../assets/Graphic Projects/Fitstar gym.png';
import dodgeImg from '../assets/Graphic Projects/Dodge Challanger.png';
import foodDesignImg from '../assets/Graphic Projects/Food Design.png';
import gameThumbnailImg from '../assets/Graphic Projects/Game Thumbnail.png';
import teaImg from '../assets/Graphic Projects/Tea.png';
import twinTowerImg from '../assets/Graphic Projects/Twin Tower Trek.png';
import vlogThumbnailImg from '../assets/Graphic Projects/Vlog Thumbnail.png';
import shoeBrandingImg from '../assets/Graphic Projects/Shoe Branding.png';

// Reusable individual Card component that triggers its own scroll popup animation
function ProjectCard({ item, idx, onClick }) {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold: 0.1,
        // Start animation slightly before card enters viewport for smoother scroll experience
        rootMargin: '0px 0px -60px 0px' 
      }
    );
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      onClick={onClick}
      className={`glass-panel project-card pop-up ${isVisible ? 'active' : ''}`}
      style={{
        breakInside: 'avoid',
        display: 'inline-flex',
        flexDirection: 'column',
        width: '100%',
        marginBottom: '30px',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '24px',
        border: '1px solid rgba(255,255,255,0.06)',
        // Stagger stagger animations based on column side
        transitionDelay: `${(idx % 2) * 0.12}s`,
        background: 'rgba(255, 255, 255, 0.015)'
      }}
    >
      {/* Image Wrap */}
      <div style={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
        <img 
          src={item.img} 
          alt={item.title}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            objectFit: 'contain',
            transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
        {/* Overlay Gradient */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 55%, rgba(11, 9, 20, 0.95) 100%)',
            zIndex: 1
          }}
        />
      </div>

      {/* Card Glass Overlay info block */}
      <div 
        className="project-info-glass"
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          right: '20px',
          zIndex: 2,
          padding: '16px 20px',
          borderRadius: '16px',
          background: 'rgba(11, 9, 20, 0.65)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div>
          <div 
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--clr-coral)',
              marginBottom: '4px'
            }}
          >
            {item.number} / {item.category}
          </div>
          <h3 
            style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#fff'
            }}
          >
            {item.title}
          </h3>
        </div>
        <div 
          className="project-icon-circle"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            transition: 'all 0.3s ease'
          }}
        >
          <ArrowUpRight size={16} />
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxProject, setLightboxProject] = useState(null);
  
  const erraticRef = useRef(null);
  const gridHeaderRef = useRef(null);
  const [erraticVisible, setErraticVisible] = useState(false);
  const [gridHeaderVisible, setGridHeaderVisible] = useState(false);

  useEffect(() => {
    const observerErratic = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setErraticVisible(true);
          observerErratic.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    const observerHeader = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGridHeaderVisible(true);
          observerHeader.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (erraticRef.current) observerErratic.observe(erraticRef.current);
    if (gridHeaderRef.current) observerHeader.observe(gridHeaderRef.current);

    return () => {
      if (erraticRef.current) observerErratic.disconnect();
      if (gridHeaderRef.current) observerHeader.disconnect();
    };
  }, []);

  const categories = ['All', 'Packaging', 'Branding', 'Posters', 'Digital & Editorial'];

  const projectsList = [
    {
      title: "Spiderman Poster Design",
      category: "Posters",
      img: spidermanImg,
      number: "01",
      aspect: "3/4"
    },
    {
      title: "Mango Ice Cream Box",
      category: "Packaging",
      img: mangoIcecreamImg,
      number: "02",
      aspect: "1/1"
    },
    {
      title: "Vibrant Juice Cans",
      category: "Packaging",
      img: juiceCansImg,
      number: "03",
      aspect: "4/5"
    },
    {
      title: "Fitstar Gym Branding",
      category: "Branding",
      img: fitstarImg,
      number: "04",
      aspect: "16/9"
    },
    {
      title: "Dodge Challenger Artwork",
      category: "Posters",
      img: dodgeImg,
      number: "05",
      aspect: "16/9"
    },
    {
      title: "Food Editorial Layout",
      category: "Digital & Editorial",
      img: foodDesignImg,
      number: "06",
      aspect: "4/5"
    },
    {
      title: "Game Thumbnail Artwork",
      category: "Digital & Editorial",
      img: gameThumbnailImg,
      number: "07",
      aspect: "16/9"
    },
    {
      title: "Organic Tea Packaging",
      category: "Packaging",
      img: teaImg,
      number: "08",
      aspect: "16/9"
    },
    {
      title: "Twin Tower Trek Banner",
      category: "Branding",
      img: twinTowerImg,
      number: "09",
      aspect: "16/9"
    },
    {
      title: "Creative Vlog Thumbnail",
      category: "Digital & Editorial",
      img: vlogThumbnailImg,
      number: "10",
      aspect: "16/9"
    },
    {
      title: "Shoe Branding Concept",
      category: "Branding",
      img: shoeBrandingImg,
      number: "11",
      aspect: "4/5"
    }
  ];

  const getCategoryCount = (cat) => {
    if (cat === 'All') return projectsList.length;
    return projectsList.filter(p => p.category === cat).length;
  };

  const filteredProjects = activeFilter === 'All' 
    ? projectsList 
    : projectsList.filter(p => p.category === activeFilter);

  const openLightbox = (project) => {
    setLightboxProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxProject(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section 
      id="featured-work" 
      style={{
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
        padding: '100px 0'
      }}
    >
      <div className="app-container">

        {/* ==========================================
           FEATURED EXPERIENCE: ERRATIC WAYS
           ========================================== */}
        <div 
          ref={erraticRef}
          className={`glass-panel fade-up ${erraticVisible ? 'active' : ''}`}
          style={{
            padding: '60px 48px',
            marginBottom: '120px',
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '50px',
            alignItems: 'center',
            textAlign: 'left',
            position: 'relative',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          {/* Subtle Glow inside experience card */}
          <div 
            style={{
              position: 'absolute',
              top: '-10%',
              left: '-10%',
              width: '250px',
              height: '250px',
              background: 'radial-gradient(circle, rgba(13,148,136,0.12) 0%, transparent 70%)',
              filter: 'blur(20px)',
              pointerEvents: 'none'
            }}
          />

          {/* Left Info Panel */}
          <div>
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'var(--clr-coral)',
                marginBottom: '20px'
              }}
            >
              <Compass size={16} />
              Featured Design Experience
            </div>

            <h2 
              className="text-display"
              style={{
                fontSize: 'clamp(2.2rem, 3.8vw, 3.6rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: '24px'
              }}
            >
              Erratic Ways<br />
              <span style={{ color: 'var(--clr-teal)' }}>Udaipur Campaign</span>
            </h2>

            <p 
              style={{
                fontSize: '1.1rem',
                color: 'var(--clr-text-secondary)',
                lineHeight: 1.6,
                marginBottom: '32px'
              }}
            >
              A cohesive visual branding identity and travel campaign crafted to inspire adventure in Udaipur. 
              The layout blends historical references, modern grid systems, and vibrant colors to form a 
              distinct editorial and brand environment.
            </p>

            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                marginBottom: '40px'
              }}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--clr-coral)' }} />
                <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>Deliverable: Custom sunboard poster graphics</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--clr-teal)' }} />
                <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>Deliverable: Full travel itinerary PDF publication</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a 
                href={erraticPdf}
                download="Chitraksh-Jain-Udaipur-Itinerary.pdf"
                className="btn-primary"
                style={{
                  boxShadow: '0 8px 25px rgba(244, 63, 94, 0.15)',
                  borderColor: 'rgba(244, 63, 94, 0.3)'
                }}
              >
                Download PDF Itinerary
                <Download size={18} />
              </a>
              
              <button 
                onClick={() => openLightbox({ title: "Erratic Ways Udaipur Campaign", category: "Udaipur Campaign Sunboard", img: erraticSunboard })}
                className="btn-primary"
                style={{
                  background: 'transparent',
                  borderColor: 'rgba(255,255,255,0.1)'
                }}
              >
                Expand Sunboard
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>

          {/* Right Image Banner */}
          <div 
            className="experience-banner"
            onClick={() => openLightbox({ title: "Erratic Ways Udaipur Campaign", category: "Udaipur Campaign Sunboard", img: erraticSunboard })}
            style={{
              width: '100%',
              height: '420px',
              borderRadius: '20px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.08)',
              cursor: 'pointer'
            }}
          >
            <img 
              src={erraticSunboard} 
              alt="Udaipur Sunboard Graphic"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
        </div>

        {/* ==========================================
           CURATED PROJECTS MASONRY GRID
           ========================================== */}
        <div>
          {/* Grid Heading */}
          <div 
            ref={gridHeaderRef}
            className={`fade-up ${gridHeaderVisible ? 'active' : ''}`}
            style={{
              textAlign: 'center',
              marginBottom: '60px'
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
              Portfolio Grid
            </div>
            <h2 
              className="text-display"
              style={{
                fontSize: 'clamp(2.3rem, 4vw, 3.5rem)',
                fontWeight: 900,
                marginBottom: '32px'
              }}
            >
              Curated Creative Works
            </h2>

            {/* Filters */}
            <div 
              className="filter-tabs"
              style={{
                display: 'inline-flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '12px',
                padding: '6px',
                borderRadius: '50px',
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.01)',
                backdropFilter: 'blur(10px)'
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: activeFilter === cat ? '#fff' : 'var(--clr-text-secondary)',
                    backgroundColor: activeFilter === cat ? 'rgba(124, 58, 237, 0.3)' : 'transparent',
                    border: '1px solid ' + (activeFilter === cat ? 'rgba(124, 58, 237, 0.4)' : 'transparent'),
                    padding: '8px 20px',
                    borderRadius: '30px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (activeFilter !== cat) e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    if (activeFilter !== cat) e.currentTarget.style.color = 'var(--clr-text-secondary)';
                  }}
                >
                  {cat} ({getCategoryCount(cat)})
                </button>
              ))}
            </div>
          </div>

          {/* Columns-Based Masonry Grid preserving natural Aspect Ratio & triggering scroll reveals */}
          <div 
            className="masonry-column-grid"
            style={{
              columnCount: window.innerWidth > 768 ? 2 : 1,
              columnGap: '30px',
              width: '100%'
            }}
          >
            {filteredProjects.map((item, idx) => (
              <ProjectCard 
                key={item.title}
                item={item}
                idx={idx}
                onClick={() => openLightbox(item)}
              />
            ))}
          </div>
        </div>

      </div>

      {/* ==========================================
         LIGHTBOX MODAL VIEWPORT
         ========================================== */}
      {lightboxProject && (
        <div 
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(6, 4, 10, 0.85)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '30px',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          {/* Close Button */}
          <button 
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: '30px',
              right: '30px',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10001,
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
          >
            <X size={24} />
          </button>

          {/* Modal Content container */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="glass-panel"
            style={{
              position: 'relative',
              maxWidth: '90%',
              maxHeight: '90%',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.02)',
              boxShadow: '0 30px 70px rgba(0,0,0,0.8)'
            }}
          >
            {/* High-res Image */}
            <img 
              src={lightboxProject.img} 
              alt={lightboxProject.title}
              style={{
                maxWidth: '100%',
                maxHeight: '72vh',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
              }}
            />

            {/* Description Text */}
            <div style={{ width: '100%', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--clr-coral)', fontWeight: 700, letterSpacing: '0.12em' }}>
                  {lightboxProject.category}
                </span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '4px', color: '#fff' }}>
                  {lightboxProject.title}
                </h2>
              </div>

              {/* Download Image Button if available */}
              <a 
                href={lightboxProject.img}
                download={`${lightboxProject.title}.png`}
                className="btn-primary"
                style={{ padding: '10px 20px', fontSize: '0.85rem', borderRadius: '30px' }}
              >
                Download Original
                <Download size={14} />
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 991px) {
          #featured-work .glass-panel[style*="display: grid"] {
            grid-template-columns: 1fr !important;
            padding: 40px 24px !important;
            gap: 40px !important;
          }
          .experience-banner {
            height: 300px !important;
          }
        }
        
        .project-card {
          transition: all 0.5s var(--transition-spring) !important;
        }
        
        .project-card:hover img {
          transform: scale(1.03);
        }
        
        .project-card:hover .project-info-glass {
          background: rgba(124, 58, 237, 0.22) !important;
          border-color: rgba(124, 58, 237, 0.35) !important;
          box-shadow: 0 8px 30px rgba(124, 58, 237, 0.2) !important;
        }

        .project-card:hover .project-icon-circle {
          background: #fff !important;
          color: var(--clr-bg) !important;
          transform: rotate(45deg);
        }
      `}</style>
    </section>
  );
}
