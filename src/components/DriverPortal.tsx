import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DriverState, TelemetryLog } from '../types';
import { IMAGES, INITIAL_TELEMETRY } from '../data';
import { Award, Compass, Gauge, History, Trash2, Milestone, Calendar, Zap, RefreshCcw } from 'lucide-react';

interface DriverPortalProps {
  driverState: DriverState;
  onLogout: () => void;
  savedSpecList: any[];
  onRemoveSpec: (idx: number) => void;
  onNavigateToTailor: () => void;
}

export default function DriverPortal({
  driverState,
  onLogout,
  savedSpecList,
  onRemoveSpec,
  onNavigateToTailor,
}: DriverPortalProps) {
  const [telemetryLogs, setTelemetryLogs] = useState<TelemetryLog[]>(() => {
    // Merge base telemetry with active session ones 
    return [...INITIAL_TELEMETRY];
  });

  const [activeTab, setActiveTab] = useState<'garage' | 'telemetry' | 'academy'>('garage');

  // Track state of simulated academy items
  const [academyItems, setAcademyItems] = useState([
    { id: '1', task: 'Calibrate Double-Wishbone Chamber', status: 'Completed', ref: 'FLR-PASM' },
    { id: '2', task: 'Hone 9,000 RPM Manual Upshift Rhythm', status: 'In Progress', ref: 'FLR-ENG-40' },
    { id: '3', task: 'Adjust front spoiler diffuser to track force 3', status: 'Pending', ref: 'FLR-AERO-992' },
    { id: '4', task: 'Complete Spa-Francorchamps wet weather calibration', status: 'Pending', ref: 'FLR-TLM-WET' }
  ]);

  const toggleAcademyItem = (id: string) => {
    setAcademyItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === 'Completed' ? 'Pending' : item.status === 'In Progress' ? 'Completed' : 'In Progress';
        return { ...item, status: nextStatus };
      }
      return item;
    }));
  };

  // Generate a random simulated diagnostic code log
  const [simulationSpeed, setSimulationSpeed] = useState<number>(0);
  const [activeSpark, setActiveSpark] = useState(false);

  const simulateEngineSpark = () => {
    setActiveSpark(true);
    let speed = 0;
    const interval = setInterval(() => {
      speed += 12;
      setSimulationSpeed(speed);
      if (speed >= 9000) {
        clearInterval(interval);
        setTimeout(() => {
          setSimulationSpeed(0);
          setActiveSpark(false);
        }, 1000);
      }
    }, 12);
  };

  return (
    <div className="bg-zinc-950 py-20 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Profile Driver ID card header layout */}
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded shadow-2xl relative overflow-hidden mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-red-600/5 skew-x-12 z-0 pointer-events-none" />
          
          <div className="flex items-center gap-6 z-10">
            {/* Holographic glowing crest frame */}
            <div className="h-16 w-16 bg-black p-2.5 rounded border-2 border-red-500/40 flex items-center justify-center shadow-lg shadow-red-600/10">
              <Compass className="h-full w-full text-red-500 animate-pulse" />
            </div>
            
            <div className="space-y-1">
              <span className="font-mono text-[9px] text-zinc-500 tracking-widest block font-bold uppercase">// FLRACHT MOTORSPORT DECK</span>
              <h1 className="font-sans font-black text-2xl sm:text-3xl text-white uppercase tracking-wider">
                PILOT: {driverState.username}
              </h1>
              <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] text-zinc-400">
                <span className="bg-black border border-neutral-800 px-2 py-0.5 rounded text-white font-bold">
                  LICENSE CLASS: {driverState.licenseClass}
                </span>
                <span>•</span>
                <span>ID: {driverState.flrachtId}</span>
                <span>•</span>
                <span className="text-green-500">SYS_ONLINE // WEBSOCK_OK</span>
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="font-mono text-[11px] text-red-500 hover:text-white border border-red-500/20 hover:bg-red-600/10 px-5 py-2 rounded z-10 transition-all uppercase cursor-pointer shrink-0 font-bold tracking-widest"
          >
            De-authenticate Pilot
          </button>
        </div>

        {/* Triple tab layouts navigation */}
        <div className="flex border-b border-neutral-800 mb-8 font-mono text-xs overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('garage')}
            className={`py-3.5 px-6 border-b-2 tracking-widest uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'garage'
                ? 'border-red-500 text-white font-bold bg-neutral-900/40'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Milestone className="h-3.5 w-3.5" />
            My Tailored Garage ({savedSpecList.length})
          </button>
          
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`py-3.5 px-6 border-b-2 tracking-widest uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'telemetry'
                ? 'border-red-500 text-white font-bold bg-neutral-900/40'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Gauge className="h-3.5 w-3.5" />
            Active Lap Telemetry
          </button>

          <button
            onClick={() => setActiveTab('academy')}
            className={`py-3.5 px-6 border-b-2 tracking-widest uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === 'academy'
                ? 'border-red-500 text-white font-bold bg-neutral-900/40'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Award className="h-3.5 w-3.5" />
            Flracht Academy Modules
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            
            {/* TAB: GARAGE */}
            {activeTab === 'garage' && (
              <div className="space-y-6">
                
                {savedSpecList.length === 0 ? (
                  <div className="bg-neutral-950 p-12 rounded border border-neutral-850 text-center space-y-4">
                    <History className="h-12 w-12 text-zinc-600 mx-auto" />
                    <h3 className="font-sans font-bold text-lg text-white uppercase tracking-wider">
                      My Garage is currently empty
                    </h3>
                    <p className="text-zinc-500 text-sm max-w-sm mx-auto leading-relaxed">
                      You haven't locked in any tailored configurations yet. Hop into the Tailor Suite to configure and persistent-save your ultimate 911 GT3 setup!
                    </p>
                    <button
                      onClick={onNavigateToTailor}
                      className="px-6 py-3 bg-red-600 hover:bg-red-700 font-mono text-xs text-white uppercase font-black tracking-widest rounded transition-all cursor-pointer inline-block"
                    >
                      Initialize Configurator Suite
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {savedSpecList.map((spec, idx) => (
                      <div
                        key={idx}
                        className="bg-neutral-900 border border-neutral-800 rounded p-6 shadow-xl relative overflow-hidden group flex flex-col justify-between"
                      >
                        <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-red-500">
                          BUILD_INDEX_#{idx + 1}
                        </div>

                        {/* Top build description */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <span
                              className="h-4.5 w-4.5 rounded-full border border-white"
                              style={{ backgroundColor: spec.paint.hex }}
                            />
                            <div className="font-sans">
                              <h4 className="font-sans font-black text-lg text-white uppercase tracking-tight">
                                {spec.paint.name} Spec
                              </h4>
                              <p className="text-[10px] text-zinc-500 font-mono uppercase">
                                PAINT: {spec.paint.type} | WING: {spec.wing.id === 'touring' ? 'TOURING (WINGLESS)' : 'ACTIVE HIGH GOOSENECK'}
                              </p>
                            </div>
                          </div>

                          {/* Technical summary table layout */}
                          <div className="space-y-2 border-t border-b border-neutral-950 py-4 font-mono text-xs">
                            <div className="flex justify-between">
                              <span className="text-neutral-500 uppercase">Center-Lock Hubs</span>
                              <span className="text-zinc-300 uppercase truncate max-w-56" title={spec.wheels.name}>{spec.wheels.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-neutral-500 uppercase">Carbon Buckets</span>
                              <span className="text-zinc-300 uppercase truncate max-w-56" title={spec.interior.name}>{spec.interior.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-neutral-500 uppercase">Active Calipers</span>
                              <span className="text-zinc-300 uppercase">{spec.brakes === 'PCCB' ? 'PCCB CERAMIC (YELLOW)' : 'STEEL COMPOSITES (RED)'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-neutral-500 uppercase">Cabin Package</span>
                              <span className="text-red-500 font-bold uppercase">{spec.activePackage === 'nurburgring' ? 'Nürburgring Prep' : spec.activePackage === 'flracht' ? 'Flracht Academy' : 'Standard'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Footer details pricing & actions */}
                        <div className="flex justify-between items-center pt-4 mt-6">
                          <div>
                            <span className="font-mono text-[9px] text-neutral-500 uppercase block">BUILD SURCHARGE INCLUDED</span>
                            <span className="font-sans font-bold text-xl text-white tracking-widest">
                              ${spec.totalPrice.toLocaleString()}
                            </span>
                          </div>

                          <button
                            onClick={() => onRemoveSpec(idx)}
                            className="bg-red-600/10 hover:bg-red-600/30 border border-red-500/20 text-red-500 py-2.5 px-3 rounded flex items-center gap-1.5 transition-all text-xs font-mono select-none cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                            DE-ACTIVATE
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}

            {/* TAB: ACTIVE LAP TELEMETRY */}
            {activeTab === 'telemetry' && (
              <div className="space-y-8">
                
                {/* Simulated live tachometer probe */}
                <div className="bg-neutral-900 border border-neutral-800 p-8 rounded shadow-xl grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative overflow-hidden">
                  <div className="space-y-4">
                    <span className="font-mono text-xs text-red-500 tracking-widest block uppercase">// LIVE DIAGNOSTIC EMULATION</span>
                    <h3 className="font-sans font-black text-xl text-white uppercase tracking-wider">
                      Atmospheric Boxer Redline Thrash
                    </h3>
                    <p className="text-neutral-400 text-xs leading-relaxed font-sans">
                      Excite the physical pistons to peak resonance. Trigger the telemetry diagnostic simulation to accelerate the custom 4.0L flat-six crank to its legendary 9,000 RPM threshold.
                    </p>
                    
                    <button
                      onClick={simulateEngineSpark}
                      disabled={activeSpark}
                      className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-neutral-800 font-mono text-xs text-white uppercase font-bold tracking-widest rounded transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Zap className="h-4 w-4" />
                      {activeSpark ? 'PISTONS RESECTING...' : 'SPARK COMBUST CRANK'}
                    </button>
                  </div>

                  {/* Centered Speed ticker */}
                  <div className="flex flex-col items-center justify-center p-6 bg-zinc-950 border border-neutral-850 rounded text-center relative overflow-hidden min-h-[160px]">
                    <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
                      <Gauge className="h-32 w-32 text-white" />
                    </div>
                    
                    <span className="font-mono text-[9px] text-neutral-500 tracking-widest block uppercase mb-1">PROBED ROTATIONAL FREQ</span>
                    <span className="font-sans font-black text-4xl text-white tracking-widest font-mono">
                      {simulationSpeed.toLocaleString()}
                    </span>
                    <span className="font-mono text-xs text-red-500 font-bold mt-1 tracking-widest">RPM</span>

                    <div className="w-full bg-neutral-900 h-1.5 rounded-full mt-4 overflow-hidden border border-neutral-850">
                      <div 
                        className={`h-full transition-all duration-75 ${simulationSpeed > 8400 ? 'bg-red-600 animate-pulse' : 'bg-green-500'}`} 
                        style={{ width: `${(simulationSpeed / 9000) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Right: Technical diagnostics readout */}
                  <div className="bg-black p-4 rounded border border-neutral-850 font-mono text-[11px] text-zinc-400 space-y-2">
                    <span className="text-neutral-500 block text-[9px] tracking-widest uppercase">// CRITICAL SYSTEMS MAP</span>
                    <div className="flex justify-between border-b border-neutral-900 pb-1.5 text-[10px]">
                      <span>VALVE THROTTLE NO 1-6</span>
                      <span className="text-green-500 font-bold">100% SECURE RESPONSE</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-900 pb-1.5 text-[10px]">
                      <span>OIL VENT DRY SAPPHIRE</span>
                      <span className="text-green-500 font-bold">CALIBRATED</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-900 pb-1.5 text-[10px]">
                      <span>CHASSIS RESIDUAL LOAD</span>
                      <span className="text-white font-bold">{activeSpark ? 'DYNAMIC WING ACTIVE' : 'STEADY ROADWAY'}</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span>EXHAUST EXHAUST GATE</span>
                      <span className={`${activeSpark ? 'text-red-500 animate-pulse' : 'text-zinc-500'}`}>{activeSpark ? '98.5 dB EXCEEDED' : 'QUIET VALVE'}</span>
                    </div>
                  </div>
                </div>

                {/* Telemetry Log records */}
                <div className="bg-neutral-900 border border-neutral-800 rounded shadow-xl overflow-hidden">
                  <div className="p-6 border-b border-neutral-850 bg-black flex justify-between items-center">
                    <span className="font-mono text-xs text-zinc-400 tracking-wider">HISTORIC CHRONOMETRIC TIMELINE</span>
                    <div className="font-mono text-[10px] text-red-500 uppercase bg-red-600/10 border border-red-600/20 px-2 py-0.5 rounded font-bold">Verified by Stuttgart Telemetry</div>
                  </div>

                  <div className="divide-y divide-neutral-950 font-mono text-xs">
                    {telemetryLogs.map((log) => (
                      <div key={log.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-neutral-950/20 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 shrink-0 bg-zinc-950 border border-neutral-800 rounded-full flex items-center justify-center text-red-500 font-bold">
                            #{log.id}
                          </div>
                          <div className="space-y-1">
                            <span className="text-white font-sans text-sm font-bold block uppercase">{log.track}</span>
                            <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              VERIFIED STAMPED: {log.date}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6 text-right md:text-left min-w-80">
                          <div>
                            <span className="text-neutral-500 text-[10px] block">LAP TIME</span>
                            <span className="text-white text-sm font-black tracking-widest">{log.lapTime}</span>
                          </div>
                          <div>
                            <span className="text-neutral-500 text-[10px] block">TOP SPEED</span>
                            <span className="text-white text-sm font-bold">{log.topSpeed} KM/H</span>
                          </div>
                          <div>
                            <span className="text-neutral-500 text-[10px] block font-semibold">MAX G-FORCE</span>
                            <span className="text-red-500 text-sm font-black">{log.maxGForce} G-LOAD</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB: ACADEMY PROGRESS MODULES */}
            {activeTab === 'academy' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8All font-sans">
                
                {/* Left checklist Column */}
                <div className="bg-neutral-900 border border-neutral-800 p-8 rounded shadow-xl space-y-6">
                  <div className="space-y-1.5">
                    <span className="font-mono text-xs text-red-500 tracking-widest block uppercase">// ACADEMY FLRACHT TASKING</span>
                    <h3 className="font-sans font-black text-xl text-white uppercase tracking-wider">
                      Pilot Competency Modules
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed max-w-lg">
                      Track-day alignment requires intimate mechanical mastery of the 911 GT3 platform. Complete these checklist operations inside your personal test days to advance licensing ranking.
                    </p>
                  </div>

                  <div className="space-y-3 font-mono text-xs pt-4">
                    {academyItems.map((item) => {
                      const isComp = item.status === 'Completed';
                      const isProg = item.status === 'In Progress';
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleAcademyItem(item.id)}
                          className={`p-4 rounded border cursor-pointer transition-all flex items-center justify-between ${
                            isComp
                              ? 'bg-neutral-950/80 border-green-500/30 text-zinc-400'
                              : isProg
                              ? 'bg-red-600/5 border-red-500/20 text-white shadow'
                              : 'bg-black/20 border-neutral-900 text-neutral-500'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={isComp}
                              onChange={() => {}} // Swallowed, handled by onClick on container
                              className="accent-red-500 pointer-events-none"
                            />
                            <div>
                              <span className={`text-[13px] block ${isComp ? 'line-through text-neutral-500' : 'text-zinc-200'}`}>{item.task}</span>
                              <span className="text-[9px] text-zinc-500">REF PROTOCOL: {item.ref}</span>
                            </div>
                          </div>

                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            isComp
                              ? 'bg-green-500/15 text-green-500 border border-green-500/20'
                              : isProg
                              ? 'bg-red-500/20 text-red-500 border border-red-500/30 animate-pulse'
                              : 'bg-zinc-800 text-zinc-500 border border-transparent'
                          }`}>
                            {item.status.toUpperCase()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Immersive Motorsports Academy info graphic */}
                <div className="bg-neutral-900 border border-neutral-800 rounded shadow-xl overflow-hidden flex flex-col justify-between">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={IMAGES.trackOrange}
                      alt="Porsche racing academy track layout"
                      className="w-full h-full object-cover filter contrast-125 brightness-90 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 font-mono text-[10px] text-red-500 bg-black/60 px-3.5 py-1.5 rounded border border-neutral-850">
                      TRACK LOCATION: LEIPZIG TRAINING COMPLEX (DE)
                    </div>
                  </div>

                  <div className="p-8 space-y-4">
                    <h4 className="font-sans font-black text-lg text-white uppercase tracking-wide">
                      Next Elite Pilot Summit
                    </h4>
                    
                    <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                      As a Pilot holding rank <span className="text-white font-bold">{driverState.licenseClass}</span>, your next factory event occurs on June 15th, 2026. This intensive covers downforce optimization during Spa-Francorchamps high load apexes.
                    </p>

                    <div className="bg-black p-4 rounded border border-neutral-850 flex justify-between items-center text-xs font-mono">
                      <div>
                        <span className="text-neutral-500 block text-[9px] uppercase">RACE COACH</span>
                        <span className="text-white font-bold">JÖRG BERGMEISTER</span>
                      </div>
                      <div className="text-right">
                        <span className="text-neutral-500 block text-[9px] uppercase">HOT LAP GOAL</span>
                        <span className="text-red-500 font-bold">UNDER 7 MINUTES</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
