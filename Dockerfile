# Используем официальный Node.js образ
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json в рабочую директорию
COPY package*.json ./

# Очистка кеша npm и установка зависимостей с игнорированием ошибок
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

# Копируем все остальные файлы в рабочую директорию
COPY . .

# Команда для запуска приложения
CMD ["npm", "start"]
