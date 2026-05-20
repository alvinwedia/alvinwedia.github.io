import { PORSCHE_CREST } from '../data';
import { Menu, X, ShieldCheck, Anchor, Sliders, Calendar, BookOpen, KeySquare } from 'lucide-react';
import { DriverState } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  driverState: DriverState;
  onLogout: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  driverState,
  onLogout,
  isMenuOpen,
  setIsMenuOpen,
}: HeaderProps) {
  const navItems = [
    { id: 'home', label: 'BORN IN FLRACHT', icon: Anchor },
    { id: 'heritage', label: 'HERITAGE ARCHIVES', icon: BookOpen },
    { id: 'tailor', label: 'TAILOR SUITE', icon: Sliders },
    { id: 'portal', label: driverState.isRegistered ? `DRIVER: ${driverState.username.toUpperCase()}` : 'DRIVER PORTAL', icon: ShieldCheck, highlight: driverState.isRegistered },
    { id: 'contact', label: 'INITIATE CONTACT', icon: Calendar },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo & Branding */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="h-12 w-10 flex items-center justify-center bg-zinc-950 p-1.5 rounded border border-neutral-800">
              <img
                src={PORSCHE_CREST}
                alt="Porsche Crest"
                className="h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs text-neutral-400 tracking-[0.25em]">PORSCHE</span>
              <span className="font-sans font-bold text-lg text-white tracking-[0.15em] -mt-1 flex items-center gap-1.5">
                911 GT3 <span className="text-[10px] bg-red-600/20 text-red-500 font-mono font-semibold px-1 rounded border border-red-500/30">992</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-mono tracking-widest transition-all duration-300 ${
                    isActive
                      ? 'bg-neutral-900 border border-neutral-800 text-white shadow-lg'
                      : item.highlight
                      ? 'text-red-500 hover:bg-neutral-950/80 border border-red-500/20 bg-red-500/5'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-950/80 border border-transparent'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-red-500' : 'text-neutral-500'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Authentication Status Quick Badge */}
          <div className="hidden sm:flex items-center gap-3">
            {driverState.isRegistered ? (
              <div className="flex items-center gap-3 bg-neutral-950 px-3.5 py-1.5 rounded border border-neutral-800 font-mono text-[10px]">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-zinc-400 uppercase">SYS_OK: {driverState.flrachtId}</span>
                <span className="text-neutral-600">|</span>
                <button
                  onClick={onLogout}
                  className="text-red-500 hover:text-red-400 font-bold uppercase cursor-pointer"
                >
                  HALT
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveTab('portal')}
                className="flex items-center gap-1.5 font-mono text-[10px] text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-500 bg-neutral-950 px-3.5 py-1.5 rounded transition-all cursor-pointer"
              >
                <KeySquare className="h-3 w-3 text-red-500" />
                CONNECT TELEMETRY
              </button>
            )}
          </div>

          {/* Mobile Menu Action */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white hover:bg-neutral-950 rounded border border-zinc-850"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {isMenuOpen && (
        <div className="lg:hidden bg-black/95 border-b border-neutral-800 px-4 py-6 space-y-3 font-mono">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMenuOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-4 py-3 rounded text-left text-xs tracking-wider transition-all ${
                  isActive
                    ? 'bg-neutral-900 border border-neutral-800 text-white'
                    : item.highlight
                    ? 'text-red-500 bg-red-500/5 border border-red-500/20'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-950'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
          <div className="pt-4 border-t border-neutral-850">
            {driverState.isRegistered ? (
              <div className="flex flex-col gap-2 bg-neutral-950 p-4 rounded border border-neutral-800">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-neutral-400">STATUS</span>
                  <span className="text-green-500 font-bold">SECURE RESPONSE</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-neutral-400">COCKPIT ID</span>
                  <span className="text-white font-semibold">{driverState.flrachtId}</span>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                  className="mt-2 w-full text-center bg-red-600/10 border border-red-600/30 text-red-500 py-2 rounded text-xs hover:bg-red-600/20 transition-all font-semibold uppercase"
                >
                  DE-INITIALIZE COCKPIT
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setActiveTab('portal');
                  setIsMenuOpen(false);
                }}
                className="flex w-full items-center justify-center gap-2 py-3 bg-neutral-950 border border-red-600/20 rounded text-center text-red-500 text-xs hover:bg-red-500/5 transition-all"
              >
                <KeySquare className="h-4 w-4" />
                INITIALIZE COCKPIT TELEMETRY
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
