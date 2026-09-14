"use client";

import { useState, ReactNode } from "react";
import { Phone, Mail, Menu, X } from "lucide-react";
import { motion } from "motion/react";

interface HeaderProps {
  phone: string;
  phoneLink: string;
  email: string;
}

const NavItem = ({ 
  href, 
  onClick, 
  children 
}: { 
  href: string; 
  onClick?: () => void; 
  children: ReactNode;
}) => (
  <a 
    href={href} 
    onClick={onClick}
    className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium tracking-tight"
  >
    {children}
  </a>
);

export default function Header({ phone, phoneLink, email }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToContact = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50">
      <div className="bg-primary text-white py-2 px-6 text-[10px] md:text-xs font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-4 md:gap-8">
            <a href={phoneLink} className="flex items-center gap-1.5 hover:text-tertiary-fixed transition-colors">
              <Phone size={12} /> {phone}
            </a>
          </div>
          <a href={`mailto:${email}`} className="flex items-center gap-1.5 hover:text-tertiary-fixed transition-colors">
            <Mail size={12} /> {email}
          </a>
        </div>
      </div>
      <div className="glass border-b border-neutral-100/20">
        <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <a href="#" className="text-xl font-bold tracking-tighter uppercase text-black">
            Дом у озера
          </a>
          
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
              onClick={scrollToContact}
              className="hidden sm:block bg-primary text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-neutral-800 hover:shadow-lg hover:scale-[1.005] active:scale-95 transition-all duration-200 ease-out cursor-pointer"
            >
              Записаться на показ
            </button>
            <button 
              className="md:hidden p-2 text-black hover:scale-[1.005] active:scale-95 transition-all duration-200 ease-out cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Меню"
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
            <NavItem href="#about" onClick={() => setIsMenuOpen(false)}>О проекте</NavItem>
            <NavItem href="#infrastructure" onClick={() => setIsMenuOpen(false)}>Инфраструктура</NavItem>
            <NavItem href="#characteristics" onClick={() => setIsMenuOpen(false)}>Характеристики</NavItem>
            <NavItem href="#faq" onClick={() => setIsMenuOpen(false)}>FAQ</NavItem>
            <NavItem href="#location" onClick={() => setIsMenuOpen(false)}>Локация</NavItem>
            <NavItem href="#contact-form" onClick={() => setIsMenuOpen(false)}>Контакты</NavItem>
            <button 
              onClick={scrollToContact}
              className="w-full bg-primary text-white px-5 py-3 rounded-md text-sm font-medium hover:bg-neutral-800 hover:shadow-lg hover:scale-[1.005] active:scale-95 transition-all duration-200 ease-out cursor-pointer"
            >
              Записаться на показ
            </button>
          </motion.div>
        )}
      </div>
    </header>
  );
}
