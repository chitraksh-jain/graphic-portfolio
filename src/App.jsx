import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Services from './components/Services';
import Footer from './components/Footer';

function App() {
  return (
    <>
      {/* Liquid Aura Background Mesh */}
      <div id="bg-aura-container">
        <div className="aura-blob blob-teal"></div>
        <div className="aura-blob blob-violet"></div>
        <div className="aura-blob blob-coral"></div>
        <div className="aura-blob blob-indigo"></div>
      </div>

      {/* Navigation Bar */}
      <Navbar />

      {/* Website Sections */}
      <main>
        <Hero />
        <About />
        <Projects />
        <Services />
      </main>

      {/* Footer / CTA / Contact */}
      <Footer />
    </>
  );
}

export default App;
