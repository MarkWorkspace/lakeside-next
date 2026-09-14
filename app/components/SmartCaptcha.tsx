'use client';

import React, { useEffect, useRef, useState, useId } from 'react';

declare global {
  interface Window {
    smartCaptcha?: {
      render: (
        container: HTMLElement | string,
        params: {
          sitekey: string;
          callback: (token: string) => void;
          hl?: string;
          test?: boolean;
          webview?: boolean;
        }
      ) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
      destroy: (widgetId?: number) => void;
    };
    __smartCaptchaLoaded?: boolean;
    __smartCaptchaInitCallbacks?: Array<() => void>;
  }
}

interface SmartCaptchaProps {
  onSuccess: (token: string) => void;
  onReset?: () => void;
  className?: string;
}

export default function SmartCaptcha({ onSuccess, onReset, className = '' }: SmartCaptchaProps) {
  const containerId = useId().replace(/:/g, '_') + '_smartcaptcha';
  const widgetIdRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_SMARTCAPTCHA_CLIENT_KEY;

  useEffect(() => {
    if (!siteKey) {
      // Если ключ еще не настроен в .env, не блокируем форму
      return;
    }

    const initWidget = () => {
      if (!window.smartCaptcha) return;
      const el = document.getElementById(containerId);
      if (!el || widgetIdRef.current !== null) return;

      try {
        const id = window.smartCaptcha.render(containerId, {
          sitekey: siteKey,
          callback: (token: string) => {
            onSuccess(token);
          },
          hl: 'ru',
        });
        widgetIdRef.current = id;
      } catch (err) {
        console.error('Ошибка инициализации SmartCaptcha:', err);
      }
    };

    if (window.smartCaptcha) {
      setIsLoaded(true);
      initWidget();
      return;
    }

    if (!window.__smartCaptchaInitCallbacks) {
      window.__smartCaptchaInitCallbacks = [];
    }
    window.__smartCaptchaInitCallbacks.push(() => {
      setIsLoaded(true);
      initWidget();
    });

    const existingScript = document.getElementById('smartcaptcha-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'smartcaptcha-script';
      script.src = 'https://smartcaptcha.yandexcloud.net/captcha.js?render=onload&onload=__onSmartCaptchaLoad';
      script.defer = true;
      script.async = true;

      // Глобальный коллбек загрузки
      (window as unknown as Record<string, unknown>).__onSmartCaptchaLoad = () => {
        window.__smartCaptchaLoaded = true;
        window.__smartCaptchaInitCallbacks?.forEach((cb) => cb());
        window.__smartCaptchaInitCallbacks = [];
      };

      document.body.appendChild(script);
    }

    return () => {
      if (widgetIdRef.current !== null && window.smartCaptcha) {
        try {
          window.smartCaptcha.destroy(widgetIdRef.current);
        } catch {
          // Игнорируем ошибку при размонтировании
        }
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, containerId, onSuccess]);

  if (!siteKey) {
    return null;
  }

  return (
    <div className={`my-2 flex justify-center ${className}`}>
      <div id={containerId} />
    </div>
  );
}
