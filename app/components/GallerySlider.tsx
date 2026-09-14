"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, PanInfo } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { photos } from "../data";

export default function GallerySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % photos.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, { offset }: PanInfo) => {
    if (offset.x < -50) {
      next();
    } else if (offset.x > 50) {
      prev();
    }
  };

  return (
    <div className="flex flex-col gap-4 md:block">
      <div className="relative w-full aspect-[3/4] md:aspect-auto md:h-[700px] rounded-3xl overflow-hidden bg-surface-container shadow-xl md:shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.23, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            <Image 
              src={photos[currentIndex].src} 
              alt={photos[currentIndex].caption}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
              quality={85}
              className="object-cover pointer-events-none"
            />
            <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden md:block absolute bottom-12 left-12 right-12 text-white pointer-events-none"
            >
              <p className="text-2xl font-medium tracking-tight max-w-2xl leading-relaxed">
                {photos[currentIndex].caption}
              </p>
              <div className="mt-6 flex items-center gap-4">
                <span className="text-sm font-bold tracking-widest uppercase opacity-50">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="md:hidden absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <button 
            onClick={prev} 
            aria-label="Предыдущее фото"
            className="pointer-events-auto w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/40 hover:scale-[1.005] hover:shadow-lg active:scale-95 transition-all duration-200 ease-out cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={next} 
            aria-label="Следующее фото"
            className="pointer-events-auto w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/40 hover:scale-[1.005] hover:shadow-lg active:scale-95 transition-all duration-200 ease-out cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="hidden md:flex absolute bottom-12 right-12 gap-4 z-10">
          <button 
            onClick={prev} 
            aria-label="Предыдущее фото"
            className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-[1.005] hover:shadow-lg active:scale-95 transition-all duration-200 ease-out cursor-pointer"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={next} 
            aria-label="Следующее фото"
            className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-[1.005] hover:shadow-lg active:scale-95 transition-all duration-200 ease-out cursor-pointer"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="md:hidden px-2 mt-2">
        <p className="text-lg font-medium tracking-tight text-neutral-900 leading-relaxed">
          {photos[currentIndex].caption}
        </p>
        <div className="mt-4 flex items-center gap-4">
          <span className="text-sm font-bold tracking-widest uppercase text-neutral-400">
            {String(currentIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}
