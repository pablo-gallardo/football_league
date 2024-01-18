FROM node:18-alpine as builder

WORKDIR /app/

COPY src/ /app/src
COPY package*.json /app/
RUN npm install

COPY . .
RUN npm run build

FROM nginx

RUN rm -rf /etc/nginx/conf.d
RUN rm -rf /etc/nginx/default.conf
COPY nginx/conf/default.conf /etc/nginx/nginx.conf
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]