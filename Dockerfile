# Используем официальный Node.js образ
FROM node:16
ENV HOST 0.0.0.0

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json в рабочую директорию
COPY package*.json ./

# Очистка кеша npm и установка зависимостей
RUN npm cache clean --force
RUN npm install

# Копируем все остальные файлы в рабочую директорию
COPY . .

# Команда для запуска приложения
CMD ["npm", "start"]
