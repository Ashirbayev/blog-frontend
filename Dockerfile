FROM node:16

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY package*.json ./
RUN npm cache clean --force
RUN npm cache clean --force

RUN npm install --force

# Копируем весь проект
COPY . .

# Запускаем приложение
CMD ["npm", "start"]
