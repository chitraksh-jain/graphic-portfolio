import React, { useState, useRef, useEffect } from 'react';
import { ArrowDown, Layers, Laptop, Cpu, ShieldCheck, Sun, Eye } from 'lucide-react';

export default function Hero() {
  const panelRef = useRef(null);
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const ripplesRef = useRef([]);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [hoveredTool, setHoveredTool] = useState(null);
  const [scrolledPast, setScrolledPast] = useState(false);

  // Monitor Hero visibility to pause animation loops when offscreen (crucial for smooth scrolling)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '100px 0px' }
    );
    if (panelRef.current) {
      observer.observe(panelRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Monitor scroll height to fade out scroll prompt indicator
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolledPast(true);
      } else {
        setScrolledPast(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Setup the interactive water ripple canvas
  useEffect(() => {
    if (!isHeroVisible) return; // Pause animation loop completely if Hero is out of view

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let time = 0;

    // Define 3 slow-moving background water blobs (caustics) to simulate underwater waves
    const waterBlobs = [
      { x: 0.2, y: 0.3, radius: 160, vx: 0.0006, vy: 0.0008, phase: 0 },
      { x: 0.7, y: 0.6, radius: 220, vx: -0.0007, vy: 0.0005, phase: 2 },
      { x: 0.4, y: 0.8, radius: 180, vx: 0.0005, vy: -0.0006, phase: 4 }
    ];

    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Render loop for water caustics & ripples
    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const ripples = ripplesRef.current;

      // 1. Render slow-drifting organic glassy water blobs (no harsh vertical/grid lines)
      waterBlobs.forEach(blob => {
        blob.phase += 0.005;
        // Float within bounds
        const cx = canvas.width * blob.x + Math.sin(blob.phase) * 30;
        const cy = canvas.height * blob.y + Math.cos(blob.phase) * 30;

        const blobGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, blob.radius);
        blobGrad.addColorStop(0, 'rgba(255, 255, 255, 0.035)');
        blobGrad.addColorStop(0.5, 'rgba(13, 148, 136, 0.015)');
        blobGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = blobGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Render expanding water ripples (click/move triggered)
      ripples.forEach((r, idx) => {
        r.radius += r.speed;
        r.opacity -= 0.012; // smooth fade out

        if (r.opacity <= 0) {
          ripples.splice(idx, 1);
          return;
        }

        // Outer reflection ring
        ctx.strokeStyle = `rgba(255, 255, 255, ${r.opacity * 0.4})`;
        ctx.lineWidth = 2.5 * r.opacity;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner refraction ring
        ctx.strokeStyle = `rgba(124, 58, 237, ${r.opacity * 0.2})`;
        ctx.lineWidth = 1 * r.opacity;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius * 0.9, 0, Math.PI * 2);
        ctx.stroke();

        // Specular highlight spot (creates the "water droplet/glassy" feel)
        ctx.fillStyle = `rgba(255, 255, 255, ${r.opacity * 0.12})`;
        ctx.beginPath();
        ctx.arc(r.x - r.radius * 0.3, r.y - r.radius * 0.3, r.radius * 0.08, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Render organic light caustic blobs that follow mouse (the surfing shimmer)
      const grad = ctx.createRadialGradient(
        mousePos.x, mousePos.y, 10,
        mousePos.x, mousePos.y, 240
      );
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.06)');
      grad.addColorStop(0.3, 'rgba(13, 148, 136, 0.03)');
      grad.addColorStop(0.6, 'rgba(124, 58, 237, 0.01)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [mousePos, isHeroVisible]);

  const handleMouseMove = (e) => {
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Spawn tiny water trails when moving mouse (surfing trail effect!)
    if (Math.random() < 0.12) {
      ripplesRef.current.push({
        x,
        y,
        radius: 2,
        maxRadius: 35,
        opacity: 0.5,
        speed: 1.4,
        id: Math.random()
      });
    }
  };

  const handlePanelClick = (e) => {
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Spawn 2 nested water ripples for rich depth
    ripplesRef.current.push({
      x,
      y,
      radius: 4,
      maxRadius: 160,
      opacity: 0.9,
      speed: 2.8,
      id: Math.random()
    });
    
    ripplesRef.current.push({
      x,
      y,
      radius: 1,
      maxRadius: 120,
      opacity: 0.75,
      speed: 1.8,
      id: Math.random()
    });
  };

  const handleScrollToWork = (e) => {
    e.preventDefault();
    const element = document.getElementById('featured-work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Fluid Button Magnetic Effect Handlers
  const handleButtonMouseMove = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Magnetic pull: offset button by 25% of cursor offset, scale up slightly
    btn.style.transform = `translate3d(${x * 0.25}px, ${y * 0.25}px, 0) scale(1.03)`;
  };

  const handleButtonMouseLeave = (e) => {
    const btn = e.currentTarget;
    btn.style.transform = '';
  };

  // Inline SVG icons for PS/AI/FG stickers
  const PsIcon = () => (
    <span style={{ fontSize: '1.25rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: '#00c8ff' }}>Ps</span>
  );
  const AiIcon = () => (
    <span style={{ fontSize: '1.25rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: '#ff9d00' }}>Ai</span>
  );
  const FgIcon = () => (
    <span style={{ fontSize: '1.25rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: '#ff4b87' }}>Fg</span>
  );

  const tooltipsData = {
    Photoshop: "Ps: Creative Compositing & Packaging Mockups",
    Illustrator: "Ai: Vector Illustration & Brand Marks",
    Figma: "Fg: High-Fidelity UI Layouts",
    Design: "Laptop: Core Design Station & Project Execution"
  };

  return (
    <section 
      id="hero" 
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '120px 0 60px'
      }}
    >
      <div className="app-container" style={{ width: '100%' }}>
        
        {/* Giant Rounded Liquid Glass Panel enclosing the Hero */}
        <div 
          ref={panelRef}
          onMouseMove={handleMouseMove}
          onClick={handlePanelClick}
          className="glass-panel liquid-hero-panel"
          style={{
            width: '100%',
            padding: '80px 60px 110px',
            borderRadius: '40px',
            position: 'relative',
            overflow: 'hidden',
            // High transparency, Apple skeuomorphic glossy glass styling
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.008) 0%, rgba(255, 255, 255, 0.001) 100%)',
            // Optimize backdrop blur size to balance glassy refraction and scrolling performance
            backdropFilter: 'blur(20px) saturate(160%)',
            WebkitBackdropFilter: 'blur(20px) saturate(160%)',
            // Force Hardware Acceleration/GPU Layering for silky smooth page scroll
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform',
            // Specular shiny borders
            borderTop: '2px solid rgba(255, 255, 255, 0.3)',
            borderLeft: '2px solid rgba(255, 255, 255, 0.2)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            borderRight: '1px solid rgba(255, 255, 255, 0.06)',
            boxShadow: '0 40px 100px -10px rgba(0, 0, 0, 0.65), inset 0 1px 0px 0 rgba(255,255,255,0.2)',
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '40px',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          {/* Water Canvas simulation layer */}
          <canvas 
            ref={canvasRef}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 1,
              mixBlendMode: 'screen',
              willChange: 'transform'
            }}
          />

          {/* Underlapping background mesh layer */}
          <div 
            style={{
              position: 'absolute',
              width: '130%',
              height: '130%',
              top: '-15%',
              left: '-15%',
              background: 'radial-gradient(circle, rgba(13,148,136,0.08) 0%, rgba(244,63,94,0.08) 50%, transparent 100%)',
              filter: 'blur(40px)',
              pointerEvents: 'none',
              zIndex: 0
            }}
          />

          {/* Left Side: Hero Text Layout */}
          <div 
            className="hero-text-content"
            style={{
              textAlign: 'left',
              zIndex: 3,
              position: 'relative',
              pointerEvents: 'auto'
            }}
          >
            <div 
              style={{ 
                textTransform: 'uppercase', 
                letterSpacing: '0.22em', 
                fontSize: '0.85rem',
                fontWeight: 800,
                color: 'var(--clr-coral)',
                marginBottom: '20px'
              }}
            >
              Chitraksh Jain &bull; Creative Studio
            </div>
            
            <h1 
              className="text-display"
              style={{
                fontSize: 'clamp(2.5rem, 4.2vw, 4.6rem)',
                lineHeight: 1.08,
                fontWeight: 900,
                marginBottom: '28px',
                color: '#fff',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}
            >
              You bring the <span style={{
                background: 'linear-gradient(120deg, #38bdf8, var(--clr-violet), var(--clr-coral))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>vision</span>.<br />
              I build the <span style={{
                background: 'linear-gradient(120deg, var(--clr-coral), var(--clr-violet), #38bdf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>visuals</span>.
            </h1>

            <p 
              style={{
                fontSize: 'clamp(1rem, 1.3vw, 1.25rem)',
                color: 'var(--clr-text-secondary)',
                maxWidth: '480px',
                marginBottom: '40px',
                lineHeight: 1.6,
                textShadow: '0 1px 4px rgba(0,0,0,0.2)'
              }}
            >
              Crafting premium visual stories, brand identities, and high-impact packaging. Defying gravity to elevate digital design.
            </p>

            <div>
              <a 
                href="#featured-work" 
                onClick={handleScrollToWork}
                onMouseMove={handleButtonMouseMove}
                onMouseLeave={handleButtonMouseLeave}
                className="btn-primary"
                style={{
                  boxShadow: '0 8px 25px rgba(13, 148, 136, 0.15)'
                }}
              >
                See My Work
                <ArrowDown size={18} />
              </a>
            </div>
          </div>

          {/* Right Side: Apple iOS-Inspired Control Center Glass Widgets & Stickers */}
          <div 
            className="hero-widgets-sandbox"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 0.9fr',
              gap: '20px',
              zIndex: 3,
              position: 'relative',
              pointerEvents: 'auto'
            }}
          >
            {/* Interactive Tooltip Overlay */}
            {hoveredTool && (
              <div 
                className="glass-panel"
                style={{
                  position: 'absolute',
                  top: '-60px',
                  left: '0px',
                  right: '0px',
                  padding: '12px 18px',
                  borderRadius: '14px',
                  background: 'rgba(11, 9, 20, 0.82)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#fff',
                  textAlign: 'center',
                  zIndex: 20,
                  pointerEvents: 'none',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
                  animation: 'fadeInScale 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                }}
              >
                {tooltipsData[hoveredTool]}
              </div>
            )}

            {/* Widget 1: WiFi-Style Toolkit Control Panel */}
            <div 
              className="glass-panel float-slow"
              style={{
                padding: '24px',
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.015)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                backdropFilter: 'blur(10px)',
                borderTop: '1px solid rgba(255,255,255,0.2)',
                borderLeft: '1px solid rgba(255,255,255,0.15)'
              }}
            >
              {[
                { icon: <PsIcon />, name: 'Photoshop', color: 'rgba(0,200,255,0.12)', active: true },
                { icon: <AiIcon />, name: 'Illustrator', color: 'rgba(255,157,0,0.12)', active: true },
                { icon: <FgIcon />, name: 'Figma', color: 'rgba(255,75,135,0.12)', active: true },
                { icon: <Laptop size={20} style={{ color: '#a78bfa' }} />, name: 'Design', color: 'rgba(167,139,250,0.12)', active: false }
              ].map((tool, idx) => (
                <div 
                  key={idx}
                  className="widget-button"
                  onMouseEnter={() => setHoveredTool(tool.name === 'Design' ? 'Design' : tool.name)}
                  onMouseLeave={() => setHoveredTool(null)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    height: '74px',
                    borderRadius: '16px',
                    background: tool.active ? tool.color : 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid ' + (tool.active ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.03)'),
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    setHoveredTool(tool.name === 'Design' ? 'Design' : tool.name);
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                    e.currentTarget.style.background = tool.active ? tool.color : 'rgba(255, 255, 255, 0.06)';
                  }}
                  onMouseLeave={(e) => {
                    setHoveredTool(null);
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.borderColor = tool.active ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.background = tool.active ? tool.color : 'rgba(255, 255, 255, 0.02)';
                  }}
                >
                  {tool.icon}
                </div>
              ))}
            </div>

            {/* Widget 2: Volume-style vertical slider ("Creativity Index") */}
            <div 
              className="glass-panel float-med"
              style={{
                padding: '24px 20px',
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.015)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '190px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                backdropFilter: 'blur(10px)',
                borderTop: '1px solid rgba(255,255,255,0.2)',
                borderLeft: '1px solid rgba(255,255,255,0.15)'
              }}
            >
              {/* Slider track */}
              <div 
                style={{
                  width: '28px',
                  height: '100px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderRadius: '14px',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.03)'
                }}
              >
                {/* Active volume slide */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '85%',
                    background: 'linear-gradient(to top, var(--clr-violet), var(--clr-coral))',
                    borderRadius: '12px'
                  }}
                />
              </div>

              {/* Slider tag */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.6)' }}>
                  CREATIVE
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 900, color: 'var(--clr-coral)' }}>
                  85%
                </div>
              </div>
            </div>

            {/* Widget 3: Horizontal Focus Pill */}
            <div 
              className="glass-panel float-fast"
              style={{
                gridColumn: 'span 2',
                padding: '16px 24px',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.015)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                backdropFilter: 'blur(10px)',
                borderTop: '1px solid rgba(255,255,255,0.2)',
                borderLeft: '1px solid rgba(255,255,255,0.15)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div 
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(244,63,94,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--clr-coral)'
                  }}
                >
                  <Cpu size={16} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff' }}>Render Engine</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--clr-text-secondary)' }}>Status: Active &bull; GPU accelerated</div>
                </div>
              </div>
              
              <div style={{ fontSize: '0.72rem', color: 'var(--clr-teal)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--clr-teal)' }} />
                ONLINE
              </div>
            </div>

            {/* Widget 4: Bobbing Circular Buttons */}
            <div 
              style={{
                gridColumn: 'span 2',
                display: 'flex',
                justifyContent: 'space-between',
                gap: '12px'
              }}
            >
              {[
                { icon: <Layers size={18} />, label: "Layers" },
                { icon: <ShieldCheck size={18} />, label: "Quality" },
                { icon: <Eye size={18} />, label: "Preview" }
              ].map((btn, idx) => (
                <button 
                  key={idx}
                  onMouseMove={handleButtonMouseMove}
                  onMouseLeave={handleButtonMouseLeave}
                  className="widget-circle-btn"
                  style={{
                    flex: 1,
                    height: '46px',
                    borderRadius: '24px',
                    background: 'rgba(255, 255, 255, 0.015)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease',
                    borderTop: '1px solid rgba(255,255,255,0.15)',
                    borderLeft: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  {btn.icon}
                  <span className="btn-label-text">{btn.label}</span>
                </button>
              ))}
            </div>

          </div>

          {/* Animated Scroll Indicator Prompt (Aero droplet bounce style) */}
          <div 
            className="scroll-prompt-indicator"
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              color: 'rgba(255,255,255,0.35)',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              opacity: scrolledPast ? 0 : 1,
              transition: 'opacity 0.4s ease, transform 0.4s ease',
              pointerEvents: 'none',
              zIndex: 4
            }}
          >
            <span>Scroll</span>
            <div className="scroll-indicator-dot" />
          </div>

        </div>

      </div>

      <style>{`
        .liquid-hero-panel {
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }

        .liquid-hero-panel:hover {
          border-color: rgba(255, 255, 255, 0.42) !important;
          box-shadow: 0 45px 110px -15px rgba(0, 0, 0, 0.8), inset 0 1px 1px 0 rgba(255,255,255,0.25) !important;
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(8px); opacity: 0.95; }
        }

        .scroll-indicator-dot {
          width: 5px;
          height: 10px;
          border-radius: 4px;
          border: 1.5px solid rgba(255, 255, 255, 0.4);
          position: relative;
          animation: scroll-bounce 1.6s infinite ease-in-out;
        }

        @media (max-width: 991px) {
          .liquid-hero-panel {
            grid-template-columns: 1fr !important;
            padding: 50px 24px 80px !important;
            gap: 50px !important;
            text-align: center !important;
          }
          .hero-text-content {
            text-align: center !important;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-widgets-sandbox {
            max-width: 420px;
            margin: 0 auto;
            width: 100%;
          }
          .btn-label-text {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
