FROM node:alpine

COPY . /app
WORKDIR /app
RUN npm install

ENV PORT=8080
EXPOSE $PORT

CMD node app.js