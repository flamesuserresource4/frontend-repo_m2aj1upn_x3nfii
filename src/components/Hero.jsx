import React from 'react';
import Spline from '@splinetool/react-spline';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[80vh] md:min-h-[90vh] w-full overflow-hidden bg-[#0B1E3F] text-white">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/cEecEwR6Ehj4iT8T/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Subtle gradient overlay to improve text readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0B1E3F]/80 via-[#0B1E3F]/70 to-[#0B1E3F]/90" />

      <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">
        <p className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm tracking-wide backdrop-blur">
          Licensed • Insured • Trusted
        </p>
        <h1 className="font-serif text-4xl font-semibold leading-tight md:text-6xl">
          Transform Your Home with
          <span className="block text-[#C7A76C]">Compass Remodeling</span>
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/80 md:text-lg">
          Complete home remodeling, maintenance, and design services.
          Professional craftsmanship with a focus on quality and transparency.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            className="rounded-md bg-[#C7A76C] px-6 py-3 text-[#0B1E3F] transition hover:bg-[#b89656]"
          >
            Get a Free Quote
          </a>
          <a
            href="#gallery"
            className="rounded-md border border-white/20 bg-white/10 px-6 py-3 text-white transition hover:bg-white/20"
          >
            View Our Work
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
