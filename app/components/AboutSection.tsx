const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col shadow-sm">
    <div className="text-4xl font-extrabold tracking-tighter mb-2 text-neutral-900">{value}</div>
    <div className="text-sm font-medium text-on-surface-variant uppercase tracking-wider">{label}</div>
  </div>
);

export default function AboutSection() {
  return (
    <section className="py-12 px-6 md:px-12 bg-surface" id="about">
      <div className="max-w-7xl mx-auto">
        <h2 className="sr-only">Ключевые характеристики объекта</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard value="241 м²" label="Площадь дома" />
          <StatCard value="7,5 соток" label="Участок ИЖС" />
          <StatCard value="3 спальни" label="и 3 санузла" />
          <StatCard value="2025 год" label="год постройки" />
        </div>
      </div>
    </section>
  );
}
