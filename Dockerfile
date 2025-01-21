FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install --no-cache

COPY . .

CMD ["npm", "start"]
