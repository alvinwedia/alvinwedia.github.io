import { useState } from 'react';
import { PAINT_COLORS, WHEEL_OPTIONS, INTERIOR_OPTIONS, WING_OPTIONS, IMAGES } from '../data';
import { ConfigState, PaintColor, WheelOption, InteriorOption, WingOption } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { DollarSign, Eye, ShieldAlert, BadgeCheck, Compass, Settings, Sparkles, Send } from 'lucide-react';

interface ConfiguratorProps {
  onInquireSpec: (specDetails: any) => void;
  onSavePortalGarage?: (specDetails: any) => void;
}

export default function Configurator({ onInquireSpec, onSavePortalGarage }: ConfiguratorProps) {
  const BASE_PRICE = 182900;
  
  // Local active options state
  const [paint, setPaint] = useState<PaintColor>(PAINT_COLORS[0]); // Default Shark Blue
  const [wheels, setWheels] = useState<WheelOption>(WHEEL_OPTIONS[0]);
  const [interior, setInterior] = useState<InteriorOption>(INTERIOR_OPTIONS[0]);
  const [brakes, setBrakes] = useState<'Standard' | 'PCCB'>('Standard');
  const [wing, setWing] = useState<WingOption>(WING_OPTIONS[0]);
  const [activePackage, setActivePackage] = useState<'none' | 'nurburgring' | 'flracht'>('none');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Price calculations
  const brakePrice = brakes === 'PCCB' ? 9210 : 0;
  const packagePrice = activePackage === 'nurburgring' ? 6500 : activePackage === 'flracht' ? 4200 : 0;
  const totalOptionsPrice = paint.price + wheels.price + interior.price + brakePrice + wing.price + packagePrice;
  const totalPrice = BASE_PRICE + totalOptionsPrice;

  // Custom spec definition to export
  const specDetails = {
    paint,
    wheels,
    interior,
    brakes,
    wing,
    activePackage,
    totalPrice
  };

  const handleInquire = () => {
    onInquireSpec(specDetails);
  };

  const handleSaveToGarage = () => {
    if (onSavePortalGarage) {
      onSavePortalGarage(specDetails);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const packageDetails = {
    none: { title: 'Standard Specification', desc: 'Factory direct track configuration optimized for balanced asphalt performance.' },
    nurburgring: { title: 'Nürburgring Prep Pack', desc: 'Includes raw carbon cabin fire extinguisher, steel roll cage reinforcement, and pre-fitted GPS Lap Telemetry beacons.' },
    flracht: { title: 'Flracht Academy Package', desc: 'Unlocks a VIP 3-day extreme track intensive with Porsche factory pilots and unlimited data analysis simulator slots.' }
  };

  return (
    <div className="bg-black py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="mb-12">
          <span className="font-mono text-xs text-red-500 tracking-[0.25em] block uppercase">
            // EXCLUSIVE MANUFAKTUR
          </span>
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl text-white tracking-widest uppercase mt-2">
            TAILOR SUITE
          </h1>
          <p className="text-neutral-400 text-sm mt-3 max-w-xl">
            Configure your street-legal track instrument. Built by hand in Zuffenhausen and calibrated in Flracht according to your unique racing posture.
          </p>
        </div>

        {/* Studio Setup Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Visual Car Render & Glow Backdrop */}
          <div className="lg:col-span-7 space-y-8 sticky top-28 self-start">
            
            {/* Immersive Rendering Display */}
            <div className="relative aspect-[16/10] bg-neutral-950 rounded border border-neutral-850 p-4 overflow-hidden group shadow-2xl flex flex-col justify-between">
              
              {/* Dynamic paint glow aura backdrop */}
              <div 
                className="absolute inset-0 bg-radial opacity-15 pointer-events-none transition-all duration-750" 
                style={{ 
                  background: `radial-gradient(circle, ${paint.hex}33 0%, transparent 70%)` 
                }} 
              />
              
              {/* Top Tech Stamp */}
              <div className="flex justify-between items-center z-10 font-mono text-[10px] text-zinc-500">
                <span>MODEL // 992.1 GT3 SECURE_BUILD</span>
                <span className="text-red-500 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded uppercase font-semibold">
                  {wing.id === 'touring' ? 'TOURING' : 'MOTORSPORT'}
                </span>
              </div>

              {/* Dynamic Car Side View Closeup (Reflection image scale based on paint choice) */}
              <div className="relative flex-1 flex items-center justify-center p-6 my-4 select-none z-10">
                <img
                  src={IMAGES.sideReflect}
                  alt={`${paint.name} Porsche 911 GT3 Reflective Detail`}
                  className="max-h-[220px] sm:max-h-[300px] object-contain rounded transition-all duration-500 border border-neutral-900 group-hover:scale-[1.02] filter contrast-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visualizer Floating Color Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-3 bg-black/80 backdrop-blur border border-neutral-850 px-3.5 py-2 rounded-full shadow-lg">
                  <div className="h-4 w-4 rounded-full border border-white/50" style={{ backgroundColor: paint.hex }} />
                  <span className="font-mono text-[10px] text-white tracking-widest uppercase">
                    {paint.name}
                  </span>
                </div>
              </div>

              {/* Bottom Config Quick Stats readout */}
              <div className="flex justify-between items-end border-t border-neutral-900 pt-4 z-10">
                <div className="font-mono text-[10px] text-neutral-400 space-y-0.5">
                  <div>PAINT SPEC: <span className="text-white font-semibold uppercase">{paint.type} ({paint.name})</span></div>
                  <div>BRAKES SPEC: <span className="text-white font-semibold uppercase">{brakes === 'PCCB' ? 'CERAMIC (PCCB)' : 'COMPOSITE STEEL'}</span></div>
                  <div>CABIN RIG: <span className="text-white font-semibold uppercase">{interior.name}</span></div>
                </div>
                
                <div className="font-mono text-right">
                  <span className="text-[10px] text-neutral-500 block uppercase">ESTIMATED EX-FLRACHT</span>
                  <span className="text-xl sm:text-2xl text-red-500 font-extrabold tracking-tighter">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Garage Status and Action Suite */}
            <div className="bg-neutral-950 p-6 rounded border border-neutral-850 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-sans font-bold text-sm text-white uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
                  <Sparkles className="h-4 w-4 text-red-500 animate-pulse" />
                  Telemetry Cockpit Integration
                </h4>
                <p className="text-neutral-400 text-xs leading-relaxed max-w-md">
                  Have an active Telemetry License? Save this exact specification configuration to your secure Cockpit Driver Garage profile.
                </p>
              </div>

              <div className="flex gap-3 w-full sm:w-auto shrink-0 font-mono text-xs">
                {onSavePortalGarage ? (
                  <button
                    onClick={handleSaveToGarage}
                    className="flex-1 sm:flex-initial text-center bg-zinc-900 border border-neutral-800 text-white hover:bg-neutral-800 py-3 px-5 rounded cursor-pointer font-bold uppercase transition-all flex items-center justify-center gap-1.5"
                  >
                    {savedSuccess ? (
                      <>
                        <BadgeCheck className="h-4 w-4 text-green-500" />
                        GARAGE_SAVED
                      </>
                    ) : (
                      <>
                        <Compass className="h-4 w-4 text-red-500" />
                        SAVE TO GARAGE
                      </>
                    )}
                  </button>
                ) : null}

                <button
                  onClick={handleInquire}
                  className="flex-1 sm:flex-initial text-center bg-red-600 text-white hover:bg-red-700 py-3 px-5 rounded cursor-pointer font-bold uppercase transition-all flex items-center justify-center gap-1.5 border border-red-500/20"
                >
                  <Send className="h-3.5 w-3.5" />
                  INQUIRE BUILD
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Customization Configuration Controls */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Paint Palette Selection */}
            <div className="bg-neutral-950 p-6 rounded border border-neutral-850/80 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-red-500 tracking-widest uppercase">// 01 / EXTERIOR FINISH</span>
                <span className="font-mono text-[10px] text-zinc-500 uppercase">PAINT-TO-SAMPLE AVAILABLE</span>
              </div>
              <h3 className="font-sans font-black text-lg text-white uppercase tracking-wide border-b border-neutral-900 pb-2">
                Chassis Paint Selector
              </h3>
              
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3.5 pt-2">
                {PAINT_COLORS.map((color) => {
                  const isCur = paint.id === color.id;
                  return (
                    <button
                      key={color.id}
                      onClick={() => setPaint(color)}
                      className={`relative aspect-square rounded-full flex items-center justify-center transition-all p-1.5 cursor-pointer ${
                        isCur 
                          ? 'ring-2 ring-red-500 ring-offset-2 ring-offset-black scale-105' 
                          : 'hover:scale-105 ring-1 ring-zinc-800 hover:ring-zinc-650'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={`${color.name} (${color.type} - $${color.price})`}
                    >
                      {isCur && (
                        <div className="h-2 w-2 rounded-full bg-white/90 shadow-md animate-scale-in" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Selected Paint pricing readout */}
              <div className="bg-black/40 p-3 rounded border border-neutral-900 flex justify-between items-center text-xs font-mono">
                <div>
                  <span className="text-zinc-500 block uppercase text-[9px]">TYPE / CODE</span>
                  <span className="text-white font-bold uppercase">{paint.type}: {paint.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-zinc-500 block uppercase text-[9px]">SURCHARGE</span>
                  <span className="text-white font-bold">{paint.price === 0 ? 'NO CHARGE' : `+$${paint.price.toLocaleString()}`}</span>
                </div>
              </div>
            </div>

            {/* Aerodynamics Wing style selection */}
            <div className="bg-neutral-950 p-6 rounded border border-neutral-850/80 space-y-4">
              <span className="font-mono text-xs text-red-500 tracking-widest uppercase">// 02 / PERFORMANCE AERO</span>
              <h3 className="font-sans font-black text-lg text-white uppercase tracking-wide border-b border-neutral-900 pb-2">
                Wing & Downforce Config
              </h3>
              
              <div className="space-y-3 pt-2">
                {WING_OPTIONS.map((w) => {
                  const isCur = wing.id === w.id;
                  return (
                    <button
                      key={w.id}
                      onClick={() => setWing(w)}
                      className={`w-full text-left p-4 rounded border transition-all cursor-pointer font-mono text-xs flex justify-between items-center ${
                        isCur
                          ? 'bg-neutral-900/80 border-red-500 text-white shadow'
                          : 'bg-black/25 border-neutral-900 text-zinc-400 hover:bg-neutral-900/30'
                      }`}
                    >
                      <div>
                        <div className="font-sans font-bold text-sm text-white uppercase tracking-wide">{w.name}</div>
                        <span className="text-[10px] text-zinc-500 uppercase">{w.id === 'swan_neck' ? 'Maximum downforce track weapon' : 'Sleek under-radar street posture'}</span>
                      </div>
                      <div className="font-bold underline text-red-500">
                        {w.price === 0 ? 'STD' : `+$${w.price.toLocaleString()}`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Brake calipers and setup selection */}
            <div className="bg-neutral-950 p-6 rounded border border-neutral-850/80 space-y-4">
              <span className="font-mono text-xs text-red-500 tracking-widest uppercase">// 03 / NEGATIVE ACCELERATION</span>
              <h3 className="font-sans font-black text-lg text-white uppercase tracking-wide border-b border-neutral-900 pb-2">
                Braking Technologies
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-mono text-xs">
                {/* Standard */}
                <button
                  onClick={() => setBrakes('Standard')}
                  className={`p-4 rounded border text-left transition-all cursor-pointer ${
                    brakes === 'Standard'
                      ? 'bg-neutral-900/80 border-red-500 text-white shadow'
                      : 'bg-black/25 border-neutral-900 text-zinc-400 hover:bg-neutral-900/30'
                  }`}
                >
                  <div className="font-sans font-bold text-sm text-white uppercase">Steel Composites</div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Grey Cast-Iron - Red Calipers</div>
                  <div className="text-red-500 font-bold mt-3">INCLUDED STANDARD</div>
                </button>

                {/* PCCB */}
                <button
                  onClick={() => setBrakes('PCCB')}
                  className={`p-4 rounded border text-left transition-all cursor-pointer ${
                    brakes === 'PCCB'
                      ? 'bg-neutral-900/80 border-red-500 text-white shadow'
                      : 'bg-black/25 border-neutral-900 text-zinc-400 hover:bg-neutral-900/30'
                  }`}
                >
                  <div className="font-sans font-bold text-sm text-white uppercase">PCCB Ceramic</div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Carbon-Silicon - Yellow Calipers</div>
                  <div className="text-red-500 font-bold mt-3">+$9,210 SURCHARGE</div>
                </button>
              </div>
            </div>

            {/* Driver Prep Track Packages */}
            <div className="bg-neutral-950 p-6 rounded border border-neutral-850/80 space-y-4">
              <span className="font-mono text-xs text-red-500 tracking-widest uppercase">// 04 / EXTREM RIG OPTIMIZATION</span>
              <h3 className="font-sans font-black text-lg text-white uppercase tracking-wide border-b border-neutral-900 pb-2">
                Motorsport Cabin Packs
              </h3>
              
              <div className="space-y-3 pt-2">
                {(['none', 'nurburgring', 'flracht'] as const).map((pack) => {
                  const isCur = activePackage === pack;
                  const item = packageDetails[pack];
                  const priceLabel = pack === 'none' ? 'STANDARD' : pack === 'nurburgring' ? '+$6,500' : '+$4,200';
                  return (
                    <button
                      key={pack}
                      onClick={() => setActivePackage(pack)}
                      className={`w-full text-left p-4 rounded border transition-all cursor-pointer font-mono text-xs ${
                        isCur
                          ? 'bg-neutral-900/80 border-red-500 text-white shadow'
                          : 'bg-black/25 border-neutral-900 text-zinc-400 hover:bg-neutral-900/30'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-sans font-bold text-sm text-white uppercase tracking-wide">{item.title}</span>
                        <span className="text-red-500 font-bold">{priceLabel}</span>
                      </div>
                      <p className="text-zinc-500 text-[10px] uppercase leading-relaxed font-sans">{item.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Wheel Selection Wheels */}
            <div className="bg-neutral-950 p-6 rounded border border-neutral-850/80 space-y-4">
              <span className="font-mono text-xs text-red-500 tracking-widest uppercase">// 05 / GROUND ROTATIONALS</span>
              <h3 className="font-sans font-black text-lg text-white uppercase tracking-wide border-b border-neutral-900 pb-2">
                20/21" Center-Lock Rims
              </h3>
              
              <div className="space-y-3 pt-2">
                {WHEEL_OPTIONS.map((w) => {
                  const isCur = wheels.id === w.id;
                  return (
                    <button
                      key={w.id}
                      onClick={() => setWheels(w)}
                      className={`w-full text-left p-4 rounded border transition-all cursor-pointer font-mono text-xs flex justify-between items-center ${
                        isCur
                          ? 'bg-neutral-900/80 border-red-500 text-white shadow'
                          : 'bg-black/25 border-neutral-900 text-zinc-400 hover:bg-neutral-900/30'
                      }`}
                    >
                      <div>
                        <div className="font-sans font-bold text-sm text-white uppercase tracking-wide">{w.name}</div>
                        <span className="text-[10px] text-zinc-500 uppercase">Forged alloy central nut hub</span>
                      </div>
                      <div className="font-bold text-red-500 underline">
                        {w.price === 0 ? 'STD' : `+$${w.price.toLocaleString()}`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interior Seat Layout */}
            <div className="bg-neutral-950 p-6 rounded border border-neutral-850/80 space-y-4">
              <span className="font-mono text-xs text-red-500 tracking-widest uppercase">// 06 / FLRACHT COCKPIT SUITE</span>
              <h3 className="font-sans font-black text-lg text-white uppercase tracking-wide border-b border-neutral-900 pb-2">
                Race-Tex Seat Materials
              </h3>
              
              <div className="space-y-3 pt-2">
                {INTERIOR_OPTIONS.map((int) => {
                  const isCur = interior.id === int.id;
                  return (
                    <button
                      key={int.id}
                      onClick={() => setInterior(int)}
                      className={`w-full text-left p-4 rounded border transition-all cursor-pointer font-mono text-xs flex justify-between items-center ${
                        isCur
                          ? 'bg-neutral-900/80 border-red-500 text-white shadow'
                          : 'bg-black/25 border-neutral-900 text-zinc-400 hover:bg-neutral-900/30'
                      }`}
                    >
                      <div>
                        <div className="font-sans font-bold text-sm text-white uppercase tracking-wide">{int.name}</div>
                        <span className="text-[10px] text-zinc-500 uppercase">Lightweight sports bucket seat anchors</span>
                      </div>
                      <div className="font-bold text-red-500 underline">
                        {int.price === 0 ? 'STD' : `+$${int.price.toLocaleString()}`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
