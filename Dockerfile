FROM node:12-alpine3.10 as node-image

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# copy app to nginx
FROM nginx:1.19.10-alpine
ARG PORT
RUN echo $PORT

COPY --from=node-image /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
