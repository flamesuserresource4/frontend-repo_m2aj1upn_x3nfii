import React from 'react';
import { Hammer, Wrench, Leaf, Shield, ChevronRight } from 'lucide-react';

const services = [
  {
    title: 'Remodeling',
    description:
      'Full-service kitchen, bath, and whole-home renovations with premium finishes and precision details.',
    icon: Hammer,
  },
  {
    title: 'Plumbing',
    description:
      'Reliable plumbing upgrades, fixture installations, and leak repairs handled by licensed pros.',
    icon: Wrench,
  },
  {
    title: 'Gardening',
    description:
      'Landscape refreshes, seasonal upkeep, and outdoor living enhancements to elevate curb appeal.',
    icon: Leaf,
  },
  {
    title: 'Maintenance',
    description:
      'Preventive home care plans and on-demand fixes to keep your property running perfectly.',
    icon: Shield,
  },
];

const Services = () => {
  return (
    <section id="services" className="relative w-full bg-[#EADBC8] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-[#0B1E3F] md:text-5xl">
              Services Tailored to Your Home
            </h2>
            <p className="mt-3 max-w-2xl text-[#0B1E3F]/80">
              From concept to completion, our team brings craftsmanship and care to every project.
            </p>
          </div>
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-md border border-[#0B1E3F]/20 bg-white px-4 py-2 text-sm text-[#0B1E3F] transition hover:border-[#0B1E3F]/40 md:flex"
          >
            Get a quote <ChevronRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="group rounded-xl border border-[#0B1E3F]/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#0B1E3F] text-white">
                <Icon size={22} />
              </div>
              <h3 className="mt-4 font-serif text-xl text-[#0B1E3F]">{title}</h3>
              <p className="mt-2 text-sm text-[#0B1E3F]/80">{description}</p>
              <a
                href="#contact"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#0B1E3F] opacity-0 transition group-hover:opacity-100"
              >
                Request details <ChevronRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
