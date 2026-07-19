FROM oven/bun:1.2.8-debian AS deps

WORKDIR /repo

COPY package.json bun.lock ./
COPY apps/backend/package.json apps/backend/package.json
COPY apps/frontend/package.json apps/frontend/package.json
RUN bun install --frozen-lockfile

FROM oven/bun:1.2.8-debian AS builder

RUN apt-get update && apt-get install -y --no-install-recommends openssl \
	&& rm -rf /var/lib/apt/lists/*

WORKDIR /repo
COPY --from=deps /repo/node_modules ./node_modules
COPY package.json bun.lock ./
COPY apps/backend ./apps/backend

WORKDIR /repo/apps/backend
RUN bun run build

FROM node:22-slim AS runner

RUN apt-get update && apt-get install -y --no-install-recommends openssl \
	&& rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
WORKDIR /repo/apps/backend

COPY --from=builder --chown=node:node /repo/node_modules /repo/node_modules
COPY --from=builder --chown=node:node /repo/apps/backend/dist ./dist
COPY --from=builder --chown=node:node /repo/apps/backend/prisma ./prisma
COPY --from=builder --chown=node:node /repo/apps/backend/prisma.config.ts ./prisma.config.ts
COPY --from=builder --chown=node:node /repo/apps/backend/package.json ./package.json

RUN mkdir -p uploads && chown -R node:node /repo/apps/backend
USER node

EXPOSE 4200

CMD ["sh", "-c", "npx prisma db push && node dist/src/main"]
