import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Engineering from './components/Engineering';
import Heritage from './components/Heritage';
import Configurator from './components/Configurator';
import Auth from './components/Auth';
import DriverPortal from './components/DriverPortal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { DriverState } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prefilledSpec, setPrefilledSpec] = useState<any | null>(null);

  // Authenticated driver state
  const [driverState, setDriverState] = useState<DriverState>({
    isRegistered: false,
    username: '',
    flrachtId: '',
    accessCode: '',
    licenseClass: 'B',
    telemetry: []
  });

  // Saved tailored configurations garage state
  const [savedSpecList, setSavedSpecList] = useState<any[]>([]);

  // Load persistence logic
  useEffect(() => {
    // 1. Try to restore active pilot session
    const savedPilotStr = localStorage.getItem('porsche_gt3_pilot');
    if (savedPilotStr) {
      try {
        const savedPilot = JSON.parse(savedPilotStr) as DriverState;
        setDriverState(savedPilot);
      } catch (e) {
        console.error('Failed to parse saved pilot session:', e);
      }
    }

    // 2. Try to restore saved chassis specs in garage
    const savedSpecsStr = localStorage.getItem('porsche_gt3_garage');
    if (savedSpecsStr) {
      try {
        const savedSpecs = JSON.parse(savedSpecsStr) as any[];
        setSavedSpecList(savedSpecs);
      } catch (e) {
        console.error('Failed to parse saved garage specs:', e);
      }
    }
  }, []);

  // Update backend persistence on spec changes
  const saveGarageToLocal = (newSpecs: any[]) => {
    setSavedSpecList(newSpecs);
    localStorage.setItem('porsche_gt3_garage', JSON.stringify(newSpecs));
  };

  // Add a newly configured build item from Tailor Suite to Garage
  const handleSavePortalGarage = (specDetails: any) => {
    const updatedGarage = [...savedSpecList, specDetails];
    saveGarageToLocal(updatedGarage);
  };

  // Remove spec item index from Garage
  const handleRemoveSpec = (idx: number) => {
    const updatedGarage = savedSpecList.filter((_, i) => i !== idx);
    saveGarageToLocal(updatedGarage);
  };

  // Callback once pilot registers or logs in securely
  const handleLogin = (driver: DriverState) => {
    setDriverState(driver);
    // Push them into the driver dashboard tab instantly
    setActiveTab('portal');
  };

  // Terminate pilot credentials session
  const handleLogout = () => {
    localStorage.removeItem('porsche_gt3_pilot');
    setDriverState({
      isRegistered: false,
      username: '',
      flrachtId: '',
      accessCode: '',
      licenseClass: 'B',
      telemetry: []
    });
    // Return to landing index
    setActiveTab('home');
  };

  // User clicked "Inquire Spec" -> Prefill contact form & deep link to Contact
  const handleInquireSpec = (specDetails: any) => {
    setPrefilledSpec(specDetails);
    setActiveTab('contact');
    // Scroll window smoothly to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearPrefilledSpec = () => {
    setPrefilledSpec(null);
  };

  // Navigation controller helper
  const navigateToTab = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-black text-white min-h-screen selection:bg-red-600 selection:text-white overflow-x-hidden antialiased">
      
      {/* Dynamic Floating Ingress Backdrop Ambient glow */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-red-600/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 z-0" />

      {/* Luxury Sticky Navbar */}
      <Header
        activeTab={activeTab}
        setActiveTab={navigateToTab}
        driverState={driverState}
        onLogout={handleLogout}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Main Viewport Mount with Smooth Transitions */}
      <main className="relative z-10 min-h-[75vh]">
        <AnimatePresence mode="wait">
          
          {/* TAB: HOME / CONCEPT */}
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Hero onExplore={navigateToTab} />
              <Engineering />
            </motion.div>
          )}

          {/* TAB: HERITAGE ARCHIVES */}
          {activeTab === 'heritage' && (
            <motion.div
              key="heritage"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.35 }}
            >
              <Heritage />
            </motion.div>
          )}

          {/* TAB: TAILOR SUITE CONIGURATOR */}
          {activeTab === 'tailor' && (
            <motion.div
              key="tailor"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.35 }}
            >
              <Configurator
                onInquireSpec={handleInquireSpec}
                onSavePortalGarage={handleSavePortalGarage}
              />
            </motion.div>
          )}

          {/* TAB: DRIVER PORTAL */}
          {activeTab === 'portal' && (
            <motion.div
              key="portal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              {driverState.isRegistered ? (
                <DriverPortal
                  driverState={driverState}
                  onLogout={handleLogout}
                  savedSpecList={savedSpecList}
                  onRemoveSpec={handleRemoveSpec}
                  onNavigateToTailor={() => navigateToTab('tailor')}
                />
              ) : (
                <Auth onLogin={handleLogin} />
              )}
            </motion.div>
          )}

          {/* TAB: INITIATE CONTACT INQUIRY */}
          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <Contact
                prefilledSpec={prefilledSpec}
                onClearPrefilledSpec={handleClearPrefilledSpec}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Luxury Brand Footer */}
      <Footer onNavigate={navigateToTab} />
    </div>
  );
}
