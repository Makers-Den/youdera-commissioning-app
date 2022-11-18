# Install deps and rebuild the source code only when needed
FROM node:16-alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Due to the turbo monorepo we have a single yarn.lock file, this leads to some inefficiencies.
# We can optimize in the future with turbo prune: https://turbo.build/blog/turbo-0-4-0
COPY ./yarn.lock ./turbo.json ./package.json .

RUN mkdir -p apps
COPY apps/commissioning/ apps/commissioning/
COPY packages/ packages/

RUN yarn install ---frozen-lockfile

# Next.js collects anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
# Disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir /app/commissioning

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing

COPY --from=builder /app/apps/commissioning/public ./commissioning/public
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/apps/commissioning/.next/standalone ./commissioning
COPY --from=builder --chown=nextjs:nodejs /app/apps/commissioning/.next/static ./commissioning/.next/static

COPY  apps/commissioning/.env.prod /app/commissioning/.env

USER nextjs

EXPOSE 3000

ENV PORT 3000

WORKDIR /app/commissioning

CMD ["node", "server.js"]