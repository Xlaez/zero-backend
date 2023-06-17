FROM  node:alpine

RUN mkdir -p /usr/src/zero-app 

WORKDIR /usr/src/zero-app

COPY package*.json yarn.lock ./

RUN npm install

RUN npm run build:tsc

COPY . .

EXPOSE 6300

CMD ["npm", "start"]