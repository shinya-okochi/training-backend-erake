FROM node:18

ENV PORT 8080
ENV HOST 0.0.0.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "node", "./dist/server.js" ]
