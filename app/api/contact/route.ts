import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, website, utm_source, utm_medium, utm_campaign, utm_content, utm_term } = body;

    // Honeypot: если скрытое поле заполнено, это бот — отвечаем 200, не дергая n8n
    if (website) {
      return NextResponse.json({ message: 'Заявка успешно отправлена!' }, { status: 200 });
    }

    // Проверка наличия и типов
    if (typeof name !== 'string' || typeof phone !== 'string') {
      return NextResponse.json(
        { message: 'Пожалуйста, заполните все обязательные поля' },
        { status: 400 }
      );
    }

    const trimmedName = name.trim().slice(0, 100);
    const trimmedPhone = phone.trim().slice(0, 30);
    const phoneDigits = trimmedPhone.replace(/\D/g, '');

    // Валидация: имя от 2 символов, в номере от 10 до 15 цифр
    if (trimmedName.length < 2 || phoneDigits.length < 10 || phoneDigits.length > 15) {
      return NextResponse.json(
        { message: 'Пожалуйста, укажите корректное имя и полный номер телефона' },
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

    // Отправляем данные в n8n с таймаутом 7 секунд
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(7000),
      body: JSON.stringify({ 
        name: trimmedName, 
        phone: trimmedPhone, 
        source: 'Lakeside Landing',
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

    return NextResponse.json({ message: 'Заявка успешно отправлена!' }, { status: 200 });
  } catch (error) {
    console.error('Ошибка отправки заявки:', error);
    return NextResponse.json({ message: 'Ошибка при отправке. Попробуйте позже.' }, { status: 500 });
  }
}
