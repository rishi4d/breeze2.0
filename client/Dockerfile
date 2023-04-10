FROM node:18-alpine as build

WORKDIR /app

COPY . .

RUN npm ci --legacy-peer-deps

RUN npm run build

FROM nginx:1.23.0-alpine as production

ENV NODE_ENV production

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/

EXPOSE 1000

CMD ["nginx", "-g", "daemon off;"]






