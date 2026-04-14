# 1. Базовый образ
FROM node:18-alpine AS base

# 2. Установка зависимостей (кэшируется, если package.json не менялся)
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# 3. Сборка проекта
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Если у вас есть файл .env.production, он скопируется командой COPY . . выше.
# Если вы передаете переменные через CI/CD, раскомментируйте ARG ниже:
# ARG NEXT_PUBLIC_PHONE
# ARG NEXT_PUBLIC_PHONE_LINK
# ARG NEXT_PUBLIC_EMAIL

RUN npm run build

# 4. Production образ, копируем только скомпилированные файлы
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Автоматическое копирование файлов из standalone сборки (шаг 1)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]