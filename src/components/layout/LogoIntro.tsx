"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useIntro } from "@/hooks/useIntro";

export default function LogoIntro() {
  const { done, finish } = useIntro();
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);
  const [sx, setSx] = useState(1);

  useEffect(() => {
    if (done) return;
    
    if (step === 0) {
      // Wait for fade-in animation to complete
      setTimeout(() => setStep(1), 1800);
    } else if (step === 1) {
      // Trigger jump to navbar
      jumpToNavbar();
    }
  }, [step, done]);

  const jumpToNavbar = async () => {
    const target = document.getElementById("voyago-logo-target");
    if (!ref.current || !target) {
      return finish();
    }
    
    window.scrollTo({ top: 0, behavior: "auto" });
    await new Promise(res => setTimeout(res, 10));
    
    const src = ref.current.getBoundingClientRect();
    const dst = target.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    
    setDx(dst.left - src.left);
    setDy(dst.top - src.top + scrollY);
    setSx(dst.width / src.width);
    setStep(2);
    
    setTimeout(() => finish(), 1000);
  };

  if (done) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foam">
      <motion.div
        ref={ref}
        className="relative w-32 h-32"
        initial={{ opacity: 0, x: -100 }}
        animate={
          step === 2
            ? { 
                opacity: 1,
                x: dx, 
                y: dy, 
                scale: sx
              }
            : { opacity: 1, x: 0, y: 0, scale: 1 }
        }
        transition={
          step === 2
            ? { 
                duration: 1.0, 
                ease: [0.34, 1.56, 0.64, 1] // Bounce easing for jump effect
              }
            : { 
                duration: 1.2, 
                ease: [0.22, 1, 0.36, 1] 
              }
        }
      >
        <Image 
          src="/logo/anchor-mark.svg" 
          alt="Voyago Anchor" 
          width={128} 
          height={128} 
          priority 
          className="w-full h-full"
        />
      </motion.div>
    </div>
  );
}
