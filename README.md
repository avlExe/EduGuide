# EduGuide - ИИ-помощник для выбора будущего

Современный веб-приложение для помощи выпускникам 9 класса в выборе дальнейшего образовательного пути.

## 🚀 Возможности

- **Профориентационное тестирование** - ИИ-анализ способностей и интересов
- **Персональные рекомендации** - индивидуальные советы по выбору направления
- **База учебных заведений** - актуальная информация о колледжах и лицеях
- **Поддержка родителей** - возможность отслеживать прогресс ребенка
- **Безопасность** - 2FA, подтверждение email/SMS, защита данных

## 🛠 Технологии

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- 2FA (TOTP)
- Nodemailer
- Bcrypt

## 📦 Установка и запуск

### Предварительные требования
- Node.js 18+
- MongoDB
- Git

### 1. Клонирование репозитория
```bash
git clone <repository-url>
cd ai-assistant
```

### 2. Установка зависимостей
```bash
# Установка зависимостей для всего проекта
npm install

# Или отдельно для frontend и backend
cd frontend && npm install
cd ../backend && npm install
```

### 3. Настройка окружения

Создайте файл `.env` в папке `backend` на основе `backend/env.example`:

```bash
cp backend/env.example backend/.env
```

Отредактируйте `backend/.env`:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/ai-assistant

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Email (для отправки уведомлений)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# App
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# 2FA
TOTP_SECRET=your-totp-secret-key
```

### 4. Запуск приложения

#### Режим разработки (рекомендуется)
```bash
# Запуск frontend и backend одновременно
npm run dev
```

#### Или отдельно:
```bash
# Терминал 1 - Backend
cd backend
npm run dev

# Терминал 2 - Frontend  
cd frontend
npm run dev
```

### 5. Доступ к приложению
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/api/health

## 📁 Структура проекта

```
ai-assistant/
├── frontend/                 # React приложение
│   ├── src/
│   │   ├── pages/           # Страницы приложения
│   │   │   ├── LandingPage.jsx
│   │   │   ├── AuthPage.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── components/      # Переиспользуемые компоненты
│   │   ├── utils/          # Утилиты
│   │   └── App.jsx
│   ├── public/             # Статические файлы
│   └── package.json
├── backend/                 # Node.js API
│   ├── src/
│   │   ├── routes/         # API маршруты
│   │   │   ├── auth.js     # Аутентификация
│   │   │   └── user.js     # Пользователи
│   │   ├── models/         # MongoDB модели
│   │   ├── middleware/     # Express middleware
│   │   └── utils/          # Утилиты
│   └── package.json
└── README.md
```

## 🔐 API Endpoints

### Аутентификация
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход
- `POST /api/auth/verify-email` - Подтверждение email
- `POST /api/auth/forgot-password` - Забыл пароль
- `POST /api/auth/reset-password` - Сброс пароля
- `POST /api/auth/setup-2fa` - Настройка 2FA
- `POST /api/auth/verify-2fa` - Подтверждение 2FA

### Пользователи
- `GET /api/user/profile` - Получить профиль
- `PUT /api/user/profile` - Обновить профиль
- `POST /api/user/test-result` - Сохранить результат теста
- `GET /api/user/test-results` - Получить результаты тестов
- `POST /api/user/recommendation` - Сохранить рекомендацию
- `GET /api/user/recommendations` - Получить рекомендации

## 🎨 Дизайн

Приложение использует современный дизайн с:
- Градиентными элементами
- Плавными анимациями
- Адаптивной версткой
- Интуитивным интерфейсом
- Поддержкой темной темы (планируется)

## 🔒 Безопасность

- JWT токены для аутентификации
- Хеширование паролей с bcrypt
- 2FA с TOTP
- Rate limiting
- Валидация входных данных
- CORS настройки
- Helmet для безопасности заголовков

## 📱 Мобильная версия

Приложение полностью адаптивно и корректно работает на:
- Десктопах
- Планшетах
- Мобильных устройствах

## 🚀 Деплой

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Загрузите папку dist на хостинг
```

### Backend (Heroku/Railway/DigitalOcean)
```bash
cd backend
# Настройте переменные окружения
# Запустите приложение
```

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Внесите изменения
4. Создайте Pull Request

## 📄 Лицензия

MIT License

## 📞 Поддержка

Если у вас есть вопросы или проблемы:
- Создайте Issue в GitHub
- Напишите на support@eduguide.ru

---

**EduGuide** - Помогаем выбрать правильный путь в будущее! 🎓✨
