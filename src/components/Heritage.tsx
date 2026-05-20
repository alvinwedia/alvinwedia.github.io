import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HERITAGE_MILESTONES, IMAGES } from '../data';
import { History, Award, Calendar, Layers, Shield } from 'lucide-react';

export default function Heritage() {
  const [selectedMilestone, setSelectedMilestone] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-zinc-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center gap-2.5 bg-neutral-900 border border-neutral-800 px-4 py-1.5 rounded-full">
            <History className="h-4 w-4 text-red-500 animate-spin-slow" />
            <span className="font-mono text-xs text-white tracking-[0.25em] uppercase">FORGED IN THE CRUCIBLE</span>
          </div>
          <h1 className="font-sans font-extrabold text-4xl sm:text-6xl text-white tracking-widest uppercase">
            HERITAGE ARCHIVES
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            The GT3 does not chase digital trends. For over two decades, it has remained the pure, unfiltered manifestation of motorsport engineering translated for public asphalt.
          </p>
        </div>

        {/* Large Editorial Parallax-style Banner */}
        <div className="relative h-[250px] sm:h-[450px] rounded overflow-hidden border border-neutral-800 mb-16 shadow-2xl">
          <img
            src={IMAGES.tealDawn}
            alt="Porsche Heritage Track Dawn"
            className="w-full h-full object-cover select-none filter contrast-110 brightness-75 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
          <div className="absolute bottom-6 left-6 sm:bottom-12 sm:left-12 max-w-xl space-y-2 sm:space-y-4">
            <span className="font-mono text-xs text-red-500 tracking-widest block uppercase">// THE COMMITTED MISSION</span>
            <h2 className="font-sans font-black text-2xl sm:text-4xl text-white tracking-widest uppercase leading-none">
              Purity of Speed.
            </h2>
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
              Every revolution of the crank, every gram shaved, every millisecond shaved off the green hell. We do not build to satisfy templates. We build to conquer track-authoritative targets.
            </p>
          </div>
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur border border-neutral-800 px-4 py-2 rounded font-mono text-[10px] text-zinc-400 uppercase">
            STUTTGART // SINCE 1999
          </div>
        </div>

        {/* Timeline Navigation */}
        <div className="mb-12 relative">
          {/* Horizontal Line connecting nodes */}
          <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-neutral-800 -translate-y-1/2 z-0 hidden md:block" />
          
          <div className="grid grid-cols-2 md:flex md:justify-between items-center relative z-10 gap-4">
            {HERITAGE_MILESTONES.map((milestone, idx) => {
              const isSelected = selectedMilestone === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedMilestone(idx)}
                  className={`flex flex-col items-center p-4 rounded md:bg-transparent transition-all border md:border-0 cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-900 border-red-500 scale-105 text-white'
                      : 'bg-zinc-950 border-neutral-900 text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {/* Circle Indicator on desktop */}
                  <div className={`hidden md:flex h-10 w-10 items-center justify-center rounded-full border-2 mb-3 transition-all ${
                    isSelected
                      ? 'bg-red-600 border-red-500 text-white shadow-gradient shadow-red-600/30'
                      : 'bg-zinc-950 border-neutral-800 text-zinc-600'
                  }`}>
                    <Calendar className="h-4 w-4" />
                  </div>
                  
                  <span className="font-sans font-black text-2xl tracking-tighter">{milestone.year}</span>
                  <span className="font-mono text-[10px] tracking-widest uppercase mt-1">{milestone.generation}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Milestone Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMilestone}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="bg-neutral-950 border border-neutral-850 rounded p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12"
          >
            {/* Left Content column */}
            <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 font-mono text-xs text-red-500 uppercase tracking-widest">
                  <Award className="h-4 w-4 text-red-500" />
                  MOTORSPORT LEGEND SERIES
                </div>
                
                <h3 className="font-sans font-black text-3xl sm:text-4xl text-white uppercase tracking-wider leading-tight">
                  {HERITAGE_MILESTONES[selectedMilestone].title}
                </h3>
                
                <p className="text-neutral-400 text-sm leading-relaxed font-sans">
                  {HERITAGE_MILESTONES[selectedMilestone].description}
                </p>
              </div>

              {/* Technical Specifications Matrix */}
              <div className="border-t border-neutral-900 pt-6">
                <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase block mb-4">
                  // BENCHMARK CHRONOMETRICS
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {HERITAGE_MILESTONES[selectedMilestone].specs.map((spec, idx) => (
                    <div key={idx} className="bg-zinc-900/60 p-4 rounded border border-neutral-900 text-left font-mono">
                      <div className="text-[10px] text-zinc-500 uppercase mb-1">{spec.label}</div>
                      <div className="text-white text-sm sm:text-base font-bold tracking-tight">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Graphic focus block */}
            <div className="lg:col-span-5 flex flex-col justify-center gap-6">
              <div className="relative aspect-square overflow-hidden rounded border border-neutral-850 bg-black/40 p-4 flex items-center justify-center group">
                <img
                  src={IMAGES.engineTopDown}
                  alt="Motorsport block top down view"
                  className="max-h-full max-w-full object-contain filter brightness-95 opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-neutral-950/10 pointer-events-none" />
                <div className="absolute top-2 left-2 font-mono text-[9px] text-zinc-600">
                  SYS_DRW: FLRACHT_BL_996_992
                </div>
              </div>
              <div className="bg-zinc-900/40 p-4 border border-neutral-900 rounded font-sans text-xs text-neutral-400 leading-relaxed flex gap-3">
                <Layers className="h-6 w-6 text-red-500 shrink-0" />
                <div>
                  <span className="text-white font-mono font-semibold uppercase text-[10px] tracking-wider block mb-1">Mezger to High Speed Venting</span>
                  The path from the first 996 to the active double-wishbone 992 represents a continuous search for direct physical connection between rubber and spine.
                </div>
              </div>
            </div>
            
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
