import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IMAGES, REFRESH_RATE_DATA, AERO_DATA } from '../data';
import { Cpu, Wind, ShieldCheck, ChevronRight, HelpCircle } from 'lucide-react';

export default function Engineering() {
  const [activeCurveTab, setActiveCurveTab] = useState<'power' | 'aero'>('power');
  const [hoveredData, setHoveredData] = useState<any | null>(null);
  const [activeFeatureTab, setActiveFeatureTab] = useState<'engine' | 'aerodynamics' | 'chassis'>('engine');

  // Interactive specifications list
  const features = {
    engine: {
      title: 'MASTERING THE NATURALLY ASPIRATED RIGOR',
      description: 'Ditching turbos directly for sensory adrenaline. The 4.0-liter six-cylinder boxer engine is designed in parallel with the GT3 Cup racer. Featuring six individual throttle valves, carbon cylinder liners, and central oil supply, this pure atmospheric unit responds to the right foot with lightning precision up to 9,000 RPM.',
      image: IMAGES.engineCover,
      specs: [
        { label: 'Displacement', value: '3,996 cc' },
        { label: 'Aspiration', value: 'Naturally Aspirated Flat-6' },
        { label: 'Peak Power', value: '502 HP @ 8,400 RPM' },
        { label: 'Max Torque', value: '346 lb-ft @ 6,100 RPM' },
        { label: 'Power-to-Weight', value: '2.85 kg / hp' }
      ]
    },
    aerodynamics: {
      title: 'THE SCIENCE OF DYNAMIC RE-DIRECTION',
      description: 'The swan-neck wing suspension ensures that air flows cleanly underneath the wing, where it does the most work to generate negative lift. Combined with front diffuser venting and underbody paneling, the 992 GT3 generates a massive 50% more downforce than its predecessor in standard mode, and up to 150% more in performance track mode.',
      image: IMAGES.wingDetail,
      specs: [
        { label: 'Wing Style', value: 'Fixed Gooseneck / Swan-neck' },
        { label: 'Front Splitter', value: '4-Stage Adjustable Diffuser' },
        { label: 'Downforce at 200 km/h', value: '144 kg (Standard Track)' },
        { label: 'Downforce at 300 km/h', value: '385 kg (Performance Race)' },
        { label: 'Drag Coefficient (Cd)', value: '0.34' }
      ]
    },
    chassis: {
      title: 'THE DOUBLE WISHBONE front REVOLUTION',
      description: 'For the first time in a production 911 street car, the front axle is engineered with a double-wishbone design directly inherited from the Le Mans-winning 911 RSR. This guarantees unprecedented stability during high corner load, minimizes camber fluctuations, and delivers telepathic feedback straight to the hands of the driver.',
      image: IMAGES.suspension,
      specs: [
        { label: 'Front Suspension', value: 'Double Wishbone (Rose Joints)' },
        { label: 'Rear Suspension', value: 'Multi-link with Active Steering' },
        { label: 'Damping Control', value: 'PASM (Chassis lowered 30mm)' },
        { label: 'Braking options', value: 'Standard steel or PCCB Ceramic' },
        { label: 'Tires', value: 'Michelin Pilot Sport Cup 2 R' }
      ]
    }
  };

  // Find max values to scale SVG chart perfectly
  const maxHp = 502;
  const maxTorque = 470;
  const maxEngineSpeed = 9000;
  const minEngineSpeed = 3000;

  const maxSpeed = 300;
  const maxForce = 680;

  return (
    <section id="engineering-section" className="bg-black py-24 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <span className="font-mono text-xs text-red-500 tracking-[0.25em] block uppercase">
              // MOTORENWERK FLRACHT
            </span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-5xl text-white tracking-widest uppercase">
              PRECISION ENGINEERING
            </h2>
            <p className="max-w-2xl text-neutral-400 text-sm leading-relaxed">
              Every detail is honed on the Nürburgring Nordschleife. Track telemetry is visualized in the charts below, showing exact motor response curves and downforce optimization parameters.
            </p>
          </div>
          
          {/* Engineering Mode Selector Tabs */}
          <div className="flex bg-neutral-950 p-1 rounded border border-neutral-800 self-start md:self-end">
            <button
              onClick={() => setActiveCurveTab('power')}
              className={`flex items-center gap-2 px-5 py-2.5 font-mono text-[10px] sm:text-xs tracking-wider uppercase transition-all rounded ${
                activeCurveTab === 'power'
                  ? 'bg-neutral-900 border border-neutral-800 text-white shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Cpu className="h-3.5 w-3.5" />
              Engine Response Curve
            </button>
            <button
              onClick={() => setActiveCurveTab('aero')}
              className={`flex items-center gap-2 px-5 py-2.5 font-mono text-[10px] sm:text-xs tracking-wider uppercase transition-all rounded ${
                activeCurveTab === 'aero'
                  ? 'bg-neutral-900 border border-neutral-800 text-white shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Wind className="h-3.5 w-3.5" />
              Aero Dynamics Mapping
            </button>
          </div>
        </div>

        {/* Chart Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          
          {/* Left Column: Legend / Telemetry Info */}
          <div className="bg-neutral-950 p-6 rounded border border-neutral-800/80 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="font-mono text-[10px] tracking-[0.2em] text-red-500 uppercase">// LIVE SCHEMATIC DATA</span>
              
              {activeCurveTab === 'power' ? (
                <>
                  <h3 className="font-sans font-bold text-xl text-white uppercase tracking-wider">
                    NA Flat-Six Power Metrics
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    Watch the intersection of absolute power (Horsepower) and instant combustion rotational force (Torque in Nm). The 4.0L atmospheric boxer builds torque smoothly but spins to 9k RPM to push peak horsepower directly to the redline.
                  </p>
                  <div className="space-y-3 pt-2 font-mono">
                    <div className="flex items-center justify-between text-xs border-b border-neutral-900 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 bg-red-600 rounded-sm" />
                        <span className="text-neutral-400">Horsepower (HP)</span>
                      </div>
                      <span className="text-white font-bold">502 HP @ 8,400 RPM</span>
                    </div>
                    <div className="flex items-center justify-between text-xs border-b border-neutral-900 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 bg-zinc-400 rounded-sm" />
                        <span className="text-neutral-400">Torque (Nm)</span>
                      </div>
                      <span className="text-white font-bold">470 Nm @ 6,100 RPM</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400">Engine Speed Limit</span>
                      <span className="text-red-500 font-bold animate-pulse">9,000 RPM REDLINE</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="font-sans font-bold text-xl text-white uppercase tracking-wider">
                    Aerodynamic Air Loading
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    Negative lift increases quadratically with speed. In Performance mode, mechanical wing adjustments and specialized floor plate configurations generate motorsport levels of suction that push the chassis onto the track surface.
                  </p>
                  <div className="space-y-3 pt-2 font-mono">
                    <div className="flex items-center justify-between text-xs border-b border-neutral-900 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 bg-red-600 rounded-sm" />
                        <span className="text-neutral-400">Performance Force (kg)</span>
                      </div>
                      <span className="text-white font-bold">680 kg @ 300 km/h</span>
                    </div>
                    <div className="flex items-center justify-between text-xs border-b border-neutral-900 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 bg-zinc-500 rounded-sm" />
                        <span className="text-neutral-400">Standard Road (kg)</span>
                      </div>
                      <span className="text-white font-bold">410 kg @ 300 km/h</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400">Suction Coefficient</span>
                      <span className="text-green-500 font-semibold">+150% Track Load</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Hover Telemetric Readout */}
            <div className="bg-black/80 p-3 rounded border border-neutral-850 font-mono text-[11px] space-y-1.5 shadow-inner">
              <div className="text-[10px] text-neutral-500 uppercase">// TELEMETRY PROBING</div>
              {hoveredData ? (
                <>
                  {activeCurveTab === 'power' ? (
                    <>
                      <div className="flex justify-between text-neutral-400">
                        <span>ENGINE SPEED:</span>
                        <span className="text-white font-bold">{hoveredData.engineSpeed} RPM</span>
                      </div>
                      <div className="flex justify-between text-neutral-400">
                        <span>HORSEPOWER:</span>
                        <span className="text-red-500 font-bold">{hoveredData.hp} HP</span>
                      </div>
                      <div className="flex justify-between text-neutral-400">
                        <span>CORRESPONDING TORQUE:</span>
                        <span className="text-zinc-300 font-bold">{hoveredData.torque} Nm</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between text-neutral-400">
                        <span>SPEED METRIC:</span>
                        <span className="text-white font-bold">{hoveredData.speed} KM/H</span>
                      </div>
                      <div className="flex justify-between text-neutral-400">
                        <span>PERFORMANCE ROAD:</span>
                        <span className="text-red-500 font-bold">{hoveredData.performanceForce} KG</span>
                      </div>
                      <div className="flex justify-between text-neutral-400">
                        <span>STANDARD ROAD:</span>
                        <span className="text-zinc-300 font-bold">{hoveredData.standardForce} KG</span>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="text-neutral-500 animate-pulse text-center py-2 flex items-center justify-center gap-1">
                  <HelpCircle className="h-3 w-3" />
                  Hover data dots to probe telemetry
                </div>
              )}
            </div>
          </div>

          {/* Right Columns: Interactive Chart Panel (Rendered with custom SVG) */}
          <div className="lg:col-span-2 bg-neutral-950 p-6 rounded border border-neutral-800/80 flex flex-col justify-between relative min-h-[380px]">
            {/* Grid background effects */}
            <div className="absolute inset-x-6 top-8 bottom-12 border-l border-b border-neutral-850 pointer-events-none flex flex-col justify-between">
              <div className="w-full border-t border-neutral-900 border-dashed" />
              <div className="w-full border-t border-neutral-900 border-dashed" />
              <div className="w-full border-t border-neutral-900 border-dashed" />
              <div className="w-full border-t border-neutral-900 border-dashed" />
            </div>

            {/* Custom Interactive SVG Graph Area */}
            <div className="relative w-full h-[300px] z-10 select-none">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 240">
                
                {/* Power Tab Graph */}
                {activeCurveTab === 'power' && (
                  <>
                    {/* Grid labels */}
                    <text x="-5" y="22" fill="#666" fontSize="8" fontFamily="monospace" textAnchor="end">500 HP / 500 Nm</text>
                    <text x="-5" y="70" fill="#666" fontSize="8" fontFamily="monospace" textAnchor="end">375</text>
                    <text x="-5" y="118" fill="#666" fontSize="8" fontFamily="monospace" textAnchor="end">250</text>
                    <text x="-5" y="166" fill="#666" fontSize="8" fontFamily="monospace" textAnchor="end">125</text>
                    
                    <text x="0" y="235" fill="#666" fontSize="8" fontFamily="monospace">3k RPM</text>
                    <text x="120" y="235" fill="#666" fontSize="8" fontFamily="monospace">4.5k</text>
                    <text x="240" y="235" fill="#666" fontSize="8" fontFamily="monospace">6k</text>
                    <text x="360" y="235" fill="#666" fontSize="8" fontFamily="monospace">7.5k</text>
                    <text x="480" y="235" fill="#666" fontSize="8" fontFamily="monospace" textAnchor="end">9k</text>

                    {/* Gradient under the paths */}
                    <defs>
                      <linearGradient id="hpGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="tqGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#9ca3af" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#9ca3af" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Torque Area SVG */}
                    <path
                      d={`M 0,${220 - (REFRESH_RATE_DATA[0].torque/maxTorque) * 200} 
                          L ${60},${220 - (REFRESH_RATE_DATA[1].torque/maxTorque) * 200}
                          L ${125},${220 - (REFRESH_RATE_DATA[2].torque/maxTorque) * 200}
                          L ${190},${220 - (REFRESH_RATE_DATA[3].torque/maxTorque) * 200}
                          L ${250},${220 - (REFRESH_RATE_DATA[4].torque/maxTorque) * 200}
                          L ${315},${220 - (REFRESH_RATE_DATA[5].torque/maxTorque) * 200}
                          L ${380},${220 - (REFRESH_RATE_DATA[6].torque/maxTorque) * 200}
                          L ${445},${220 - (REFRESH_RATE_DATA[7].torque/maxTorque) * 200}
                          L ${500},${220 - (REFRESH_RATE_DATA[8].torque/maxTorque) * 200}
                          L 500,220 L 0,220 Z`}
                      fill="url(#tqGrad)"
                      className="transition-all duration-500"
                    />

                    {/* HP Area SVG */}
                    <path
                      d={`M 0,${220 - (REFRESH_RATE_DATA[0].hp/maxHp) * 200} 
                          L ${60},${220 - (REFRESH_RATE_DATA[1].hp/maxHp) * 200}
                          L ${125},${220 - (REFRESH_RATE_DATA[2].hp/maxHp) * 200}
                          L ${190},${220 - (REFRESH_RATE_DATA[3].hp/maxHp) * 200}
                          L ${250},${220 - (REFRESH_RATE_DATA[4].hp/maxHp) * 200}
                          L ${315},${220 - (REFRESH_RATE_DATA[5].hp/maxHp) * 200}
                          L ${380},${220 - (REFRESH_RATE_DATA[6].hp/maxHp) * 200}
                          L ${445},${220 - (REFRESH_RATE_DATA[7].hp/maxHp) * 200}
                          L ${500},${220 - (REFRESH_RATE_DATA[8].hp/maxHp) * 200}
                          L 500,220 L 0,220 Z`}
                      fill="url(#hpGrad)"
                      className="transition-all duration-500"
                    />

                    {/* Paths Lines */}
                    <path
                      d={`M 0,${220 - (REFRESH_RATE_DATA[0].torque/maxTorque) * 200} 
                          L ${60},${220 - (REFRESH_RATE_DATA[1].torque/maxTorque) * 200}
                          L ${125},${220 - (REFRESH_RATE_DATA[2].torque/maxTorque) * 200}
                          L ${190},${220 - (REFRESH_RATE_DATA[3].torque/maxTorque) * 200}
                          L ${250},${220 - (REFRESH_RATE_DATA[4].torque/maxTorque) * 200}
                          L ${315},${220 - (REFRESH_RATE_DATA[5].torque/maxTorque) * 200}
                          L ${380},${220 - (REFRESH_RATE_DATA[6].torque/maxTorque) * 200}
                          L ${445},${220 - (REFRESH_RATE_DATA[7].torque/maxTorque) * 200}
                          L ${500},${220 - (REFRESH_RATE_DATA[8].torque/maxTorque) * 200}`}
                      fill="none"
                      stroke="#9ca3af"
                      strokeWidth="1.5"
                      strokeDasharray="2,2"
                    />

                    <path
                      d={`M 0,${220 - (REFRESH_RATE_DATA[0].hp/maxHp) * 200} 
                          L ${60},${220 - (REFRESH_RATE_DATA[1].hp/maxHp) * 200}
                          L ${125},${220 - (REFRESH_RATE_DATA[2].hp/maxHp) * 200}
                          L ${190},${220 - (REFRESH_RATE_DATA[3].hp/maxHp) * 200}
                          L ${250},${220 - (REFRESH_RATE_DATA[4].hp/maxHp) * 200}
                          L ${315},${220 - (REFRESH_RATE_DATA[5].hp/maxHp) * 200}
                          L ${380},${220 - (REFRESH_RATE_DATA[6].hp/maxHp) * 200}
                          L ${445},${220 - (REFRESH_RATE_DATA[7].hp/maxHp) * 200}
                          L ${500},${220 - (REFRESH_RATE_DATA[8].hp/maxHp) * 200}`}
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="3"
                    />

                    {/* Interactive Probing Nodes */}
                    {REFRESH_RATE_DATA.map((d, index) => {
                      const x = (index / (REFRESH_RATE_DATA.length - 1)) * 500;
                      const yHp = 220 - (d.hp / maxHp) * 200;
                      return (
                        <g 
                          key={index}
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredData(d)}
                          onMouseLeave={() => setHoveredData(null)}
                        >
                          <circle
                            cx={x}
                            cy={yHp}
                            r={hoveredData?.engineSpeed === d.engineSpeed ? '6' : '3.5'}
                            fill="#ef4444"
                            stroke="#000"
                            strokeWidth="1.5"
                            className="transition-all"
                          />
                        </g>
                      );
                    })}
                  </>
                )}

                {/* Aero Tab Graph */}
                {activeCurveTab === 'aero' && (
                  <>
                    {/* Grid labels */}
                    <text x="-5" y="22" fill="#666" fontSize="8" fontFamily="monospace" textAnchor="end">700 kg Downforce</text>
                    <text x="-5" y="70" fill="#666" fontSize="8" fontFamily="monospace" textAnchor="end">525</text>
                    <text x="-5" y="118" fill="#666" fontSize="8" fontFamily="monospace" textAnchor="end">350</text>
                    <text x="-5" y="166" fill="#666" fontSize="8" fontFamily="monospace" textAnchor="end">175</text>
                    
                    <text x="0" y="235" fill="#666" fontSize="8" fontFamily="monospace">100 KM/H</text>
                    <text x="100" y="235" fill="#666" fontSize="8" fontFamily="monospace">140</text>
                    <text x="200" y="235" fill="#666" fontSize="8" fontFamily="monospace">180</text>
                    <text x="300" y="235" fill="#666" fontSize="8" fontFamily="monospace">220</text>
                    <text x="400" y="235" fill="#666" fontSize="8" fontFamily="monospace">260</text>
                    <text x="500" y="235" fill="#666" fontSize="8" fontFamily="monospace" textAnchor="end">300 KM/H</text>

                    {/* Grad Defs */}
                    <defs>
                      <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="stdGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#71717a" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#71717a" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Standard downforce Area */}
                    <path
                      d={`M 0,${220 - (AERO_DATA[0].standardForce/maxForce) * 200}
                          L 100,${220 - (AERO_DATA[1].standardForce/maxForce) * 200}
                          L 200,${220 - (AERO_DATA[2].standardForce/maxForce) * 200}
                          L 300,${220 - (AERO_DATA[3].standardForce/maxForce) * 200}
                          L 400,${220 - (AERO_DATA[4].standardForce/maxForce) * 200}
                          L 500,${220 - (AERO_DATA[5].standardForce/maxForce) * 200}
                          L 500,220 L 0,220 Z`}
                      fill="url(#stdGrad)"
                      className="transition-all duration-500"
                    />

                    {/* Performance downforce Area */}
                    <path
                      d={`M 0,${220 - (AERO_DATA[0].performanceForce/maxForce) * 200}
                          L 100,${220 - (AERO_DATA[1].performanceForce/maxForce) * 200}
                          L 200,${220 - (AERO_DATA[2].performanceForce/maxForce) * 200}
                          L 300,${220 - (AERO_DATA[3].performanceForce/maxForce) * 200}
                          L 400,${220 - (AERO_DATA[4].performanceForce/maxForce) * 200}
                          L 500,${220 - (AERO_DATA[5].performanceForce/maxForce) * 200}
                          L 500,220 L 0,220 Z`}
                      fill="url(#perfGrad)"
                      className="transition-all duration-500"
                    />

                    {/* Line paths */}
                    <path
                      d={`M 0,${220 - (AERO_DATA[0].standardForce/maxForce) * 200}
                          L 100,${220 - (AERO_DATA[1].standardForce/maxForce) * 200}
                          L 200,${220 - (AERO_DATA[2].standardForce/maxForce) * 200}
                          L 300,${220 - (AERO_DATA[3].standardForce/maxForce) * 200}
                          L 400,${220 - (AERO_DATA[4].standardForce/maxForce) * 200}
                          L 500,${220 - (AERO_DATA[5].standardForce/maxForce) * 200}`}
                      fill="none"
                      stroke="#71717a"
                      strokeWidth="1.5"
                      strokeDasharray="2,2"
                    />

                    <path
                      d={`M 0,${220 - (AERO_DATA[0].performanceForce/maxForce) * 200}
                          L 100,${220 - (AERO_DATA[1].performanceForce/maxForce) * 200}
                          L 200,${220 - (AERO_DATA[2].performanceForce/maxForce) * 200}
                          L 300,${220 - (AERO_DATA[3].performanceForce/maxForce) * 200}
                          L 400,${220 - (AERO_DATA[4].performanceForce/maxForce) * 200}
                          L 500,${220 - (AERO_DATA[5].performanceForce/maxForce) * 200}`}
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="3"
                    />

                    {AERO_DATA.map((d, index) => {
                      const x = index * 100;
                      const yPerf = 220 - (d.performanceForce / maxForce) * 200;
                      return (
                        <g 
                          key={index}
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredData(d)}
                          onMouseLeave={() => setHoveredData(null)}
                        >
                          <circle
                            cx={x}
                            cy={yPerf}
                            r={hoveredData?.speed === d.speed ? '6' : '3.5'}
                            fill="#ef4444"
                            stroke="#0055ff"
                            strokeWidth="1.5"
                            className="transition-all"
                          />
                        </g>
                      );
                    })}
                  </>
                )}
              </svg>
            </div>

            <div className="flex justify-between items-center text-neutral-500 font-mono text-[9px] mt-4 pt-4 border-t border-neutral-900 z-10">
              <span>// FLRACHT WIND-TUNNEL VALIDATED TELEMETRY v992.1</span>
              <span>SCALING RATE: REAL 1:1</span>
            </div>
          </div>
        </div>

        {/* Dynamic Mechanical Features Selector Tabs with images */}
        <div className="bg-neutral-950 rounded border border-neutral-850 overflow-hidden shadow-2xl">
          <div className="flex border-b border-neutral-850 bg-black divide-x divide-neutral-850 font-mono text-xs overflow-x-auto">
            <button
              onClick={() => setActiveFeatureTab('engine')}
              className={`flex-1 text-center py-4 px-6 tracking-widest uppercase transition-all whitespace-nowrap cursor-pointer ${
                activeFeatureTab === 'engine'
                  ? 'bg-neutral-950 text-white font-bold border-b-2 border-red-500'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
              }`}
            >
              Combustion Engine
            </button>
            <button
              onClick={() => setActiveFeatureTab('aerodynamics')}
              className={`flex-1 text-center py-4 px-6 tracking-widest uppercase transition-all whitespace-nowrap cursor-pointer ${
                activeFeatureTab === 'aerodynamics'
                  ? 'bg-neutral-950 text-white font-bold border-b-2 border-red-500'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
              }`}
            >
              Aerodynamics Suite
            </button>
            <button
              onClick={() => setActiveFeatureTab('chassis')}
              className={`flex-1 text-center py-4 px-6 tracking-widest uppercase transition-all whitespace-nowrap cursor-pointer ${
                activeFeatureTab === 'chassis'
                  ? 'bg-neutral-950 text-white font-bold border-b-2 border-red-500'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
              }`}
            >
              Chassis & Double-Wishbone
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeatureTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Left text column */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-neutral-900 px-3 py-1 rounded border border-neutral-800 text-[10px] text-zinc-400 font-mono tracking-widest uppercase">
                  <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
                  AUTHENTIC MOTORSPORT ARCHITECTURE
                </div>
                
                <h3 className="font-sans font-extrabold text-2xl sm:text-4xl text-white tracking-widest uppercase leading-tight">
                  {features[activeFeatureTab].title}
                </h3>
                
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {features[activeFeatureTab].description}
                </p>

                {/* Key Spec table */}
                <div className="space-y-2 border-t border-neutral-900 pt-6 font-mono text-xs">
                  {features[activeFeatureTab].specs.map((spec, idx) => (
                    <div key={idx} className="flex justify-between py-1.5 border-b border-neutral-900 pb-1.5 last:border-0 last:pb-0">
                      <span className="text-zinc-500 uppercase">{spec.label}</span>
                      <span className="text-white font-bold tracking-wide">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right image column */}
              <div className="relative aspect-[16/10] overflow-hidden rounded border border-neutral-800 bg-neutral-900/30 group">
                <img
                  src={features[activeFeatureTab].image}
                  alt={features[activeFeatureTab].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3.5 rounded border border-neutral-800 font-mono text-[10px] text-neutral-400 flex justify-between items-center">
                  <span>REF_SOURCE: FLRACHT_LAB_992</span>
                  <span className="text-red-500 flex items-center gap-1">
                    LIVE INSPECT <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
