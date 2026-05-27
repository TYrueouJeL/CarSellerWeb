FROM node:24-alpine

WORKDIR /app

COPY web/package*.json ./
RUN npm i

COPY web .

ARG VITE_API_URL=/api/
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]