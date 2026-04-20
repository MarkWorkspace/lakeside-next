"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function PrivacyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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
}