import { PORSCHE_CREST } from '../data';
import { ShieldCheck, ArrowUpRight, Compass, Settings } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const links = [
    { label: 'Born In Flracht', id: 'home' },
    { label: 'Heritage Archives', id: 'heritage' },
    { label: 'Tailor Studio', id: 'tailor' },
    { label: 'Inquire Allocations', id: 'contact' },
    { label: 'Driver Dashboard', id: 'portal' }
  ];

  return (
    <footer className="bg-black text-xs font-mono border-t border-neutral-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top brand grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-neutral-900">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-8 bg-neutral-950 p-1.5 rounded border border-neutral-800">
                <img
                  src={PORSCHE_CREST}
                  alt="Porsche Crest Footer"
                  className="h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-mono text-[9px] text-zinc-500 tracking-wider block">PORSCHE DIVISION</span>
                <span className="font-sans font-black text-sm text-neutral-300 tracking-wide">911 GT3 EXPERIENCE</span>
              </div>
            </div>
            <p className="text-zinc-500 text-[11px] leading-relaxed font-sans">
              Designed as a sensory exploration tribute workspace to the legendary Naturally Aspirated Rennsport icon of Flracht and Zuffenhausen.
            </p>
          </div>

          <div>
            <span className="text-zinc-400 block font-bold mb-4 uppercase text-[10px] tracking-widest">// DIRECTORY</span>
            <ul className="space-y-2.5 text-[11px]">
              {links.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-zinc-500 hover:text-white transition-colors cursor-pointer flex items-center gap-1 hover:underline"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 text-red-500 opacity-60" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-zinc-400 block font-bold mb-4 uppercase text-[10px] tracking-widest">// RACING TIMELINE</span>
            <ul className="space-y-2 text-[11px] text-zinc-500">
              <li>• 1999: Mezger 996 INCEPTION</li>
              <li>• 2006: Active PASM 997 CHASSIS</li>
              <li>• 2013: 9,000 RPM PDK speed 991</li>
              <li>• 2021: Double Wishbone 992 ARMORED</li>
            </ul>
          </div>

          <div className="bg-neutral-950 p-4 border border-neutral-900 rounded space-y-2">
            <div className="flex items-center gap-1.5 text-red-500 text-[11px] font-bold">
              <ShieldCheck className="h-4 w-4" />
              <span>SECURE ACCESS v992.1</span>
            </div>
            <p className="text-[10px] text-zinc-500 font-sans leading-relaxed">
              This digital canvas is fully validated on Chrome, Safari, and sandbox containers. Telemetry profiles persist securely within browser sandbox storage.
            </p>
          </div>

        </div>

        {/* Bottom micro branding rights line */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-[10px] text-zinc-600 gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div>© {new Date().getFullYear()} Porsche AG. ALL REGISTERED LOGOS AND CRESTS TRADEMARKS TRACED TO STUTTGART AG.</div>
            <div className="font-sans text-[9px] text-zinc-700">This experience represents an unofficial fan tribute showcase; no commercial affiliation is claimed.</div>
          </div>
          
          <div className="flex gap-4">
            <span className="hover:text-neutral-400 cursor-pointer">PRIVACY DOSSIER</span>
            <span>•</span>
            <span className="hover:text-neutral-400 cursor-pointer">FLRACHT COMPLIANCE</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
