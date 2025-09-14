import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft,
  CheckCircle,
  X,
  AlertCircle
} from 'lucide-react'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [modalType, setModalType] = useState('error') // 'error', 'success', 'validation'

  // Функция перевода сообщений об ошибках с сервера
  const translateErrorMessage = (message) => {
    if (!message) return null
    
    const translations = {
      'User with this email already exists': 'Пользователь с таким email уже существует',
      'Invalid email or password': 'Неверный email или пароль',
      'User not found': 'Пользователь не найден',
      'Invalid credentials': 'Неверные учетные данные',
      'Email is required': 'Email обязателен',
      'Password is required': 'Пароль обязателен',
      'Password must be at least 6 characters': 'Пароль должен содержать минимум 6 символов',
      'Passwords do not match': 'Пароли не совпадают',
      'Name is required': 'Имя обязательно',
      'Surname is required': 'Фамилия обязательна',
      'Please provide a valid email': 'Пожалуйста, введите корректный email',
      'Please provide a valid phone number': 'Пожалуйста, введите корректный номер телефона',
      'Role must be either student or parent': 'Роль должна быть "студент" или "родитель"',
      'Password confirmation does not match password': 'Подтверждение пароля не совпадает с паролем',
      'Internal server error': 'Внутренняя ошибка сервера',
      'Something went wrong': 'Что-то пошло не так',
      'Network error': 'Ошибка сети',
      'Request timeout': 'Превышено время ожидания запроса'
    }
    
    return translations[message] || message
  }
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    surname: '',
    role: 'student',
    agreeToTerms: false
  })


  // Проверяем URL параметры при загрузке
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tab = urlParams.get('tab')
    if (tab === 'register') {
      setIsLogin(false)
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (isLogin) {
        // Логика входа
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        })
        
        const data = await response.json()
        
        if (response.ok) {
          localStorage.setItem('token', data.token)
          window.location.href = '/dashboard'
        } else {
          setModalType('error')
          const translatedMessage = translateErrorMessage(data.message)
          setErrorMessage(translatedMessage || 'Неверный email или пароль')
          setShowErrorModal(true)
        }
      } else {
        // Логика регистрации
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            surname: formData.surname,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            role: formData.role
          })
        })
        
        const data = await response.json()
        
        if (response.ok) {
          // Сохраняем токен авторизации
          if (data.token) {
            localStorage.setItem('token', data.token)
          }
          
          // Красивое сообщение о завершении регистрации
          const successMessage = document.createElement('div')
          successMessage.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
          successMessage.innerHTML = `
            <div class="bg-gray-800 rounded-xl p-8 max-w-md mx-4 text-center border border-gray-700 shadow-2xl">
              <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-white mb-2">Регистрация завершена!</h3>
              <p class="text-gray-300 mb-6">Добро пожаловать в EduGuide! Ваш аккаунт успешно создан.</p>
              <button 
                onclick="this.parentElement.parentElement.remove(); window.location.href='/dashboard'"
                class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Перейти в личный кабинет
              </button>
            </div>
          `
          document.body.appendChild(successMessage)
          
          // Автоматически убираем сообщение через 5 секунд
          setTimeout(() => {
            if (successMessage.parentElement) {
              successMessage.remove()
              window.location.href = '/dashboard'
            }
          }, 5000)
        } else {
          console.error('Registration error:', data)
          if (data.errors && data.errors.length > 0) {
            setModalType('validation')
            setErrorMessage('Ошибки валидации:\n' + data.errors.map(err => err.msg).join('\n'))
            setShowErrorModal(true)
          } else {
            setModalType('error')
            const translatedMessage = translateErrorMessage(data.message)
            setErrorMessage(translatedMessage || 'Ошибка при создании аккаунта')
            setShowErrorModal(true)
          }
        }
      }
    } catch (error) {
      console.error('Auth error:', error)
      setModalType('error')
      setErrorMessage('Произошла ошибка соединения. Проверьте интернет и попробуйте еще раз.')
      setShowErrorModal(true)
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-2 sm:p-4">
      {/* Кнопка "На главную" в левом верхнем углу страницы */}
      <button 
        onClick={() => window.location.href = '/'}
        className="fixed top-4 left-4 z-50 flex items-center space-x-1 sm:space-x-2 text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base bg-gray-800/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-700"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline">На главную</span>
      </button>

      <div className={`w-full ${isLogin ? 'max-w-md' : 'max-w-2xl'}`}>
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          {/* Логотип по центру */}
          <div className="flex items-center justify-center space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-white">EduGuide</span>
          </div>
        </div>

        {/* Auth Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 border border-gray-700"
        >
          <div className="text-center mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {isLogin ? 'Добро пожаловать!' : 'Создать аккаунт'}
            </h1>
            <p className="text-gray-300 text-sm sm:text-base">
              {isLogin 
                ? 'Войди в свой аккаунт, чтобы продолжить' 
                : 'Начни свой путь к осознанному выбору будущего'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Имя
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-white placeholder-gray-400"
                    placeholder="Введи свое имя"
                    required={!isLogin}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Фамилия
                  </label>
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-white placeholder-gray-400"
                    placeholder="Введи свою фамилию"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Кто вы?
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all shadow-lg ${
                      formData.role === 'student' 
                        ? 'border-blue-500 bg-blue-500/10 shadow-blue-500/20' 
                        : 'border-gray-500 bg-gray-700 hover:border-gray-400 shadow-gray-900/50'
                    }`}
                    onClick={() => setFormData({...formData, role: 'student'})}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        formData.role === 'student' 
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-400'
                      }`}>
                        {formData.role === 'student' && (
                          <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                        )}
                      </div>
                      <div>
                        <div className="text-white font-medium">Выпускник</div>
                        <div className="text-gray-400 text-sm">Я выбираю учебное заведение</div>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all shadow-lg ${
                      formData.role === 'parent' 
                        ? 'border-purple-500 bg-purple-500/10 shadow-purple-500/20' 
                        : 'border-gray-500 bg-gray-700 hover:border-gray-400 shadow-gray-900/50'
                    }`}
                    onClick={() => setFormData({...formData, role: 'parent'})}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        formData.role === 'parent' 
                          ? 'border-purple-500 bg-purple-500' 
                          : 'border-gray-400'
                      }`}>
                        {formData.role === 'parent' && (
                          <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                        )}
                      </div>
                      <div>
                        <div className="text-white font-medium">Родитель</div>
                        <div className="text-gray-400 text-sm">Я помогаю ребёнку</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-white placeholder-gray-400"
                  placeholder="example@email.com"
                  required
                />
              </div>
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Пароль
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-white placeholder-gray-400"
                  placeholder="Введи пароль"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Подтверди пароль
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-white placeholder-gray-400"
                    placeholder="Подтверди пароль"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {!isLogin && (
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  required={!isLogin}
                />
                <label className="text-sm text-gray-300">
                  Я согласен с{' '}
                  <a href="#" className="text-blue-400 hover:underline">
                    условиями использования
                  </a>{' '}
                  и{' '}
                  <a href="#" className="text-blue-400 hover:underline">
                    политикой конфиденциальности
                  </a>
                </label>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-lg"
            >
              {isLogin ? 'Войти' : 'Создать аккаунт'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300 text-sm sm:text-base">
              {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-400 hover:underline font-medium"
              >
                {isLogin ? 'Зарегистрироваться' : 'Войти'}
              </button>
            </p>
          </div>

          {isLogin && (
            <div className="mt-4 text-center">
              <button 
                onClick={() => window.location.href = '/forgot-password'}
                className="text-blue-400 hover:underline text-sm"
              >
                Забыл пароль?
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Модальное окно */}
      {showErrorModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowErrorModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Заголовок с иконкой */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  modalType === 'error' ? 'bg-red-500/20' : 
                  modalType === 'validation' ? 'bg-yellow-500/20' : 
                  'bg-green-500/20'
                }`}>
                  {modalType === 'error' ? (
                    <AlertCircle className="w-6 h-6 text-red-400" />
                  ) : modalType === 'validation' ? (
                    <AlertCircle className="w-6 h-6 text-yellow-400" />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-white">
                  {modalType === 'error' ? 'Ошибка' : 
                   modalType === 'validation' ? 'Ошибки валидации' : 
                   'Успешно'}
                </h3>
              </div>
              <button
                onClick={() => setShowErrorModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Сообщение */}
            <div className="mb-6">
              {modalType === 'validation' ? (
                <div className="text-gray-300">
                  <p className="mb-3">Пожалуйста, исправьте следующие ошибки:</p>
                  <ul className="space-y-2">
                    {errorMessage.split('\n').map((error, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-yellow-400 mt-1">•</span>
                        <span>{error}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-300 leading-relaxed">
                  {errorMessage}
                </p>
              )}
            </div>

            {/* Кнопки */}
            <div className="flex space-x-3">
              <button
                onClick={() => setShowErrorModal(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Понятно
              </button>
              {modalType === 'error' && isLogin && (
                <button
                  onClick={() => {
                    setShowErrorModal(false)
                    setIsLogin(false)
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  Зарегистрироваться
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default AuthPage
