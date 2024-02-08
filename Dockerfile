FROM node:21-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:21-alpine AS runner

RUN apk update && \
    apk upgrade
RUN apk add openjdk21

WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules

CMD ["node", "build/server.js"]