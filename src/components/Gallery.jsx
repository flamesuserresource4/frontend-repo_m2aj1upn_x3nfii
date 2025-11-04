import React, { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

const FALLBACK = [
  { src: 'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?q=80&w=1200&auto=format&fit=crop', alt: 'Modern kitchen remodel' },
  { src: 'https://images.unsplash.com/photo-1682888813913-e13f18692019?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwcmVtb2RlbHxlbnwwfDB8fHwxNzYyMjE3NDI4fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80', alt: 'Living room renovation' },
  { src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop', alt: 'Bathroom with marble details' },
  { src: 'https://images.unsplash.com/photo-1682888813913-e13f18692019?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwcmVtb2RlbHxlbnwwfDB8fHwxNzYyMjE3NDI4fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80', alt: 'Outdoor patio enhancement' },
  { src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop', alt: 'Custom carpentry work' },
  { src: 'https://images.unsplash.com/photo-1682888813913-e13f18692019?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwcmVtb2RlbHxlbnwwfDB8fHwxNzYyMjE3NDI4fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80', alt: 'Luxury bathroom remodel' },
];

const Gallery = () => {
  const [images, setImages] = useState(FALLBACK);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/gallery`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length) {
            setImages(data.map((d) => ({ src: d.image_url, alt: d.title })));
          }
        }
      } catch {}
    })();
  }, []);

  return (
    <section id="gallery" className="w-full bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-semibold text-[#0B1E3F] md:text-5xl">Featured Projects</h2>
          <p className="mt-3 text-[#0B1E3F]/80">A selection of recent renovations, upgrades, and exterior refreshes.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-6">
          {images.map((img) => (
            <figure key={img.src} className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-[#0B1E3F]/10 bg-[#EADBC8]/30">
              <img src={img.src} alt={img.alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
              <figcaption className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1E3F]/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            </figure>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href="#contact" className="inline-block rounded-md bg-[#0B1E3F] px-6 py-3 text-white transition hover:bg-[#0a1934]">Start Your Project</a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
