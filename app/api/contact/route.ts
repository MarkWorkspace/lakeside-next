import { NextResponse } from 'next/server';
import { validateAndClassifyPhone } from '@/app/lib/phoneValidation';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      name, 
      phone, 
      website, 
      fillTimeMs,
      smartCaptchaToken,
      ymClientId,
      utm_source, 
      utm_medium, 
      utm_campaign, 
      utm_content, 
      utm_term 
    } = body;

    // 1. Honeypot: если скрытое поле заполнено, это бот — отвечаем 200, но reachGoal: false и в n8n не шлем!
    if (website) {
      return NextResponse.json(
        { message: 'Заявка успешно отправлена!', reachGoal: false },
        { status: 200 }
      );
    }

    // 2. Time-trap: проверка скорости заполнения формы
    // Если форма заполнена быстрее 1.2 секунд (1200мс), это либо бот, либо браузерное автозаполнение.
    // Защита бюджета: в Яндекс.Метрику reachGoal НЕ отправляем!
    // Защита продаж: заявку в n8n ВСЕ РАВНО сохраняем с меткой fast_fill: true, чтобы не потерять реального покупателя!
    const isFastFill = typeof fillTimeMs === 'number' && fillTimeMs < 1200;
    if (isFastFill) {
      console.warn(`[Anti-Spam] Быстрая отправка формы (${fillTimeMs}мс) — reachGoal будет отключен, заявка сохраняется`);
    }

    // 3. Проверка Яндекс SmartCaptcha (если на сервере задан секретный ключ)
    const captchaServerKey = process.env.SMARTCAPTCHA_SERVER_KEY;
    if (captchaServerKey) {
      if (!smartCaptchaToken || typeof smartCaptchaToken !== 'string') {
        return NextResponse.json(
          { message: 'Пожалуйста, подтвердите, что вы не робот' },
          { status: 400 }
        );
      }

      const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '';
      const captchaUrl = `https://smartcaptcha.yandexcloud.net/validate?secret=${encodeURIComponent(captchaServerKey)}&token=${encodeURIComponent(smartCaptchaToken)}&ip=${encodeURIComponent(clientIp)}`;

      try {
        const captchaResponse = await fetch(captchaUrl, {
          method: 'GET',
          signal: AbortSignal.timeout(5000),
        });
        const captchaData = await captchaResponse.json();

        if (captchaData.status !== 'ok') {
          console.warn('[Anti-Spam] Ошибка валидации SmartCaptcha:', captchaData);
          return NextResponse.json(
            { message: 'Проверка безопасности не пройдена. Пожалуйста, обновите капчу.' },
            { status: 400 }
          );
        }
      } catch (captchaErr) {
        console.error('[Anti-Spam] Сбой при запросе к серверу SmartCaptcha:', captchaErr);
        // При сетевом сбое серверов капчи не блокируем пользователя намертво, но логируем
      }
    }

    // 4. Проверка обязательных полей
    if (typeof name !== 'string' || typeof phone !== 'string') {
      return NextResponse.json(
        { message: 'Пожалуйста, заполните все обязательные поля' },
        { status: 400 }
      );
    }

    const trimmedName = name.trim().slice(0, 100);
    if (trimmedName.length < 2) {
      return NextResponse.json(
        { message: 'Пожалуйста, укажите корректное имя' },
        { status: 400 }
      );
    }

    // 5. Валидация номера телефона и классификация региона (Москва / МО vs Другие регионы)
    const phoneClassification = validateAndClassifyPhone(phone);
    if (!phoneClassification.isValid) {
      return NextResponse.json(
        { message: phoneClassification.error || 'Пожалуйста, укажите корректный номер телефона РФ' },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error('N8N_WEBHOOK_URL не задан в переменных окружения');
      return NextResponse.json(
        { message: 'Ошибка сервера: вебхук не настроен' },
        { status: 500 }
      );
    }

    // 6. Отправка данных в n8n с метками региона и ClientID
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(7000),
      body: JSON.stringify({ 
        name: trimmedName, 
        phone: phoneClassification.fullPhone, 
        is_moscow_region: phoneClassification.isMoscowRegion,
        is_fast_fill: isFastFill,
        ym_client_id: typeof ymClientId === 'string' ? ymClientId.slice(0, 100) : '',
        source: 'Lakeside Landing',
        fill_time_ms: typeof fillTimeMs === 'number' ? fillTimeMs : null,
        utm_source: typeof utm_source === 'string' ? utm_source.slice(0, 100) : '',
        utm_medium: typeof utm_medium === 'string' ? utm_medium.slice(0, 100) : '',
        utm_campaign: typeof utm_campaign === 'string' ? utm_campaign.slice(0, 100) : '',
        utm_content: typeof utm_content === 'string' ? utm_content.slice(0, 100) : '',
        utm_term: typeof utm_term === 'string' ? utm_term.slice(0, 100) : '',
      }),
    });

    if (!response.ok) {
      throw new Error(`Ошибка n8n: ${response.statusText}`);
    }

    // 7. Возврат результата:
    // reachGoal: true ТОЛЬКО если номер относится к Московскому региону И не было сверхбыстрого заполнения
    // Для остальных регионов/быстрых заполнений заявка принята в CRM, но Яндекс Метрика НЕ списывает деньги.
    const shouldFireGoal = phoneClassification.isMoscowRegion && !isFastFill;

    return NextResponse.json({ 
      message: 'Заявка успешно отправлена!',
      reachGoal: shouldFireGoal,
      isMoscowRegion: phoneClassification.isMoscowRegion,
      fastFill: isFastFill
    }, { status: 200 });

  } catch (error) {
    console.error('Ошибка отправки заявки:', error);
    return NextResponse.json({ message: 'Ошибка при отправке. Попробуйте позже.' }, { status: 500 });
  }
}
