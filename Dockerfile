FROM node:14-alpine AS development
ENV NODE_ENV development
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN [ "npm", "run", "build" ]


FROM nginx:stable-alpine
COPY --from=development /app/build/ /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d