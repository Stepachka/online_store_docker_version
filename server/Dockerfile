# Multi-stage build for NestJS server
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

RUN npx prisma generate

COPY tsconfig*.json ./
COPY nest-cli.json ./

COPY . .

RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

# УБЕДИТЕСЬ ЧТО ts-node УСТАНОВЛЕН ДЛЯ СИДОВ!
RUN npm ci --only=production && \
  npm install --save-dev ts-node typescript @types/node && \
  npm cache clean --force

COPY --from=builder /app/dist ./dist
# КОПИРУЕМ СИДЫ И ИСХОДНИКИ НУЖНЫЕ ДЛЯ СИДИРОВАНИЯ
COPY --from=builder /app/src ./src
COPY --from=builder /app/prisma ./prisma

# Генерируем Prisma client
RUN npx prisma generate

EXPOSE 3000

# Команда теперь в docker-compose, поэтому просто запускаем приложение
CMD ["node", "dist/src/main.js"]