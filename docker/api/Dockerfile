FROM node:24-alpine

WORKDIR /app

COPY api/package*.json ./
RUN npm i

COPY api .

RUN node ace build

EXPOSE 3333

CMD ["sh", "-c", "node ace migration:run --force && node ace db:seed && node build/bin/server.js"]