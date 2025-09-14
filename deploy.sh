#!/bin/bash

echo "🚀 Начинаем деплой EduGuide..."

# Проверяем, что мы в корневой папке проекта
if [ ! -f "package.json" ]; then
    echo "❌ Запустите скрипт из корневой папки проекта"
    exit 1
fi

echo "📦 Собираем фронтенд..."
cd frontend
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Ошибка при сборке фронтенда"
    exit 1
fi
echo "✅ Фронтенд собран"

cd ..

echo "🔧 Проверяем бэкенд..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Ошибка при установке зависимостей бэкенда"
    exit 1
fi
echo "✅ Бэкенд готов"

cd ..

echo ""
echo "🎉 Готово к деплою!"
echo ""
echo "📋 Следующие шаги:"
echo "1. Загрузите код на GitHub"
echo "2. Деплойте бэкенд на Railway.app"
echo "3. Деплойте фронтенд на Vercel.com"
echo "4. Настройте переменные окружения"
echo ""
echo "📖 Подробные инструкции в файле DEPLOYMENT.md"
