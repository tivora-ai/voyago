"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function HeroVideo() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and window resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      {/* Video for desktop, gradient for mobile */}
      {!isMobile ? (
        <video 
          className="absolute inset-0 h-full w-full object-cover"
          src="/video/sea-hero.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline 
        />
      ) : (
        // Animated gradient background for mobile
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-900 via-ocean-700 to-ocean-500 animate-gradient" />
      )}
      
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      
      {/* Cinematic overlay: deep blue → transparent → sand */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0b1f2a]/90 via-transparent to-[#efe9dd]/60" />
      
      {/* Decorative wave pattern for mobile */}
      {isMobile && (
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#ffffff" fillOpacity="0.3" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      )}
      
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center max-w-4xl"
        >
          <span
            className="hidden md:block relative before:absolute before:-left-6 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-10 before:bg-coral-400 before:rounded-full before:shadow-[0_0_10px_rgba(255,127,106,0.6)]"
            aria-hidden
          >
            {/* Accent line only, no text needed */}
          </span>
          <h1
            className="text-[1.75rem] sm:text-[2.25rem] md:text-[3.25rem] font-light italic tracking-wide drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)] text-[#f9f5eb] font-[Playfair_Display,serif] text-center md:text-left leading-tight"
          >
            A Beautiful Journey in a Fashion of Sea
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
