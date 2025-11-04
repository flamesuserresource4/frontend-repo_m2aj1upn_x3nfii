import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="w-full bg-[#0B1E3F] py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-serif text-3xl font-semibold md:text-5xl">Request a Free Quote</h2>
            <p className="mt-3 text-white/80">
              Tell us about your project, timeline, and goals. Our team will respond within one business day.
            </p>
            <div className="mt-6 space-y-3 text-sm text-white/80">
              <p className="flex items-center gap-2"><Mail size={18} /> hello@compassremodeling.com</p>
              <p className="flex items-center gap-2"><Phone size={18} /> (555) 123-4567</p>
              <p className="flex items-center gap-2"><MapPin size={18} /> 1200 Oak Avenue, Suite 200, Portland, OR</p>
            </div>
          </div>

          <form className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-white/80">Name</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-white placeholder-white/40 outline-none focus:border-white"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/80">Email</label>
                <input
                  type="email"
                  className="w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-white placeholder-white/40 outline-none focus:border-white"
                  placeholder="jane@example.com"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/80">Phone</label>
                <input
                  type="tel"
                  className="w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-white placeholder-white/40 outline-none focus:border-white"
                  placeholder="(555) 000-0000"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm text-white/80">Message</label>
                <textarea
                  rows={4}
                  className="w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-white placeholder-white/40 outline-none focus:border-white"
                  placeholder="Tell us about your project..."
                />
              </div>
            </div>
            <button
              type="button"
              className="mt-4 w-full rounded-md bg-[#C7A76C] px-6 py-3 text-[#0B1E3F] transition hover:bg-[#b89656]"
              onClick={() => alert('Thanks! We\'ll be in touch shortly.')}
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10">
          <iframe
            title="Compass Remodeling Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.590005461324!2d-122.676207!3d45.523064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDUuNTIzMDY0LC0xMjIuNjc2MjA3!5e0!3m2!1sen!2sus!4v1700000000000"
            width="100%"
            height="320"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
