import Image from "next/image";
import { Car, Train, ShoppingBag, Waves, LucideIcon } from "lucide-react";

interface InfraItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const InfraItem = ({ icon: Icon, title, description }: InfraItemProps) => (
  <li className="flex items-start gap-4 group">
    <div className="text-tertiary-fixed bg-primary p-2 rounded-lg flex-shrink-0">
      <Icon size={24} />
    </div>
    <div>
      <div className="text-xl font-bold tracking-tight text-neutral-900">{title}</div>
      <p className="text-on-surface-variant">{description}</p>
    </div>
  </li>
);

export default function InfrastructureSection() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white" id="infrastructure">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-bold tracking-tighter mb-12 text-neutral-900">
            Инфраструктура и Локация
          </h2>
          <ul className="space-y-8">
            <InfraItem 
              icon={Car} 
              title="20 км (25 мин) — до МКАД" 
              description="Быстрый выезд на Новорижское шоссе" 
            />
            <InfraItem 
              icon={Train} 
              title="2 км (7 мин) — до станции МЦД 'Нахабино'" 
              description="Удобная связь с центром Москвы (МЦД-2)" 
            />
            <InfraItem 
              icon={ShoppingBag} 
              title="5 минут — ТРК 'Павлово подворье'" 
              description="Магазины, рестораны и премиальный фитнес-клуб World Class" 
            />
            <InfraItem 
              icon={Waves} 
              title="0 минут — Собственное озеро, пляж и лес" 
              description="Природа и набережная сразу за порогом дома" 
            />
          </ul>
        </div>
        <div className="h-[500px] bg-surface-container rounded-2xl overflow-hidden relative group">
          <Image 
            src="/images/infrastructure.webp" 
            alt="Собственное озеро, пляж и инфраструктура КП Павловы озера"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={85}
            className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-in-out"
          />
        </div>
      </div>
    </section>
  );
}
