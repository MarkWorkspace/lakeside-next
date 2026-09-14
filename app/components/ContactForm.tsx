"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion } from "motion/react";
import SmartCaptcha from "./SmartCaptcha";
import { useModal } from "./ModalContext";

const formatPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  
  const isRussian = ["7", "8", "9"].includes(digits[0]);
  if (!isRussian) return "+" + digits.slice(0, 15);

  const startWith9 = digits[0] === "9";
  const prefix = startWith9 ? "+7" : (digits[0] === "8" ? "8" : "+7");
  const body = startWith9 ? digits : digits.slice(1);
  
  let formatted = prefix;
  if (body.length > 0) formatted += " (" + body.substring(0, 3);
  if (body.length >= 4) formatted += ") " + body.substring(3, 6);
  if (body.length >= 7) formatted += "-" + body.substring(6, 8);
  if (body.length >= 9) formatted += "-" + body.substring(8, 10);
  return formatted;
};

export default function ContactForm() {
  const { openPrivacyModal } = useModal();
  const [phone, setPhone] = useState("");
  const [formStatus, setFormStatus] = useState<{ type: "success" | "error" | null; message: string }>({ 
    type: null, 
    message: "" 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [smartCaptchaToken, setSmartCaptchaToken] = useState("");
  const [formInteractionTime, setFormInteractionTime] = useState<number | null>(null);
  const [utmData, setUtmData] = useState<Record<string, string>>({});

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setUtmData({
      utm_source: searchParams.get("utm_source") || "",
      utm_medium: searchParams.get("utm_medium") || "",
      utm_campaign: searchParams.get("utm_campaign") || "",
      utm_content: searchParams.get("utm_content") || "",
      utm_term: searchParams.get("utm_term") || "",
    });
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    const formData = new FormData(e.currentTarget);
    const rawPhone = (formData.get("phone") as string) || "";
    const phoneDigits = rawPhone.replace(/\D/g, "");

    if (phoneDigits.length < 10) {
      setFormStatus({ type: "error", message: "Пожалуйста, введите полный номер телефона" });
      setIsSubmitting(false);
      return;
    }

    // Если подключен клиентский ключ SmartCaptcha, требуем прохождения капчи
    if (process.env.NEXT_PUBLIC_SMARTCAPTCHA_CLIENT_KEY && !smartCaptchaToken) {
      setFormStatus({ type: "error", message: "Пожалуйста, подтвердите, что вы не робот" });
      setIsSubmitting(false);
      return;
    }

    const fillTimeMs = formInteractionTime ? Date.now() - formInteractionTime : null;

    // Получаем ym_client_id для передачи в n8n / CRM
    let ymClientId = "";
    try {
      const metrikaId = Number(process.env.NEXT_PUBLIC_YANDEX_METRICA_ID);
      const w = window as Window & { ym?: (id: number, action: string, cb: (id: string) => void) => void };
      if (typeof w.ym === "function" && metrikaId) {
        await new Promise<void>((resolve) => {
          try {
            w.ym?.(metrikaId, "getClientID", (id: string) => {
              ymClientId = id || "";
              resolve();
            });
            setTimeout(resolve, 300);
          } catch {
            resolve();
          }
        });
      }
    } catch {
      // Игнорируем ошибку получения ClientID
    }

    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      website: formData.get("website"),
      fillTimeMs,
      smartCaptchaToken,
      ymClientId,
      ...utmData
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setFormStatus({ type: "success", message: result.message });
        (e.target as HTMLFormElement).reset();
        setPhone("");
        setSmartCaptchaToken("");
        setFormInteractionTime(null);
        
        // ВЫЗЫВАЕМ ЦЕЛЬ В ЯНДЕКС.МЕТРИКУ ТОЛЬКО ЕСЛИ БЭКЕНД РАЗРЕШИЛ (reachGoal === true)
        if (result.reachGoal) {
          const w = window as Window & { ym?: (id: number, action: string, goal: string) => void };
          if (typeof w.ym === "function" && process.env.NEXT_PUBLIC_YANDEX_METRICA_ID) {
            w.ym(Number(process.env.NEXT_PUBLIC_YANDEX_METRICA_ID), "reachGoal", "order_button");
          }
        }
      } else {
        setFormStatus({ type: "error", message: result.message || "Произошла ошибка. Попробуйте позже." });
      }
    } catch {
      setFormStatus({ type: "error", message: "Не удалось отправить заявку. Проверьте соединение." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-form" className="bg-white p-10 rounded-3xl shadow-sm">
      <h3 className="text-2xl font-bold tracking-tight mb-8 text-neutral-900">Связаться с нами</h3>
      <form 
        className="space-y-6" 
        onSubmit={handleSubmit}
        onFocus={() => {
          if (!formInteractionTime) {
            setFormInteractionTime(Date.now());
          }
        }}
      >
        {/* Honeypot поле для отсеивания спам-ботов */}
        <div className="hidden" aria-hidden="true">
          <input 
            type="text" 
            name="website" 
            tabIndex={-1} 
            autoComplete="off" 
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
            Ваше имя
          </label>
          <input 
            name="name" 
            required 
            className="architectural-input text-neutral-900" 
            placeholder="Александр" 
            type="text" 
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
            Номер телефона
          </label>
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

        <SmartCaptcha onSuccess={(token) => setSmartCaptchaToken(token)} />
        
        {formStatus.type && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl text-sm font-medium ${
              formStatus.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}
          >
            {formStatus.message}
          </motion.div>
        )}

        <button 
          disabled={isSubmitting}
          className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-neutral-800 hover:scale-[1.005] active:scale-95 hover:shadow-lg transition-all duration-70 ease-in-out mt-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none cursor-pointer"
        >
          {isSubmitting ? "Отправка..." : "Отправить"}
        </button>
      </form>
      <p className="text-[10px] text-center text-on-surface-variant mt-6 leading-relaxed">
        Нажимая на кнопку, вы соглашаетесь с{" "}
        <button 
          type="button" 
          onClick={openPrivacyModal} 
          className="underline hover:text-primary transition-colors cursor-pointer"
        >
          Политикой конфиденциальности
        </button>.
      </p>
    </div>
  );
}
