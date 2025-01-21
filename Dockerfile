# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./
RUN rm -rf node_modules package-lock.json

# Очистка кеша и установка зависимостей
RUN npm cache clean --force
RUN npm install --no-cache --legacy-peer-deps

# Копируем все остальные файлы в контейнер
COPY . .

# Команда для запуска приложения
CMD ["npm", "start"]
