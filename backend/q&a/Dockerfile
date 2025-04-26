FROM node:22-alpine

WORKDIR /test2

COPY package*.json ./

RUN npm install
RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["node", "test1.js"]
