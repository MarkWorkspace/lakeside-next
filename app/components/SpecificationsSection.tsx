import { Award, CheckCircle2 } from "lucide-react";

export default function SpecificationsSection() {
  const specs = [
    { label: "Площадь дома", value: "241 м² (2 жилых этажа)" },
    { label: "Площадь участка", value: "7,5 соток (земли населенных пунктов, ИЖС)" },
    { label: "Технология строительства", value: "Энергоэффективный Prefab заводского изготовления" },
    { label: "Застройщик", value: "Строительная компания «Стройся Вятка»" },
    { label: "Выставочный статус", value: "Флагманский дом международной выставки Open Village 2025" },
    { label: "Фундамент", value: "Утепленная шведская плита (УШП) с водяным теплым полом" },
    { label: "Фасадная отделка", value: "Финская тонкопиленая доска + минеральная штукатурка" },
    { label: "Вентиляция и микроклимат", value: "Приточно-вытяжная с рекуперацией тепла (до 85%) и кондиционированием" },
    { label: "Отопление", value: "Магистральный газ, водяные теплые полы по всей площади 1 и 2 этажей" },
    { label: "Коммуникации", value: "Магистральный газ, центральный водопровод и канализация, электричество 15 кВт" },
    { label: "Коммунальные платежи", value: "~15 000 ₽/мес зимой (включая отопление газом, ресурсы и взносы УК)" },
    { label: "Форма сделки", value: "Прямая продажа от собственника, 1 взрослый собственник, свободная продажа" },
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-surface" id="specifications">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <Award size={14} /> Флагманский экспонат Open Village 2025
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-neutral-900">
              Технические характеристики
            </h2>
          </div>
          <p className="text-on-surface-variant max-w-lg text-base md:text-lg">
            Дом построен в единственном экземпляре с применением передовых инженерных решений и премиальных комплектующих.
          </p>
        </div>

        {/* E-E-A-T Блок истории объекта */}
        <div className="mb-12 bg-white rounded-3xl p-8 md:p-10 border border-neutral-200/70 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center flex-shrink-0 text-amber-700">
            <Award size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">
              Официальный дом-экспонат выставки Open Village 2025
            </h3>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
              В 2025 году строительная компания «Стройся Вятка» представила этот дом на международной выставке Open Village в КП «Павловы Озера» как лицо бренда и эталон заводских Prefab-технологий. Для проекта ведущие производители предоставили максимальные партнерские скидки, благодаря чему дом оснащен премиальными материалами по цене на 30% ниже текущей рыночной себестоимости.
            </p>
          </div>
        </div>

        {/* Семантическая таблица параметров для LLM и поисковиков */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-neutral-200/70 shadow-sm">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {specs.map((spec, index) => (
              <div 
                key={index} 
                className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline py-3 border-b border-neutral-100 last:border-0 gap-1 sm:gap-4"
              >
                <dt className="text-sm font-medium text-neutral-500 flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-primary flex-shrink-0" />
                  <span>{spec.label}</span>
                </dt>
                <dd className="text-sm md:text-base font-bold text-neutral-900 sm:text-right">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
