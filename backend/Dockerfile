# ─── Stage 1: install + lint + test ───────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

# Copier le code source ET les tests (avant dockerignore)
COPY server.js .
COPY test/ ./test/
COPY .eslintrc.json .

RUN npm run lint || true
RUN npm test

# ─── Stage 2: production ──────────────────────────────────────────────────────
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

# Copier uniquement le code de production depuis le builder
COPY --from=builder /app/server.js .

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000
CMD ["node", "server.js"]

# Métadonnées de l'image
LABEL maintainer="Badis91 <badis91@efrei.fr>"
LABEL version="1.0.0"
LABEL description="VitalSync Backend API"
