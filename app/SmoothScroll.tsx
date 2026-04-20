"use client";

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useAnimationFrame } from 'framer-motion';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Проверка на мобильные устройства и тачскрины
    const isMobileOrTouch = window.matchMedia('(max-width: 768px)').matches || window.matchMedia('(pointer: coarse)').matches;
    
    // Проверка системных настроек на уменьшение анимаций
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Эвристика для слабых устройств: менее 4 ядер процессора или менее 4 ГБ ОЗУ
    const isLowEndDevice = 
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) ||
      ('deviceMemory' in navigator && (navigator as Navigator & { deviceMemory: number }).deviceMemory < 4);

    // Отключаем Lenis для телефонов, при системном запрете анимаций или на слабых ПК
    if (isMobileOrTouch || isReducedMotion || isLowEndDevice) {
      return; // Выходим из эффекта, оставляя нативный скроллинг
    }

    // Инициализация Lenis
    const lenis = new Lenis({
      duration: 0.8, // Общая длительность скролла (в секундах). Можно уменьшить до 0.6 для еще большей резкости.
      easing: (t) => 1 - Math.pow(1 - t, 4), // Кривая easeOutQuart: плавно сглаживает рывки, но быстро и четко останавливается в конце
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useAnimationFrame((time) => {
    lenisRef.current?.raf(time);
  });

  return <>{children}</>;
}