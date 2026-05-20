import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, HelpCircle, BadgeCheck, ShieldAlert, RefreshCcw } from 'lucide-react';

interface ContactProps {
  prefilledSpec: any | null;
  onClearPrefilledSpec: () => void;
}

export default function Contact({ prefilledSpec, onClearPrefilledSpec }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dealerRegion, setDealerRegion] = useState('europe');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hasTelemetryKey, setHasTelemetryKey] = useState(false);

  // If we have a prefilled build, populate message dynamically
  useEffect(() => {
    if (prefilledSpec) {
      setName('');
      let specStr = `I would like to inquire about procuring a tailored 911 GT3 (992) with the following specifications:\n`;
      specStr += `• paint: ${prefilledSpec.paint.name} (${prefilledSpec.paint.type} - $${prefilledSpec.paint.price.toLocaleString()})\n`;
      specStr += `• wheels: ${prefilledSpec.wheels.name}\n`;
      specStr += `• cabin: ${prefilledSpec.interior.name}\n`;
      specStr += `• wing CONFIG: ${prefilledSpec.wing.name}\n`;
      specStr += `• brakes: ${prefilledSpec.brakes === 'PCCB' ? 'Ceramic PCCB Upgrade' : 'Composite Steel Standard'}\n`;
      specStr += `• driver package: ${prefilledSpec.activePackage === 'nurburgring' ? 'Nürburgring Prep Pack' : prefilledSpec.activePackage === 'flracht' ? 'Flracht Academy Pack' : 'None'}\n`;
      specStr += `• Total Build Valuation: $${prefilledSpec.totalPrice.toLocaleString()}\n`;
      setMessage(specStr);
    }
  }, [prefilledSpec]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Wait for success visual then cleanup
      setTimeout(() => {
        setSuccess(false);
        setName('');
        setEmail('');
        setMessage('');
        onClearPrefilledSpec();
      }, 5000);
    }, 1500);
  };

  return (
    <div className="bg-black py-20 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Tag */}
        <div className="mb-16 text-center max-w-3xl mx-auto space-y-4">
          <span className="font-mono text-xs text-red-500 tracking-[0.25em] block uppercase">
            // STUTTGART CHANNELS
          </span>
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl text-white tracking-widest uppercase">
            INITIATE CONTACT
          </h1>
          <p className="text-zinc-400 text-sm">
            Ready to convert digital speculation into racetrack reality? Transmit your secure dossier to our specialized dealership advisors in Zuffenhausen.
          </p>
        </div>

        {/* Dual Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left panel: Inquiry Form */}
          <div className="lg:col-span-7 bg-neutral-950 p-8 rounded border border-neutral-850 shadow-2xl relative">
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-16 text-center space-y-6 flex flex-col items-center justify-center h-full min-h-[380px]"
                >
                  <div className="h-14 w-14 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <BadgeCheck className="h-8 w-8 animate-bounce" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-sans font-black text-2xl text-white uppercase tracking-wider">
                      TRANSMISSION SECURED
                    </h3>
                    <p className="text-neutral-400 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                      Your vehicle dossier has been routed to Stuttgart. An elite dealer advisor will make contact with you within 24 standard earth business hours.
                    </p>
                  </div>
                  <div className="font-mono text-[9px] text-zinc-500 uppercase p-2 border border-dashed border-neutral-900 rounded bg-black/40">
                    TRANSMIT_SIG: PORSCHE-HQ-STUTTGART_v992_OK
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                        YOUR LEGAL FULL NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Walter Röhrl"
                        className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-650 hover:border-neutral-700 py-3.5 px-4 rounded text-white font-mono text-xs tracking-wider transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                        PILOT EMAIL GATEWAY *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="walter@flracht-motorsport.de"
                        className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-650 hover:border-neutral-700 py-3.5 px-4 rounded text-white font-mono text-xs tracking-wider transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Dealer Routing */}
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                        DEALER REGION DISTRIBUTION *
                      </label>
                      <select
                        value={dealerRegion}
                        onChange={(e) => setDealerRegion(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-650 hover:border-neutral-700 py-3.5 p-4 rounded text-white font-mono text-xs tracking-wider transition-all"
                      >
                        <option value="europe">Stuttgart / Europe Factory Distribution</option>
                        <option value="north_america">Porsche Cars North America (Atlanta)</option>
                        <option value="asia_pacific">Porsche Asia Pacific Hub (Singapore)</option>
                        <option value="uk">Porsche Experience Center Silverstone</option>
                      </select>
                    </div>

                    {/* Telemetry Option */}
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                        DO YOU POSSESS A CHASSIS ALLOCATION KEY?
                      </label>
                      <div className="flex border border-neutral-800 rounded overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setHasTelemetryKey(true)}
                          className={`flex-1 py-3.5 font-mono text-xs font-bold uppercase transition-all ${
                            hasTelemetryKey 
                              ? 'bg-neutral-900 text-white border-r border-neutral-850' 
                              : 'bg-black/60 text-zinc-500 border-r border-neutral-900 hover:text-white'
                          }`}
                        >
                          YES
                        </button>
                        <button
                          type="button"
                          onClick={() => setHasTelemetryKey(false)}
                          className={`flex-1 py-3.5 font-mono text-xs font-bold uppercase transition-all ${
                            !hasTelemetryKey 
                              ? 'bg-neutral-900 text-white' 
                              : 'bg-black/60 text-zinc-500 hover:text-white'
                          }`}
                        >
                          NO (WAITLIST)
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Message dossier details */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest flex justify-between">
                      <span>DOSSIER MESSAGE / PREEMPTIVE REQUESTS</span>
                      {prefilledSpec && <span className="text-red-500 font-bold font-mono">SPEC LOADED VIA TAILOR SUITE</span>}
                    </label>
                    <textarea
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Detail any bespoke configuration requests or current lease trades."
                      className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-655 hover:border-neutral-700 py-3.5 px-4 rounded text-white font-mono text-xs tracking-wider transition-all"
                    />
                  </div>

                  {/* Trigger Transmission submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-neutral-900 text-white py-4 rounded text-xs font-mono font-bold tracking-widest uppercase cursor-pointer transition-all flex items-center justify-center gap-2 border border-red-500/10 shadow-lg shadow-red-600/10 hover:shadow-red-600/30"
                  >
                    {loading ? (
                      <>
                        <RefreshCcw className="h-4 w-4 animate-spin" />
                        Transmitting secure dossier...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        ENGAGE STUTTGART DOSSIER WIRE
                      </>
                    )}
                  </button>
                  
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right panel: Stuttgart Headquarters metadata card */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Prefilled Spec Invoice Visualizer sidebar */}
            {prefilledSpec && (
              <div className="bg-neutral-950 p-6 rounded border border-red-500/25 relative overflow-hidden space-y-4">
                <div className="absolute top-0 right-0 p-3 font-mono text-[9px] text-red-500 uppercase bg-red-500/10 border-l border-b border-red-500/30 font-bold">
                  Active Build Loaded
                </div>
                
                <h4 className="font-sans font-extrabold text-sm text-white uppercase tracking-wider">
                  Active Spec Snapshot
                </h4>

                <div className="space-y-2 border-b border-neutral-900 pb-4 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Paint Finish:</span>
                    <span className="text-white text-right font-semibold">{prefilledSpec.paint.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Center-Lock Rims:</span>
                    <span className="text-white text-right font-semibold truncate max-w-44">{prefilledSpec.wheels.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Motorsport Wing:</span>
                    <span className="text-white text-right font-semibold">{prefilledSpec.wing.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Ceramic PCCB Upgrade:</span>
                    <span className="text-white font-semibold">{prefilledSpec.brakes === 'PCCB' ? 'Yes (Satin Yellow)' : 'Standard Steel'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Motorsport Cabin Pack:</span>
                    <span className="text-white uppercase font-semibold">{prefilledSpec.activePackage === 'nurburgring' ? 'Nürburgring Prep' : prefilledSpec.activePackage === 'flracht' ? 'Flracht Academy' : 'Standard'}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center font-mono pt-2">
                  <span className="text-xs text-neutral-400">VALUATION EX-FLRACHT:</span>
                  <span className="text-lg text-white font-black">${prefilledSpec.totalPrice.toLocaleString()}</span>
                </div>

                <button
                  onClick={onClearPrefilledSpec}
                  className="w-full text-center text-[10px] font-mono text-neutral-500 hover:text-red-500 uppercase transition-all mt-2 cursor-pointer border border-dashed border-neutral-900 hover:border-red-500/20 py-2 rounded"
                >
                  DE-LINK ACTIVE BUILD SPEC
                </button>
              </div>
            )}

            {/* Headquarters details Card */}
            <div className="bg-neutral-950 p-6 rounded border border-neutral-850/80 space-y-6">
              <span className="font-mono text-xs text-red-500 tracking-widest block uppercase">// CORPORATE ROOT DIRECTORY</span>
              
              <div className="space-y-4">
                <h4 className="font-sans font-bold text-lg text-white uppercase tracking-wider">
                  Porsche AG Headquarters
                </h4>
                
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-sans">
                  Porscheplatz 1, Zuffenhausen <br />
                  70435 Stuttgart, Germany <br />
                  Stuttgart Factory Division Office No. 911
                </p>
              </div>

              {/* Quick technical metrics links */}
              <div className="space-y-4 pt-4 border-t border-neutral-900 text-xs font-mono">
                <div className="flex items-center gap-3 text-zinc-400">
                  <MapPin className="h-4 w-4 text-red-500 shrink-0" />
                  <span>GPS COORDS: 48.8354° N, 9.1517° E</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-400">
                  <Phone className="h-4 w-4 text-red-500 shrink-0" />
                  <span>TEL CON_LINE: +49 (0) 711 911-0</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-400">
                  <Mail className="h-4 w-4 text-red-500 shrink-0" />
                  <span>GATE SMTP: flracht-specialist@porsche.de</span>
                </div>
              </div>
            </div>

            {/* Waitlist disclaimer message */}
            <div className="p-4 bg-zinc-900 border border-neutral-850/80 rounded font-sans text-xs text-zinc-500 leading-relaxed flex gap-3">
              <ShieldAlert className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-zinc-400 font-mono text-[9px] uppercase font-bold block mb-1">ALLOCATION SCRUTINY NOTICE</span>
                Due to legendary Nürburgring performance records, demand for the 992 GT3 remains extremely high. Handing over allocation credentials is at the sole discretion of regional distribution center managers.
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
