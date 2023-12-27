FROM node:20-alpine

WORKDIR /wallet-app

COPY package.json .
COPY prisma ./prisma
COPY public ./public
COPY dist ./dist

RUN npm i --omit=dev
RUN npx prisma generate

ENV NODE_LOCAL_PORT=8080
ENV ETHERSCAN_APIKEY="NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY"
ENV DATABASE_URL=postgres://cklwnpuw:qlfRv6dWbHwofhHw7actJzJmOxpFOGe8@drona.db.elephantsql.com/cklwnpuw

CMD npx prisma migrate deploy && npm run start:prod