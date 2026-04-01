# =============================================================================
# Multi-stage build — Pourquoi deux stages ?
#
# SÉCURITÉ : Le stage "builder" contient les devDependencies (Jest, ESLint,
# supertest), les fichiers de test et les outils de build. Ces éléments ne
# doivent JAMAIS se retrouver en production : ils augmentent la surface d'attaque
# (vulnérabilités dans les paquets de dev) et peuvent exposer du code sensible.
# Le stage "production" repart d'une image vierge et ne copie QUE le binaire
# final, garantissant qu'aucun outil de dev n'est embarqué.
#
# TAILLE D'IMAGE : node:20-alpine avec toutes les devDependencies pèse ~450 MB.
# L'image de production finale (sans devDeps, sans tests) pèse ~202 MB, soit
# une réduction de plus de 55 %. Une image plus légère = téléchargement plus
# rapide, démarrage plus rapide, moins de stockage sur le registry.
# =============================================================================

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
