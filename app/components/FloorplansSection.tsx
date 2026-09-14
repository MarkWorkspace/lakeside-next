"use client";

import { useState } from "react";
import Image from "next/image";
import PlanModal from "./PlanModal";

export default function FloorplansSection() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <>
      <PlanModal src={selectedPlan} onClose={() => setSelectedPlan(null)} />

      <section className="py-24 px-6 md:px-12 bg-surface-container-low overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <h2 className="text-4xl font-bold tracking-tighter text-neutral-900">
              Планировка
            </h2>
            <div className="text-on-surface-variant max-w-md text-left md:text-right">
              Продуманное зонирование: Master-bedroom с гардеробной, 2 детские комнаты и кабинет для работы.
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div 
                className="bg-white shadow-sm rounded-2xl p-4 h-[500px] relative flex items-center justify-center cursor-pointer group overflow-hidden transition-all duration-200 ease-out hover:shadow-xl hover:-translate-y-1"
                onClick={() => setSelectedPlan('/images/plan-1.webp')}
              >
                <div className="relative w-full h-full">
                  <Image 
                    src="/images/plan-1.webp" 
                    alt="Планировка 1 этажа: кухня-гостиная, гостевой санузел, котельная"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                    className="object-contain p-2 group-hover:scale-[1.01] transition-transform duration-700 ease-in-out" 
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center pointer-events-none">
                  <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-black px-5 py-2.5 rounded-full font-medium transition-opacity text-sm backdrop-blur-sm shadow-sm">
                    Увеличить планировку
                  </span>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-neutral-900">1 этаж</h3>
                <p className="text-on-surface-variant">Кухня-гостиная, гостевой санузел, котельная</p>
              </div>
            </div>

            <div className="space-y-6">
              <div 
                className="bg-white shadow-sm rounded-2xl p-4 h-[500px] relative flex items-center justify-center cursor-pointer group overflow-hidden transition-all duration-200 ease-out hover:shadow-xl hover:-translate-y-1"
                onClick={() => setSelectedPlan('/images/plan-2.webp')}
              >
                <div className="relative w-full h-full">
                  <Image 
                    src="/images/plan-2.webp" 
                    alt="Планировка 2 этажа: 3 спальни, кабинет, 2 ванные комнаты"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                    className="object-contain p-2 group-hover:scale-[1.01] transition-transform duration-700 ease-in-out" 
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center pointer-events-none">
                  <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-black px-5 py-2.5 rounded-full font-medium transition-opacity text-sm backdrop-blur-sm shadow-sm">
                    Увеличить планировку
                  </span>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-neutral-900">2 этаж</h3>
                <p className="text-on-surface-variant">3 спальни, кабинет, 2 ванные комнаты</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
