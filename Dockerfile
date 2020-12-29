FROM node:12.20.0-buster-slim as app
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
COPY . /usr/src/mymaven
WORKDIR /usr/src/mymaven
RUN cnpm i && npm run build:dll && npm run build:prod

FROM nginx:alpine
COPY --from=app /usr/src/mymaven/dist /usr/share/nginx/html
COPY default.conf.template /etc/nginx/templates/