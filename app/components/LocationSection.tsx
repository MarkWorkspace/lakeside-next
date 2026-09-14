import ContactForm from "./ContactForm";

export default function LocationSection() {
  return (
    <section className="py-24 px-6 md:px-12 bg-surface" id="location">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tighter mb-12 text-neutral-900">
          Расположение и контакты
        </h2>
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 rounded-3xl overflow-hidden h-[500px] relative bg-neutral-200 group">
            <iframe 
              src="https://yandex.ru/map-widget/v1/?ll=37.124370,55.828157&z=16&pt=37.124370,55.828157,pm2rdm" 
              allowFullScreen={true}
              title="Интерактивная карта КП Павловы озера"
              className="w-full h-full border-0 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            ></iframe>
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl max-w-sm z-10">
              <h3 className="font-bold text-lg mb-1 text-neutral-900">Адрес объекта</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed select-all cursor-text" title="Кликните, чтобы выделить">
                143581, Россия, Московская область, г.о. Истра, д. Исаково, КП «Павловы Озера», Лесная ул., 8
              </p>
            </div>

            <div className="absolute bottom-4 left-4 right-4 md:right-auto bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl flex flex-wrap gap-2 items-center z-10">
              <span className="text-xs font-semibold text-neutral-700 mr-1">Построить маршрут:</span>
              <a 
                href="https://yandex.ru/maps/?rtext=~55.828157,37.124370&rtt=auto" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-neutral-800 transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                Яндекс Карты
              </a>
              <a 
                href="yandexnavi://build_route_on_map?lat_to=55.828157&lon_to=37.124370"
                className="px-3 py-1.5 bg-amber-500 text-white text-xs font-bold rounded-lg hover:bg-amber-600 transition-colors inline-flex items-center gap-1 md:hidden cursor-pointer"
              >
                Навигатор
              </a>
              <a 
                href="https://2gis.ru/routeSearch/rsType/car/to/37.124370,55.828157" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                2ГИС
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
