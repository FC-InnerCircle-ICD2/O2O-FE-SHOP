FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./
COPY . .

RUN yarn install

EXPOSE 3001

CMD ["yarn", "dev"]
