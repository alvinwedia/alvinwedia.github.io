import { IMAGES } from '../data';
import { motion } from 'motion/react';
import { Gauge, Zap, Wind, Anchor } from 'lucide-react';

interface HeroProps {
  onExplore: (tab: string) => void;
}

export default function Hero({ onExplore }: HeroProps) {
  const stats = [
    { label: 'NATURALLY ASPIRATED', value: '4.0 LITERS', unit: 'BOXER-6', icon: Gauge },
    { label: 'PEAK RPM LIMIT', value: '9,000', unit: 'RPM SCREAM', icon: Zap },
    { label: 'OUTPUT PERFORMANCE', value: '502', unit: 'HORSEPOWER', icon: Anchor },
    { label: 'MOTORSPORT DOWNFORCE', value: '385%', unit: 'VS 991.2', icon: Wind }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 60, damping: 20 },
    },
  };

  return (
    <div className="relative bg-black min-h-[95vh] flex flex-col justify-end overflow-hidden pb-12">
      {/* Background Cinematic Artwork with Radial Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.hero}
          alt="Porsche 911 GT3 Silhouette"
          className="w-full h-full object-cover object-center scale-105 select-none filter brightness-90 animate-subtle-zoom"
          referrerPolicy="no-referrer"
        />
        {/* Gradients to merge image flawlessly into the luxury dark canvas */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 md:pt-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Top Stamp Label */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5">
            <span className="h-[2px] w-8 bg-red-600" />
            <span className="font-mono text-xs sm:text-sm text-red-500 font-semibold tracking-[0.35em] uppercase">
              BORN IN FLRACHT
            </span>
          </motion.div>

          {/* Majestic Heading */}
          <motion.div variants={itemVariants} className="space-y-1">
            <h1 className="font-sans font-extrabold text-5xl sm:text-7xl lg:text-8xl text-white tracking-tighter leading-none">
              SHAPED BY THE <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-500">
                WIND TUNNEL.
              </span>
            </h1>
            <p className="max-w-2xl text-neutral-300 text-sm sm:text-base leading-relaxed font-sans font-light">
              The 911 GT3 is not built for the garage. It is built in the crucible of Flracht motorsport. 
              The swan-neck rear wing, lightweight carbon composite body, and active rear-axle steering 
              merge into a track-authoritative instrument of absolute velocity.
            </p>
          </motion.div>

          {/* Staggered Quick Actions */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => onExplore('tailor')}
              className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-mono text-xs tracking-widest font-bold uppercase rounded shadow-lg shadow-red-600/10 cursor-pointer hover:shadow-red-600/35 transition-all duration-300 border border-red-500/20"
            >
              TAILOR YOUR SPEC
            </button>
            <button
              onClick={() => {
                const engineeringSec = document.getElementById('engineering-section');
                if (engineeringSec) {
                  engineeringSec.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs tracking-widest uppercase rounded border border-neutral-800 hover:border-neutral-700 cursor-pointer transition-all duration-300"
            >
              ENGINEERING SPECS ↓
            </button>
          </motion.div>

          {/* Staggered Stat Strip widget */}
          <motion.div 
            variants={itemVariants} 
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-neutral-950/80 backdrop-blur-md rounded border border-neutral-800/80 mt-12 divide-y divide-neutral-900 lg:divide-y-0 lg:divide-x"
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className={`pt-4 lg:pt-0 lg:px-6 ${idx === 0 ? 'pt-0 lg:pl-0' : ''}`}>
                  <div className="flex items-center gap-2 text-neutral-500 mb-1">
                    <Icon className="h-3.5 w-3.5 text-red-500" />
                    <span className="font-mono text-[10px] tracking-widest uppercase">{stat.label}</span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                      {stat.value}
                    </span>
                    <span className="font-mono text-xs text-neutral-400">
                      {stat.unit}
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
