import { Car, Utensils, Warehouse, Trees, LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
}

const FeatureCard = ({ icon: Icon, title }: FeatureCardProps) => (
  <div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
    <Icon size={32} className="text-primary" />
    <div className="text-xl font-bold tracking-tight text-neutral-900">{title}</div>
  </div>
);

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 md:px-12 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tighter mb-12 text-neutral-900">
          Участок и Двор
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard icon={Car} title="Навес на 2 авто" />
          <FeatureCard icon={Utensils} title="BBQ-зона" />
          <FeatureCard icon={Warehouse} title="Хозблок" />
          <FeatureCard icon={Trees} title="Ландшафт" />
        </div>
      </div>
    </section>
  );
}
