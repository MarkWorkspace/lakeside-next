import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, utm_source, utm_medium, utm_campaign, utm_content, utm_term } = body;

    // Базовая валидация
    if (!name || !phone) {
      return NextResponse.json(
        { message: 'Пожалуйста, заполните все поля' },
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

    // Отправляем данные в n8n
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name, 
        phone, 
        source: 'Lakeside Landing',
        utm_source,
        utm_medium,
        utm_campaign,
        utm_content,
        utm_term
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
