"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function PlanModal({ src, onClose }: { src: string | null; onClose: () => void }) {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleClose = () => {
    setIsZoomed(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {src && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={handleClose}>
          <button onClick={handleClose} className="absolute top-4 right-4 md:top-6 md:right-6 z-[110] p-2 bg-neutral-800/50 hover:bg-neutral-800 backdrop-blur-md rounded-full hover:scale-[1.005] active:scale-95 transition-all duration-70 ease-in-out text-white">
            <X size={24} />
          </button>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-auto shadow-2xl relative flex flex-col items-center justify-center"
          >
            <div className={`p-4 md:p-8 w-full flex-grow flex ${isZoomed ? 'items-start justify-start' : 'items-center justify-center'}`}>
              <img 
                src={src} 
                alt="Увеличенная планировка дома" 
                onClick={() => setIsZoomed(!isZoomed)}
                className={`h-auto object-contain transition-all duration-300 ${isZoomed ? 'w-[250%] md:w-[150%] max-w-none cursor-zoom-out' : 'max-w-full max-h-full cursor-zoom-in'}`} 
              />
            </div>
          </motion.div>
          <AnimatePresence>
            {!isZoomed && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[110] bg-white/90 text-black text-sm px-5 py-2.5 rounded-full pointer-events-none backdrop-blur-md shadow-lg font-medium whitespace-nowrap"
              >
                Нажмите на план для увеличения
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}