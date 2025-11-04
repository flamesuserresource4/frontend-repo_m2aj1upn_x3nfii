import React from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Contact from './components/Contact';

const App = () => {
  return (
    <div className="min-h-screen bg-white text-[#0B1E3F]">
      {/* Top navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-[#0B1E3F]/10 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#home" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B1E3F]">
              <span className="text-lg font-bold text-[#C7A76C]">⦿</span>
            </div>
            <div className="leading-tight">
              <div className="font-serif text-lg font-semibold tracking-tight">Compass Remodeling</div>
              <div className="text-[11px] uppercase tracking-wider text-[#0B1E3F]/60">Transforming Homes</div>
            </div>
          </a>
          <nav className="hidden gap-6 text-sm md:flex">
            <a href="#services" className="hover:text-[#C7A76C]">Services</a>
            <a href="#gallery" className="hover:text-[#C7A76C]">Gallery</a>
            <a href="#contact" className="hover:text-[#C7A76C]">Contact</a>
          </nav>
          <a
            href="#contact"
            className="hidden rounded-md bg-[#C7A76C] px-4 py-2 text-sm text-[#0B1E3F] transition hover:bg-[#b89656] md:block"
          >
            Free Quote
          </a>
        </div>
      </header>

      <main>
        <Hero />
        <Services />
        <Gallery />
        <Contact />
      </main>

      <footer className="border-t border-[#0B1E3F]/10 bg-[#EADBC8] py-8 text-sm">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <p className="text-[#0B1E3F]/70">© {new Date().getFullYear()} Compass Remodeling. All rights reserved.</p>
          <p className="text-[#0B1E3F]/70">
            Site Title: Compass Remodeling | Transforming Homes with Expertise · Crafted with care.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
