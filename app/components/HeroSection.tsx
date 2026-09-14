"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroPhotos } from "../data";

export default function HeroSection() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [isHeroAutoPlay, setIsHeroAutoPlay] = useState(true);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    if (!isHeroAutoPlay) return;
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroPhotos.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [isHeroAutoPlay]);

  const handleNextHero = () => {
    setIsHeroAutoPlay(false);
    setHeroIndex((prev) => (prev + 1) % heroPhotos.length);
  };

  const handlePrevHero = () => {
    setIsHeroAutoPlay(false);
    setHeroIndex((prev) => (prev - 1 + heroPhotos.length) % heroPhotos.length);
  };

  const scrollToContact = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={heroRef} className="relative h-[870px] flex items-center justify-start overflow-hidden group">
      <motion.div 
        className="absolute inset-0 z-0 bg-black"
        style={{ y: heroImageY }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={heroIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image 
              src={heroPhotos[heroIndex]} 
              alt="Премиальный загородный дом 241 м² в КП Павловы озера"
              fill
              priority={heroIndex === 0}
              sizes="100vw"
              quality={85}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />
      </motion.div>

      <button 
        onClick={handlePrevHero}
        aria-label="Предыдущее фото"
        className="absolute inset-y-0 left-0 w-24 md:w-32 z-20 flex items-center justify-start pl-4 md:pl-8 group/btn hover:bg-gradient-to-r hover:from-black/50 hover:to-transparent transition-all duration-500 ease-out cursor-pointer"
      >
        <ChevronLeft size={48} strokeWidth={1} className="text-white/30 group-hover/btn:text-white group-hover/btn:-translate-x-1 transition-all duration-300 drop-shadow-md" />
      </button>

      <button 
        onClick={handleNextHero}
        aria-label="Следующее фото"
        className="absolute inset-y-0 right-0 w-24 md:w-32 z-20 flex items-center justify-end pr-4 md:pr-8 group/btn hover:bg-gradient-to-l hover:from-black/50 hover:to-transparent transition-all duration-500 ease-out cursor-pointer"
      >
        <ChevronRight size={48} strokeWidth={1} className="text-white/30 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all duration-300 drop-shadow-md" />
      </button>
      
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-0 pointer-events-none">
        <motion.div style={{ y: heroTextY }} className="max-w-3xl pointer-events-auto">
          <span className="inline-block bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-6">
            Прямая продажа
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-[0.95] mb-6">
            Готовый дом 241&nbsp;м² в КП «Павловы озера»
          </h1>
          <p className="text-xl text-white/90 font-medium mb-4 max-w-xl leading-relaxed">
            Построен в 2025 году. Полная отделка и мебель.
          </p>
          <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-10">
            49.9 млн
          </div>
          <button 
            onClick={scrollToContact}
            className="bg-white text-primary hover:bg-neutral-100 px-8 py-4 rounded-md text-lg font-bold hover:shadow-lg hover:scale-[1.005] active:scale-95 transition-all duration-70 ease-in-out cursor-pointer"
          >
            Записаться на показ
          </button>
        </motion.div>
      </div>
    </section>
  );
}
