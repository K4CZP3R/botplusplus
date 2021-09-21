FROM node:16

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./

COPY src ./src

RUN npm i
RUN npm run build

FROM node:16
WORKDIR /app
COPY package.json ./
COPY .env ./
RUN npm i
COPY --from=0 /app/dist .
CMD ["node", "index.js"]
