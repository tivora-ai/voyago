"use client";
import { motion } from "framer-motion";
export default function HeroVideo() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <video className="absolute inset-0 h-full w-full object-cover"
        src="/video/sea-hero.mp4" autoPlay muted loop playsInline />
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      {/* Cinematic overlay: deep blue → transparent → sand */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0b1f2a]/90 via-transparent to-[#efe9dd]/60" />
      <div className="relative z-10 h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center"
        >
          <span
            className="hidden md:block relative before:absolute before:-left-6 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-10 before:bg-coral-400 before:rounded-full before:shadow-[0_0_10px_rgba(255,127,106,0.6)]"
            aria-hidden
          >
            {/* Accent line only, no text needed */}
          </span>
          <span
            className="text-[2.25rem] md:text-[3.25rem] font-light italic tracking-wide drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)] text-[#f9f5eb] font-[Playfair_Display,serif] text-left"
          >
            A Beautiful Journey in a Fashion of Sea
          </span>
        </motion.div>
      </div>
    </section>
  );
}
