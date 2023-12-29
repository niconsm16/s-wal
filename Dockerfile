FROM node:20-alpine

WORKDIR /wallet-app

COPY package.json .
COPY prisma ./prisma
COPY public ./public
COPY dist ./dist

RUN npm i --omit=dev
RUN npx prisma generate

ENV NODE_LOCAL_PORT=8080
ENV ETHERSCAN_APIKEY=""
ENV DATABASE_URL=""

CMD npx prisma migrate deploy && npm run start:prod
