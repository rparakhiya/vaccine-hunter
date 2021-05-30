FROM node:14 as build

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:latest as final

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
