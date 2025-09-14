# 🚀 Деплой EduGuide на Vercel

## 📋 Пошаговая инструкция

### 1. Подготовка репозитория

1. **Создайте репозиторий на GitHub** (если еще не создан)
2. **Загрузите код** в репозиторий
3. **Убедитесь, что структура проекта правильная:**
   ```
   your-repo/
   ├── frontend/          # React приложение
   ├── backend/           # Node.js API
   └── README.md
   ```

### 2. Деплой бэкенда (API)

1. **Перейдите на [vercel.com](https://vercel.com)**
2. **Войдите через GitHub**
3. **Нажмите "New Project"**
4. **Выберите ваш репозиторий**
5. **Настройте проект:**
   - **Framework Preset:** Other
   - **Root Directory:** `backend`
   - **Build Command:** `npm run build`
   - **Output Directory:** (оставить пустым)
   - **Install Command:** `npm install`

6. **Добавьте переменные окружения:**
   ```
   SUPABASE_URL = https://kxxpaaepxckfjofnqouo.supabase.co
   SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4eHBhYWVweGNrZmpvZm5xb3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NTU5MDUsImV4cCI6MjA3MzQzMTkwNX0.sXuOJYT9FDUFmnMAARkyXPoM-75v3HHXMhS3_rNchlk
   JWT_SECRET = your-super-secret-jwt-key-here-change-this-in-production
   JWT_EXPIRES_IN = 7d
   SMTP_HOST = smtp.gmail.com
   SMTP_PORT = 587
   SMTP_USER = pavel.strelnykoov@gmail.com
   SMTP_PASS = rcgr wtma gydb ytsk
   NODE_ENV = production
   FRONTEND_URL = https://your-frontend-url.vercel.app
   TOTP_SECRET = your-totp-secret-key
   ```

7. **Нажмите "Deploy"**
8. **Скопируйте URL бэкенда** (например: `https://your-backend.vercel.app`)

### 3. Деплой фронтенда

1. **Создайте новый проект** в Vercel
2. **Выберите тот же репозиторий**
3. **Настройте проект:**
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

4. **Добавьте переменную окружения:**
   ```
   VITE_API_URL = https://your-backend.vercel.app
   ```

5. **Нажмите "Deploy"**
6. **Скопируйте URL фронтенда** (например: `https://your-frontend.vercel.app`)

### 4. Обновите URL в бэкенде

1. **Вернитесь к проекту бэкенда** в Vercel
2. **Перейдите в Settings → Environment Variables**
3. **Обновите `FRONTEND_URL`** на URL вашего фронтенда
4. **Перезапустите деплой**

## ✅ Готово!

Ваше приложение будет доступно по адресу фронтенда!

## 🔧 Проверка работы

1. **Откройте фронтенд** в браузере
2. **Попробуйте зарегистрироваться**
3. **Попробуйте войти в систему**
4. **Проверьте дашборд**

## 🐛 Если что-то не работает

1. **Проверьте логи** в Vercel Dashboard
2. **Убедитесь, что все переменные окружения** добавлены
3. **Проверьте, что Supabase** доступен
4. **Убедитесь, что URL'ы** правильно настроены

## 📱 Дополнительные настройки

### Домен
- Можете добавить собственный домен в настройках проекта

### SSL
- Vercel автоматически предоставляет SSL сертификаты

### CDN
- Vercel использует глобальную CDN для быстрой загрузки
