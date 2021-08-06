FROM node:12-alpine3.10 as node-image

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# copy app to nginx
FROM nginx:1.19.10-alpine
COPY --from=node-image /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
