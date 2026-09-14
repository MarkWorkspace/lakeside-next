import { Phone, Mail } from "lucide-react";
import { PrivacyTrigger } from "./ModalContext";

interface FooterProps {
  phone: string;
  phoneLink: string;
  email: string;
}

export default function Footer({ phone, phoneLink, email }: FooterProps) {
  return (
    <footer className="w-full py-20 px-6 bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 mb-16">
        <div className="space-y-6">
          <div className="text-2xl font-bold tracking-tighter uppercase">Дом у озера</div>
          <p className="text-neutral-400 max-w-xs leading-relaxed">
            Премиальная загородная недвижимость для тех, кто ценит комфорт, тишину и безупречный стиль.
          </p>
        </div>
        
        <div className="space-y-6">
          <p className="text-sm font-bold uppercase tracking-widest text-neutral-500">Навигация</p>
          <div className="flex flex-col gap-3">
            <a className="hover:text-tertiary-fixed transition-colors" href="#about">О проекте</a>
            <a className="hover:text-tertiary-fixed transition-colors" href="#gallery">Галерея</a>
            <a className="hover:text-tertiary-fixed transition-colors" href="#infrastructure">Инфраструктура</a>
            <a className="hover:text-tertiary-fixed transition-colors" href="#characteristics">Характеристики</a>
            <a className="hover:text-tertiary-fixed transition-colors" href="#faq">FAQ</a>
            <a className="hover:text-tertiary-fixed transition-colors" href="#location">Локация</a>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-sm font-bold uppercase tracking-widest text-neutral-500">Контакты</p>
          <div className="space-y-4">
            <a href={phoneLink} className="flex items-center gap-3 hover:text-tertiary-fixed transition-colors">
              <Phone size={18} className="text-primary" /> {phone}
            </a>
            <a href={`mailto:${email}`} className="flex items-center gap-3 hover:text-tertiary-fixed transition-colors">
              <Mail size={18} className="text-primary" /> {email}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-neutral-500">
        <div>
          © 2025 Дом у озера премиум. Все права защищены.
        </div>
        <div className="flex gap-8">
          <PrivacyTrigger className="hover:text-white transition-colors cursor-pointer">
            Политика конфиденциальности
          </PrivacyTrigger>
          <PrivacyTrigger className="hover:text-white transition-colors cursor-pointer">
            Cookies
          </PrivacyTrigger>
        </div>
      </div>
    </footer>
  );
}
