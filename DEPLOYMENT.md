# 🚀 Инструкции по деплою EduGuide

## 📋 Что нужно сделать

### 1. Деплой бэкенда на Railway

1. **Перейдите на [Railway.app](https://railway.app)**
2. **Войдите через GitHub**
3. **Создайте новый проект** → "Deploy from GitHub repo"
4. **Выберите ваш репозиторий** и папку `backend`
5. **Добавьте переменные окружения:**
   ```
   SUPABASE_URL=https://kxxpaaepxckfjofnqouo.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4eHBhYWVweGNrZmpvZm5xb3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NTU5MDUsImV4cCI6MjA3MzQzMTkwNX0.sXuOJYT9FDUFmnMAARkyXPoM-75v3HHXMhS3_rNchlk
   JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production
   JWT_EXPIRES_IN=7d
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=pavel.strelnykoov@gmail.com
   SMTP_PASS=rcgr wtma gydb ytsk
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.vercel.app
   TOTP_SECRET=your-totp-secret-key
   ```
6. **Дождитесь деплоя** и скопируйте URL бэкенда

### 2. Деплой фронтенда на Vercel

1. **Перейдите на [Vercel.com](https://vercel.com)**
2. **Войдите через GitHub**
3. **Создайте новый проект** → "Import Git Repository"
4. **Выберите ваш репозиторий** и папку `frontend`
5. **Добавьте переменную окружения:**
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```
6. **Дождитесь деплоя** и скопируйте URL фронтенда

### 3. Обновите URL в бэкенде

1. **Вернитесь в Railway**
2. **Обновите переменную `FRONTEND_URL`** на URL вашего фронтенда
3. **Перезапустите деплой**

## ✅ Готово!

Ваше приложение будет доступно по адресу фронтенда!

## 🔧 Дополнительные настройки

### Supabase
- База данных уже настроена
- Все таблицы созданы
- API ключи уже добавлены

### Email
- Настроен Gmail SMTP
- Пароль приложения уже создан

### Безопасность
- JWT токены настроены
- CORS настроен для production
- Rate limiting включен

## 🐛 Если что-то не работает

1. **Проверьте логи** в Railway и Vercel
2. **Убедитесь, что все переменные окружения** добавлены
3. **Проверьте, что Supabase** доступен
4. **Убедитесь, что URL'ы** правильно настроены
