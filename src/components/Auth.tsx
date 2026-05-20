import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ShieldAlert, ChevronRight, Hash, UserCheck, HelpCircle } from 'lucide-react';
import { DriverState } from '../types';

interface AuthProps {
  onLogin: (driver: DriverState) => void;
}

export default function Auth({ onLogin }: AuthProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [flrachtId, setFlrachtId] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [licenseClass, setLicenseClass] = useState<'C' | 'B' | 'A' | 'PRO'>('B');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('PILOT CALL-SIGN / USERNAME IS REQUIRED.');
      return;
    }

    if (isRegistering) {
      if (!accessCode.trim()) {
        setError('STUTTGART INGRESS PIN CODE REQUIRED.');
        return;
      }
      // Stuttgart Ingress Validation check (accept any of: '992', 'FLRACHT', 'PORSCHE', 'GT3', '1999')
      const sanitizedPin = accessCode.trim().toUpperCase();
      if (!['992', 'FLRACHT', 'PORSCHE', 'GT3', '1999', '911', 'ADMIN'].includes(sanitizedPin)) {
        setError('INGRESS PIN REJECTED. CORRECT KEY IS "FLRACHT" OR "992".');
        return;
      }

      setLoading(true);
      setTimeout(() => {
        const generatedId = `DE-${1000 + Math.floor(Math.random() * 9000)}-GT3`;
        const newDriver: DriverState = {
          isRegistered: true,
          username: username.trim(),
          flrachtId: generatedId,
          accessCode: sanitizedPin,
          licenseClass,
          telemetry: [
            { id: '1', track: 'Nürburgring Nordschleife (DE)', date: '2026-05-18', lapTime: '06:59.92', topSpeed: 298, maxGForce: 1.62 }
          ]
        };
        
        // Save to browser simulation database
        localStorage.setItem('porsche_gt3_pilot', JSON.stringify(newDriver));
        onLogin(newDriver);
        setLoading(false);
      }, 1200);

    } else {
      // Login flow
      const savedDriverStr = localStorage.getItem('porsche_gt3_pilot');
      if (savedDriverStr) {
        const savedDriver = JSON.parse(savedDriverStr) as DriverState;
        if (savedDriver.username.toLowerCase() === username.trim().toLowerCase()) {
          setLoading(true);
          setTimeout(() => {
            onLogin(savedDriver);
            setLoading(false);
          }, 800);
          return;
        }
      }

      // Default backup bypass if no matching pilot in local storage
      setLoading(true);
      setTimeout(() => {
        const fallbackDriver: DriverState = {
          isRegistered: true,
          username: username.trim(),
          flrachtId: `DE-${3000 + Math.floor(Math.random() * 5000)}-GT3`,
          accessCode: 'FLRACHT',
          licenseClass: 'A',
          telemetry: [
            { id: '1', track: 'Nürburgring Nordschleife (DE)', date: '2026-05-18', lapTime: '06:59.92', topSpeed: 298, maxGForce: 1.62 }
          ]
        };
        localStorage.setItem('porsche_gt3_pilot', JSON.stringify(fallbackDriver));
        onLogin(fallbackDriver);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="bg-black py-24 min-h-[85vh] flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        
        {/* Visual card mimicking a telemetry license card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-neutral-950 rounded border border-neutral-850 shadow-2xl p-8 relative overflow-hidden"
        >
          {/* Accent decoration */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-neutral-500 to-red-600" />
          
          <div className="text-center space-y-2 mb-8">
            <span className="font-mono text-[9px] text-zinc-500 tracking-[0.3em] block uppercase">// STUTTGART SYSTEM INGRESS</span>
            <h2 className="font-sans font-black text-2xl text-white uppercase tracking-widest">
              {isRegistering ? 'INITIALIZE SEQUENCE' : 'COCKPIT TELEMETRY'}
            </h2>
            <p className="text-zinc-400 text-xs">
              {isRegistering 
                ? 'Register your Flracht motorsport telemetry call-sign.' 
                : 'Connect your active telemetry keycard.'}
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-5">
            
            {/* Call sign username */}
            <div className="space-y-1">
              <label className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest flex justify-between">
                <span>PILOT SIGN-ON (CALL-SIGN)</span>
                <span className="text-red-500 font-bold">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. WalterRoehrl"
                  className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 hover:border-neutral-700 py-3 px-4 rounded text-white font-mono text-xs tracking-wider transition-all uppercase"
                  required
                />
              </div>
            </div>

            {/* Verification / Security Ingress Pin */}
            {isRegistering && (
              <>
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest flex justify-between">
                    <span>STUTTGART SECTOR PIN</span>
                    <span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="password"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    placeholder="Enter PIN (e.g. FLRACHT or 992)"
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 hover:border-neutral-700 py-3 px-4 rounded text-white font-mono text-xs tracking-wider transition-all"
                    required
                  />
                  <div className="text-[10px] text-neutral-500 font-mono flex items-center gap-1 mt-1">
                    <HelpCircle className="h-3 w-3 text-red-500" />
                    <span>HINT: Stuttgart motorsport center passcode is "FLRACHT".</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                    RACING LICENSE CLASS CLASSIFICATION
                  </label>
                  <div className="grid grid-cols-4 gap-2 font-mono text-[11px] text-center pt-1.5">
                    {(['C', 'B', 'A', 'PRO'] as const).map((lvl) => {
                      const isActive = licenseClass === lvl;
                      return (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setLicenseClass(lvl)}
                          className={`py-2 rounded border font-bold transition-all cursor-pointer ${
                            isActive
                              ? 'bg-red-600 text-white border-red-500'
                              : 'bg-neutral-900 border-neutral-800 text-neutral-500 hover:text-white'
                          }`}
                        >
                          {lvl}
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-[9px] text-zinc-600 font-mono block mt-1 uppercase">
                    PRO tier maps to active Nürburgring works drivers.
                  </span>
                </div>
              </>
            )}

            {/* Error messaging bar */}
            {error && (
              <div className="p-3.5 bg-red-600/10 border border-red-600/30 text-red-500 text-xs font-mono rounded flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Main authentication trigger */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-neutral-900 border border-red-600/20 py-3.5 rounded text-white font-mono font-bold text-xs tracking-widest uppercase cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-red-600/15"
            >
              {loading ? (
                <>
                  <Hash className="h-4 w-4 animate-spin" />
                  PROBING SECURE SOCKET...
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  {isRegistering ? 'INITIALIZE TELEMETRY' : 'ENGAGE COMPANION LINK'}
                </>
              )}
            </button>

            {/* Toggle registry mode selector */}
            <div className="pt-4 border-t border-neutral-900 text-center font-mono text-[11px]">
              {isRegistering ? (
                <span className="text-zinc-500">
                  Already mapped?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegistering(false);
                      setError('');
                    }}
                    className="text-red-500 font-bold hover:underline uppercase inline-block cursor-pointer"
                  >
                    Engage Return link
                  </button>
                </span>
              ) : (
                <span className="text-zinc-500">
                  New Flracht Driver?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegistering(true);
                      setError('');
                    }}
                    className="text-red-500 font-bold hover:underline uppercase inline-block cursor-pointer"
                  >
                    Deploy New Instance
                  </button>
                </span>
              )}
            </div>

          </form>

        </motion.div>
      </div>
    </div>
  );
}
