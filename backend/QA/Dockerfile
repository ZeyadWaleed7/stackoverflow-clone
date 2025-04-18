FROM node:14.17.0-alpine

WORKDIR /test2

COPY package*.json ./

RUN npm install
RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["node", "test2.js"]
