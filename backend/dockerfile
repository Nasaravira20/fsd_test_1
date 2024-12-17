FROM node:23.2.0

WORKDIR /web

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]