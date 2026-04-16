"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  Car, 
  Train, 
  ShoppingBag, 
  Waves, 
  Wind, 
  FlameKindling, 
  VolumeX, 
  Settings, 
  MapPin,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Menu,
  X,
  Utensils,
  Warehouse,
  Trees,
  Phone,
  Mail,
  ExternalLink
} from "lucide-react";
import { useState, useEffect, ReactNode, FormEvent, useRef } from "react";

const NavItem = ({ href, children }: { href: string; children: ReactNode }) => (
  <a 
    href={href} 
    className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium tracking-tight"
  >
    {children}
  </a>
);

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div 
    className="bg-surface-container-lowest rounded-xl p-8 flex flex-col shadow-sm"
  >
    <div className="text-4xl font-extrabold tracking-tighter mb-2 text-neutral-900">{value}</div>
    <div className="text-sm font-medium text-on-surface-variant uppercase tracking-wider">{label}</div>
  </div>
);

const InfraItem = ({ icon: Icon, title, description, index }: { icon: any; title: string; description: string; index: number }) => (
  <motion.li 
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="flex items-start gap-4 group"
  >
    <div className="text-tertiary-fixed bg-primary p-2 rounded-lg">
      <Icon size={24} />
    </div>
    <div>
      <div className="text-xl font-bold tracking-tight text-neutral-900">{title}</div>
      <p className="text-on-surface-variant">{description}</p>
    </div>
  </motion.li>
);

const FeatureCard = ({ icon: Icon, title }: { icon: any; title: string }) => (
  <div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col gap-4 shadow-sm">
    <Icon size={32} className="text-primary" />
    <div className="text-xl font-bold tracking-tight text-neutral-900">{title}</div>
  </div>
);

const TechItem = ({ icon: Icon, text }: { icon: any; text: string }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex items-center gap-6 group"
  >
    <div className="w-12 h-12 flex-shrink-0 bg-white/10 rounded-full flex items-center justify-center">
      <Icon size={24} className="text-tertiary-fixed" />
    </div>
    <div className="text-xl font-medium leading-tight">{text}</div>
  </motion.div>
);

const photos = [
  {
    src: "/images/gallery-1.webp",
    caption: "Просторная гостиная с панорамным остеклением и выходом на террасу"
  },
  {
    src: "/images/gallery-2.webp",
    caption: "Кухня-столовая с островом и премиальной бытовой техникой"
  },
  {
    src: "/images/gallery-3.webp",
    caption: "Мастер-спальня с собственной гардеробной и ванной комнатой"
  },
  {
    src: "/images/gallery-4.webp",
    caption: "Хол с прекрасным видом можно использовать как кабинет или как гостинную второго этажа"
  },
  {
    src: "/images/gallery-5.webp",
    caption: "Уютная терраса для вечерних посиделок с видом на озеро"
  }
];

const heroPhotos = [
  "/images/hero.webp",
  "/images/hero-2.webp",
  "/images/hero-3.webp"
];

const faqData = [
  {
    question: "Дом находится в деревне Исаково или входит в состав коттеджного поселка?",
    answer: "Дом находится на территории коттеджного поселка «Павловы Озера». Внутри поселка созданы все условия для комфортного проживания: асфальтные подъездные дороги, широкие улицы с тротуарами и освещением, детские площадки, зелёные общественные зоны, продуктовый магазин, площадка для выгула собак, гостевые парковки, собственный пляж и причал. Охраняемая территория, въезд по пропускам через КПП."
  },
  {
    question: "Этот дом строился на продажу? Сколько таких вы продали?",
    answer: "Мы строительная компания «Стройся Вятка». Занимаемся производством и строительством современных каркасных домов заводского изготовления Prefab. В 99% случаев мы возводим дома конкретно «под заказчика» на его участке. Однако, в 2025 году мы приняли участие в масштабной международной выставке Open Village, которая проходила на территории КП «Павловы Озера». Этот дом был лицом нашей компании, в нем применены самые современные технические решения. Стояла цель - показать, что может наша компания. Этот дом единственный в своем экземпляре."
  },
  {
    question: "Какие затраты на эксплуатацию дома?",
    answer: "На территории КП действует собственная управляющая компания. Основные затраты – это содержание общего имущества, охрана и потребление ресурсу. За счет высокой энергоэффективнсоти конструкций, а также современных технических решений (плита УШП, система вентиляции с рекуперацией тепла) даже в холодные зимние месяцы с учетом затрат на отопление платеж составлял в районе 15 000 рублей в месяц."
  },
  {
    question: "Почему дом обшит нестроганой доской?",
    answer: "На самом деле, на доме применена комбинированная отделка: фасадная штукатурка и деревянная часть. В качестве деревянной отделки использовалась финская фасадная доска с тонкопиленой поверхностью. Это позволяет увеличить адгезию лакокрасочного покрытия к древесине, а также повышает толщину слоя краски. Таким образом, фасад будет служить значительно дольше, чем на «гладких» аналогах."
  },
  {
    question: "Построить такой же дом на моем участке будет дешевле?",
    answer: "К сожалению нет. Для строительства дома под выставку Open Village 2025 многие известные поставщики предоставляли огромные скидки на свои материалы. Таким образом, вы получаете дом, построенный с применением премиальных материалов, по цене на 30% ниже рыночной."
  }
];

const GallerySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % photos.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);

  const handleDragEnd = (e: any, { offset }: any) => {
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
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.23, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            <img 
              src={photos[currentIndex].src} 
              alt={photos[currentIndex].caption}
              className="w-full h-full object-cover pointer-events-none"
            />
            <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden md:block absolute bottom-12 left-12 right-12 text-white"
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
          <button onClick={prev} className="pointer-events-auto w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/40 hover:scale-[1.005] hover:shadow-lg active:scale-95 transition-all duration-70 ease-in-out">
            <ChevronLeft size={20} />
          </button>
          <button onClick={next} className="pointer-events-auto w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/40 hover:scale-[1.005] hover:shadow-lg active:scale-95 transition-all duration-70 ease-in-out">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="hidden md:flex absolute bottom-12 right-12 gap-4 z-10">
          <button onClick={prev} className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-[1.005] hover:shadow-lg active:scale-95 transition-all duration-70 ease-in-out">
            <ChevronLeft size={24} />
          </button>
          <button onClick={next} className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-[1.005] hover:shadow-lg active:scale-95 transition-all duration-70 ease-in-out">
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
};

const PrivacyModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[80vh] overflow-y-auto relative text-left shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-neutral-100 rounded-full hover:bg-neutral-200 hover:scale-[1.005] active:scale-95 transition-all duration-70 ease-in-out text-black">
              <X size={20} />
            </button>
            <h2 className="text-3xl font-bold tracking-tight mb-6 text-black">Политика конфиденциальности</h2>
            <div className="space-y-4 text-sm text-neutral-600 leading-relaxed">
              <p><strong>1. Общие положения</strong><br/>Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных.</p>
              <p><strong>2. Основные понятия, используемые в Политике</strong><br/>Веб-сайт — совокупность графических и информационных материалов, а также программ для ЭВМ и баз данных, обеспечивающих их доступность в сети интернет.</p>
              <p><strong>3. Оператор может обрабатывать следующие персональные данные Пользователя:</strong><br/>• Имя<br/>• Номер телефона<br/>Вышеперечисленные данные далее по тексту Политики объединены общим понятием Персональные данные.</p>
              <p><strong>4. Цели обработки персональных данных</strong><br/>Цель обработки персональных данных Пользователя — информирование Пользователя посредством телефонных звонков; организация просмотра объекта недвижимости; предоставление доступа Пользователю к сервисам, информации и/или материалам, содержащимся на веб-сайте.</p>
              <p><strong>5. Использование файлов cookie</strong><br/>Веб-сайт использует файлы cookie для улучшения пользовательского опыта, сбора анонимной статистики и оптимизации работы сайта. Оставаясь на сайте, вы соглашаетесь с использованием файлов cookie. Вы всегда можете отключить их сохранение в настройках вашего браузера.</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const PlanModal = ({ src, onClose }: { src: string | null; onClose: () => void }) => {
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
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 md:px-12 bg-white" id="faq">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tighter mb-12 text-neutral-900">Частые вопросы</h2>
        <div className="bg-surface-container-low rounded-3xl p-8 md:p-12 shadow-sm">
          {faqData.map((faq, index) => (
            <div key={index} className="border-b border-neutral-200/60 last:border-0">
              <button
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg md:text-xl font-bold text-neutral-900 pr-8 group-hover:text-primary transition-colors">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 text-primary bg-primary/10 rounded-full p-2"
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 text-on-surface-variant leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const formatPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (!digits) return '';
  
  const isRussian = ['7', '8', '9'].includes(digits[0]);
  if (!isRussian) return '+' + digits.slice(0, 15);

  const startWith9 = digits[0] === '9';
  const prefix = startWith9 ? '+7' : (digits[0] === '8' ? '8' : '+7');
  const body = startWith9 ? digits : digits.slice(1);
  
  let formatted = prefix;
  if (body.length > 0) formatted += ' (' + body.substring(0, 3);
  if (body.length >= 4) formatted += ') ' + body.substring(3, 6);
  if (body.length >= 7) formatted += '-' + body.substring(6, 8);
  if (body.length >= 9) formatted += '-' + body.substring(8, 10);
  return formatted;
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [utmData, setUtmData] = useState<Record<string, string>>({});
  
  const [heroIndex, setHeroIndex] = useState(0);
  const [isHeroAutoPlay, setIsHeroAutoPlay] = useState(true);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setUtmData({
      utm_source: searchParams.get('utm_source') || '',
      utm_medium: searchParams.get('utm_medium') || '',
      utm_campaign: searchParams.get('utm_campaign') || '',
      utm_content: searchParams.get('utm_content') || '',
      utm_term: searchParams.get('utm_term') || '',
    });
  }, []);

  useEffect(() => {
    if (!isHeroAutoPlay) return;
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroPhotos.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [isHeroAutoPlay]);

  const handleNextHero = () => {
    setIsHeroAutoPlay(false);
    setHeroIndex((prev) => (prev + 1) % heroPhotos.length);
  };

  const handlePrevHero = () => {
    setIsHeroAutoPlay(false);
    setHeroIndex((prev) => (prev - 1 + heroPhotos.length) % heroPhotos.length);
  };

  const config = {
    PHONE: process.env.NEXT_PUBLIC_PHONE || 'телефон',
    PHONE_LINK: process.env.NEXT_PUBLIC_PHONE_LINK || 'tel:#',
    EMAIL: process.env.NEXT_PUBLIC_EMAIL || 'электронная почта',
    PHOTO_DRIVE_URL: process.env.NEXT_PUBLIC_PHOTO_DRIVE_URL || '#'
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: '' });

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      ...utmData
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setFormStatus({ type: 'success', message: result.message });
        (e.target as HTMLFormElement).reset();
        setPhone('');
        if (typeof (window as any).ym === 'function' && process.env.NEXT_PUBLIC_YANDEX_METRICA_ID) {
          (window as any).ym(Number(process.env.NEXT_PUBLIC_YANDEX_METRICA_ID), 'reachGoal', 'order_button');
        }
      } else {
        setFormStatus({ type: 'error', message: result.message || 'Произошла ошибка. Попробуйте позже.' });
      }
    } catch (error) {
      setFormStatus({ type: 'error', message: 'Не удалось отправить заявку. Проверьте соединение.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <PlanModal src={selectedPlan} onClose={() => setSelectedPlan(null)} />

      <header className="fixed top-0 w-full z-50">
        <div className="bg-primary text-white py-2 px-6 text-[10px] md:text-xs font-medium tracking-wide">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex gap-4 md:gap-8">
              <a href={config.PHONE_LINK} className="flex items-center gap-1.5 hover:text-tertiary-fixed transition-colors">
                <Phone size={12} /> {config.PHONE}
              </a>
            </div>
            <a href={`mailto:${config.EMAIL}`} className="flex items-center gap-1.5 hover:text-tertiary-fixed transition-colors">
              <Mail size={12} /> {config.EMAIL}
            </a>
          </div>
        </div>
        <div className="glass border-b border-neutral-100/20">
          <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
            <div className="text-xl font-bold tracking-tighter uppercase text-black">Дом у озера</div>
            
            <div className="hidden md:flex items-center gap-8">
              <NavItem href="#about">О проекте</NavItem>
              <NavItem href="#infrastructure">Инфраструктура</NavItem>
              <NavItem href="#characteristics">Характеристики</NavItem>
              <NavItem href="#faq">FAQ</NavItem>
              <NavItem href="#location">Локация</NavItem>
              <NavItem href="#contact-form">Контакты</NavItem>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="hidden sm:block bg-primary text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-neutral-800 hover:shadow-lg hover:scale-[1.005] active:scale-95 transition-all duration-70 ease-in-out"
              >
                Записаться на показ
              </button>
              <button 
                className="md:hidden p-2 text-black hover:scale-[1.005] active:scale-95 transition-all duration-70 ease-in-out"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </nav>

          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden bg-white border-b p-6 flex flex-col gap-4"
            >
              <NavItem href="#about">О проекте</NavItem>
              <NavItem href="#infrastructure">Инфраструктура</NavItem>
              <NavItem href="#characteristics">Характеристики</NavItem>
              <NavItem href="#faq">FAQ</NavItem>
              <NavItem href="#location">Локация</NavItem>
              <NavItem href="#contact-form">Контакты</NavItem>
              <button 
                onClick={() => {
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
              className="w-full bg-primary text-white px-5 py-3 rounded-md text-sm font-medium hover:bg-neutral-800 hover:shadow-lg hover:scale-[1.005] active:scale-95 transition-all duration-70 ease-in-out"
              >
                Записаться на показ
              </button>
            </motion.div>
          )}
        </div>
      </header>

      <main className="flex-grow relative">
        <section ref={heroRef} className="relative h-[870px] flex items-center justify-start overflow-hidden group">
          
          <motion.div 
            className="absolute inset-0 z-0 bg-black"
            style={{ y: heroImageY }}
          >
            <AnimatePresence>
              <motion.img 
                key={heroIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover" 
                src={heroPhotos[heroIndex]} 
                alt="Премиальный загородный дом 241 м² в КП Павловы озера"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none"></div>
          </motion.div>

          <button 
            onClick={handlePrevHero}
            className="absolute inset-y-0 left-0 w-24 md:w-32 z-20 flex items-center justify-start pl-4 md:pl-8 group/btn hover:bg-gradient-to-r hover:from-black/50 hover:to-transparent transition-all duration-500 ease-out cursor-pointer"
          >
            <ChevronLeft size={48} strokeWidth={1} className="text-white/30 group-hover/btn:text-white group-hover/btn:-translate-x-1 transition-all duration-300 drop-shadow-md" />
          </button>

          <button 
            onClick={handleNextHero}
            className="absolute inset-y-0 right-0 w-24 md:w-32 z-20 flex items-center justify-end pr-4 md:pr-8 group/btn hover:bg-gradient-to-l hover:from-black/50 hover:to-transparent transition-all duration-500 ease-out cursor-pointer"
          >
            <ChevronRight size={48} strokeWidth={1} className="text-white/30 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all duration-300 drop-shadow-md" />
          </button>
          
          <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-0 pointer-events-none">
            <motion.div style={{ y: heroTextY }} className="max-w-3xl pointer-events-auto">
              <span className="inline-block bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mb-6">
                Прямая продажа
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-[0.95] mb-6">
              Готовый дом 241&nbsp; м² в КП «Павловы озера»
              </h1>
              <p className="text-xl text-white/90 font-medium mb-4 max-w-xl leading-relaxed">
                Построен в 2025 году. Полная отделка и мебель.
              </p>
              <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-10">
                59 млн
              </div>
              <button 
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-primary hover:bg-neutral-100 px-8 py-4 rounded-md text-lg font-bold hover:shadow-lg hover:scale-[1.005] active:scale-95 transition-all duration-70 ease-in-out"
              >
                Записаться на показ
              </button>
            </motion.div>
          </div>
        </section>

        <section className="py-12 px-6 md:px-12 bg-surface" id="about">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard value="241 м²" label="Площадь дома" />
            <StatCard value="7,5 соток" label="Участок ИЖС" />
            <StatCard value="3 спальни" label="и 3 санузла" />
            <StatCard value="2025 год" label="год постройки" />
          </div>
        </section>

        <section className="py-12 px-6 md:px-12 bg-white" id="gallery">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-8 md:mb-12">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-neutral-900">Фотогалерея</h2>
                <p className="text-on-surface-variant text-lg">Погрузитесь в атмосферу вашего будущего дома</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="w-full md:w-auto"
              >
                <a 
                  href={config.PHOTO_DRIVE_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full md:w-auto inline-flex justify-center items-center gap-3 bg-primary text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-neutral-800 hover:scale-[1.005] active:scale-95 transition-all duration-70 shadow-sm hover:shadow-lg ease-in-out"
                >
                  Смотреть все 100+ фотографий на диске
                  <ExternalLink size={20} />
                </a>
              </motion.div>
            </div>
            
            <GallerySlider />
          </div>
        </section>

        <section className="py-24 px-6 md:px-12 bg-white" id="infrastructure">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            className="text-4xl font-bold tracking-tighter mb-12 text-neutral-900"
              >
                Инфраструктура и Локация
              </motion.h2>
              <ul className="space-y-8">
                <InfraItem 
                  icon={Car} 
                  title="20 км (25 мин) — до МКАД" 
                  description="Быстрый выезд на Новорижское шоссе" 
                  index={0}
                />
                <InfraItem 
                  icon={Train} 
                  title="2 км (7 мин) — до станции МЦД 'Нахабино'" 
                  description="Удобная связь с центром Москвы" 
                  index={1}
                />
                <InfraItem 
                  icon={ShoppingBag} 
                  title="5 минут — ТРК 'Павлово подворье'" 
                  description="Магазины, рестораны и фитнес-клуб" 
                  index={2}
                />
                <InfraItem 
                  icon={Waves} 
                  title="0 минут — Собственное озеро, пляж и лес" 
                  description="Природа сразу за порогом дома" 
                  index={3}
                />
              </ul>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="h-[500px] bg-surface-container rounded-2xl overflow-hidden relative group"
            >
              <img 
                className="w-full h-full object-cover" 
                src="/images/infrastructure.webp" 
                alt="Собственное озеро, пляж и инфраструктура поселка"
              />
            </motion.div>
          </div>
        </section>

        <section className="py-24 px-6 md:px-12 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tighter mb-12 text-neutral-900">Участок и Двор</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard icon={Car} title="Навес на 2 авто" />
              <FeatureCard icon={Utensils} title="BBQ-зона" />
              <FeatureCard icon={Warehouse} title="Хозблок" />
              <FeatureCard icon={Trees} title="Ландшафт" />
            </div>
          </div>
        </section>

        <section className="py-24 px-6 md:px-12 bg-primary text-white" id="characteristics">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold tracking-tighter mb-16">Инженерные решения</h2>
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
              <TechItem icon={Wind} text="Вентиляция с рекуперацией и кондиционирование" />
              <TechItem icon={FlameKindling} text="Тёплые полы во всем доме" />
              <TechItem icon={VolumeX} text="Акустическая стяжка" />
              <TechItem icon={Settings} text="Магистральный газ, централизованное водоснабжение и канализация" />
            </div>
          </div>
        </section>

        <section className="py-24 px-6 md:px-12 bg-surface-container-low overflow-hidden relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <h2 className="text-4xl font-bold tracking-tighter text-neutral-900">Планировка</h2>
              <div className="text-on-surface-variant max-w-md text-left md:text-right">
                Продуманное зонирование: Master-bedroom с гардеробной, 2 детские комнаты и кабинет для работы.
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div 
                  className="bg-white shadow-sm rounded-2xl p-4 h-[500px] flex items-center justify-center cursor-pointer group relative overflow-hidden transition-all duration-70 hover:shadow-xl hover:-translate-y-1"
                  onClick={() => setSelectedPlan('/images/plan-1.webp')}
                >
                  <img 
                    className="max-h-full w-auto group-hover:scale-[1.005] transition-transform duration-700 ease-in-out" 
                    src="/images/plan-1.webp" 
                    alt="Планировка 1 этажа: кухня-гостиная, гостевой санузел, котельная"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
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
                  className="bg-white shadow-sm rounded-2xl p-4 h-[500px] flex items-center justify-center cursor-pointer group relative overflow-hidden transition-all duration-70 hover:shadow-xl hover:-translate-y-1"
                  onClick={() => setSelectedPlan('/images/plan-2.webp')}
                >
                  <img 
                    className="max-h-full w-auto mix-blend-multiply group-hover:scale-[1.005] transition-transform duration-700 ease-in-out" 
                    src="/images/plan-2.webp" 
                    alt="Планировка 2 этажа: 3 спальни, кабинет, 2 ванные комнаты"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
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

        <FAQSection />

        <section className="py-24 px-6 md:px-12 bg-surface" id="location">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 rounded-3xl overflow-hidden h-[500px] relative bg-neutral-200 group">
              <iframe 
                src="https://yandex.ru/map-widget/v1/?ll=37.124370,55.828157&z=16&pt=37.124370,55.828157,pm2rdm" 
                allowFullScreen={true}
                className="w-full h-full border-0 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              ></iframe>
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl max-w-xs">
            <h4 className="font-bold text-lg mb-1 text-neutral-900">Адрес объекта</h4>
                <p className="text-on-surface-variant leading-relaxed select-all cursor-text" title="Кликните, чтобы выделить">Московская область, д. Исаково, Лесная улица, 8.</p>
              </div>
            </div>
            <div id="contact-form" className="bg-white p-10 rounded-3xl shadow-sm">
          <h3 className="text-2xl font-bold tracking-tight mb-8 text-neutral-900">Связаться с нами</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Ваше имя</label>
                  <input name="name" required className="architectural-input text-neutral-900" placeholder="Александр" type="text" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Номер телефона</label>
                  <input 
                    name="phone" 
                    required 
                    className="architectural-input text-neutral-900" 
                    placeholder="+7 (900) 000-00-00" 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                    maxLength={18}
                  />
                </div>
                
                {formStatus.type && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl text-sm font-medium ${
                      formStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {formStatus.message}
                  </motion.div>
                )}

                <button 
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-neutral-800 hover:scale-[1.005] active:scale-95 hover:shadow-lg transition-all duration-70 ease-in-out mt-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить'}
                </button>
              </form>
              <p className="text-[10px] text-center text-on-surface-variant mt-6 leading-relaxed">
                Нажимая на кнопку, вы соглашаетесь с <button type="button" onClick={() => setIsPrivacyOpen(true)} className="underline hover:text-primary transition-colors">Политикой конфиденциальности</button>.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-20 px-6 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 mb-16">
          <div className="space-y-6">
            <div className="text-2xl font-bold tracking-tighter uppercase">Дом у озера</div>
            <p className="text-neutral-400 max-w-xs leading-relaxed">
              Премиальная загородная недвижимость для тех, кто ценит комфорт, тишину и безупречный стиль.
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-500">Навигация</h4>
            <div className="flex flex-col gap-3">
              <a className="hover:text-tertiary-fixed transition-colors" href="#about">О проекте</a>
              <a className="hover:text-tertiary-fixed transition-colors" href="#gallery">Галерея</a>
              <a className="hover:text-tertiary-fixed transition-colors" href="#infrastructure">Инфраструктура</a>
              <a className="hover:text-tertiary-fixed transition-colors" href="#characteristics">Характеристики</a>
              <a className="hover:text-tertiary-fixed transition-colors" href="#faq">FAQ</a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-neutral-500">Контакты</h4>
            <div className="space-y-4">
            <a href={config.PHONE_LINK} className="flex items-center gap-3 hover:text-tertiary-fixed transition-colors">
              <Phone size={18} className="text-primary" /> {config.PHONE}
              </a>
            <a href={`mailto:${config.EMAIL}`} className="flex items-center gap-3 hover:text-tertiary-fixed transition-colors">
              <Mail size={18} className="text-primary" /> {config.EMAIL}
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-neutral-500">
          <div>
            © 2024 Дом у озера премиум. Все права защищены.
          </div>
          <div className="flex gap-8">
            <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-white transition-colors">Политика конфиденциальности</button>
            <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-white transition-colors">Cookies</button>
          </div>
        </div>
      </footer>
    </div>
  );
}