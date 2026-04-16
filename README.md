# Дом у озера — Премиум Лендинг (Next.js)

Премиальный лендинг для продажи загородной недвижимости. Обновлен и перенесен на современный стек: Next.js (App Router), TailwindCSS, Framer Motion. 
Включает Server-Side Rendering (SSR) для идеального SEO и оптимизации.

## Требования

- Node.js (рекомендуется v18 или выше)

## Установка и запуск

1. Установите зависимости:
   ```bash
   npm install
   ```

2. Создайте файл `.env.local` в корне проекта и заполните его необходимыми данными (см. раздел "Конфигурация").

3. Запустите проект в режиме разработки:
   ```bash
   npm run dev
   ```

## Docker
Для запуска в production среде с помощью Docker:
```bash
docker build -t lakeside-landing .
docker run -p 3000:3000 --env-file .env.local lakeside-landing
```

## Конфигурация (.env.local)

```env
NEXT_PUBLIC_PHONE="+7 (900) 000-00-00"
NEXT_PUBLIC_PHONE_LINK="tel:+79000000000"
NEXT_PUBLIC_EMAIL="info@lakeside-estate.ru"
NEXT_PUBLIC_SITE_URL="https://your-domain.ru"
NEXT_PUBLIC_PHOTO_DRIVE_URL="https://your-cloud-drive-link.com/photos"
NEXT_PUBLIC_YANDEX_METRICA_ID="12345678"

# Серверный Webhook (скрыт от браузера)
N8N_WEBHOOK_URL="https://your-n8n-instance.com/webhook/contact"
```