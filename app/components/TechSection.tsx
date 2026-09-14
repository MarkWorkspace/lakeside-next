import { Wind, FlameKindling, VolumeX, Settings, LucideIcon } from "lucide-react";

interface TechItemProps {
  icon: LucideIcon;
  text: string;
}

const TechItem = ({ icon: Icon, text }: TechItemProps) => (
  <div className="flex items-center gap-6 group">
    <div className="w-12 h-12 flex-shrink-0 bg-white/10 rounded-full flex items-center justify-center">
      <Icon size={24} className="text-tertiary-fixed" />
    </div>
    <div className="text-xl font-medium leading-tight">{text}</div>
  </div>
);

export default function TechSection() {
  return (
    <section className="py-24 px-6 md:px-12 bg-primary text-white" id="characteristics">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tighter mb-16">
          Инженерные решения
        </h2>
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          <TechItem icon={Wind} text="Вентиляция с рекуперацией и кондиционирование" />
          <TechItem icon={FlameKindling} text="Тёплые полы во всем доме" />
          <TechItem icon={VolumeX} text="Акустическая стяжка" />
          <TechItem icon={Settings} text="Магистральный газ, централизованное водоснабжение и канализация" />
        </div>
      </div>
    </section>
  );
}
