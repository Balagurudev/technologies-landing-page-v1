import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-300">
      {/* CTA bar */}
      <div className="border-b border-white/10 bg-brand-800/30 py-10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 lg:flex-row">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-brand-300 lg:text-left">
            Contact us now!
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-7 text-sm font-semibold text-white transition-all hover:bg-brand-700 hover:shadow-lg"
            >
              For Training &amp; Internship
            </a>
            <a
              href="#contact"
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-7 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              For Projects &amp; R&amp;D
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-4 inline-flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-xs font-bold text-white">S</span>
              </div>
              <span className="text-lg font-bold text-white">
                Solutions<span className="text-brand-400">Global</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Empowering the next generation of engineers through world-class R&D, projects,
              and AI-driven training programs.
            </p>
          </div>

          {/* Reach out */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-white">
              Reach out to us on...
            </h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <span>
                  403 C, 3rd Cross Rd, near Manikualya Apartments, 3rd Phase,
                  J.P. Nagar, Bengaluru, Karnataka – 560076
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-brand-400" />
                <a href="mailto:info@technologicsglobal.com" className="hover:text-brand-300 transition-colors">
                  info@technologicsglobal.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-brand-400" />
                <a href="tel:+919606427062" className="hover:text-brand-300 transition-colors">
                  +91 9606427062
                </a>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-white">Platform</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="#projects" className="hover:text-brand-300 transition-colors">Projects</Link></li>
              <li><Link href="#services" className="hover:text-brand-300 transition-colors">R&D Solutions</Link></li>
              <li><Link href="#courses" className="hover:text-brand-300 transition-colors">Training</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-white">Company</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="#" className="hover:text-brand-300 transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-brand-300 transition-colors">Careers</Link></li>
              <li><Link href="#contact" className="hover:text-brand-300 transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>Copyright © {new Date().getFullYear()} Solutions Global</p>
          <div className="flex gap-5">
            <Link href="#" className="hover:text-brand-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-brand-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
