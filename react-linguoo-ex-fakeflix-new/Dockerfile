FROM node:12.18-alpine3.9 AS build

RUN mkdir -p /usr/src/web
WORKDIR /usr/src/web
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

### Stage 2: Run ###
FROM nginx:1.17.1-alpine AS prod-stage
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /usr/src/web/build .
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
