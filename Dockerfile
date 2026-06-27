FROM node:lts-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i

COPY index.js ./
COPY commands/quote.js ./commands/

USER 1000

CMD [ "npm", "run", "prod" ]