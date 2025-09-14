import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Mail, 
  ArrowLeft,
  CheckCircle
} from 'lucide-react'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) {
      setError('Введите email адрес')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
      } else {
        setError(data.message || 'Произошла ошибка')
      }
    } catch (error) {
      console.error('Forgot password error:', error)
      setError('Произошла ошибка. Попробуйте еще раз.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full border border-gray-700 text-center"
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Письмо отправлено!</h1>
          <p className="text-gray-300 mb-6">
            Если аккаунт с таким email существует, мы отправили ссылку для сброса пароля. 
            Проверьте почту и следуйте инструкциям в письме.
          </p>
          <button
            onClick={() => window.location.href = '/auth'}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Вернуться к входу
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      {/* Кнопка "На главную" в левом верхнем углу страницы */}
      <button 
        onClick={() => window.location.href = '/'}
        className="fixed top-4 left-4 z-50 flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors bg-gray-800/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-700"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>На главную</span>
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full border border-gray-700"
      >
        <div className="text-center mb-6">
          {/* Логотип по центру */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">EduGuide</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Восстановление пароля
          </h1>
          <p className="text-gray-300 text-sm">
            Введите email адрес, на который зарегистрирован аккаунт
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-white placeholder-gray-400"
                placeholder="example@email.com"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Отправляем...' : 'Отправить ссылку'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-300 text-sm">
            Вспомнили пароль?{' '}
            <button
              onClick={() => window.location.href = '/auth'}
              className="text-blue-400 hover:underline font-medium"
            >
              Войти
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default ForgotPasswordPage
