"use client";
import { useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { useIntro } from "@/hooks/useIntro";

export default function LogoIntro() {
  const { done, finish } = useIntro();
  const controls = useAnimationControls();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (done) return;
    const t = setTimeout(() => flyToNavbar(), 1600);
    return () => clearTimeout(t);
  }, [done]);

  const flyToNavbar = async () => {
    const target = document.getElementById("voyago-logo-target");
    if (!ref.current || !target) return finish();
    // Scroll to top to ensure navbar is visible
    window.scrollTo({ top: 0, behavior: "instant" });
    // Wait for navbar/logo to be painted
    await new Promise(res => setTimeout(res, 10));
    const src = ref.current.getBoundingClientRect();
    const dst = target.getBoundingClientRect();
    // Calculate scroll offset
    const scrollY = window.scrollY || window.pageYOffset;
    const dx = dst.left - src.left;
    const dy = dst.top - src.top + scrollY;
    const sx = dst.width / src.width;
    await controls.start({
      x: dx, y: dy, scale: sx, borderRadius: "9999px",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    });
    finish();
  };

  if (typeof window !== "undefined") {
    const appContent = document.getElementById("voyago-app-content");
    if (appContent) appContent.style.display = done ? "block" : "none";
  }
  if (done) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foam">
      <motion.div ref={ref} animate={controls} initial={{ scale: 1, borderRadius: "1rem" }}
        className="w-64 h-64 rounded-2xl shadow-soft grid place-items-center bg-sand-200">
        <Image src="/logo/anchor-mark.svg" alt="Voyago" width={160} height={160} priority />
      </motion.div>
    </div>
  );
}
