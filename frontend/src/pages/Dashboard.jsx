import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  User, 
  Settings, 
  LogOut,
  BookOpen,
  Target,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  ArrowRight,
  Users,
  Link,
  Search,
  X
} from 'lucide-react'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const mockData = {
    user: {
      name: 'Алексей',
      surname: 'Петров',
      email: 'alexey@example.com',
      role: 'student',
      progress: 65
    },
    tests: [
      { id: 1, name: 'Профориентационный тест', completed: true, score: 85 },
      { id: 2, name: 'Тест способностей', completed: true, score: 78 },
      { id: 3, name: 'Анализ интересов', completed: false, score: null }
    ],
    recommendations: [
      {
        type: 'college',
        title: 'IT-колледж "Синергия"',
        match: 92,
        description: 'Высокое соответствие вашим интересам в программировании'
      },
      {
        type: 'school',
        title: 'Продолжить в 10 классе',
        match: 75,
        description: 'Хорошая база для подготовки к ЕГЭ по техническим предметам'
      }
    ]
  }

  // Функция поиска пользователей для связывания аккаунтов
  const searchUsers = async (query) => {
    if (query.length < 2) {
      setSearchResults([])
      return
    }
    
    setIsSearching(true)
    try {
      const response = await fetch(`http://localhost:5000/api/auth/search-users?q=${encodeURIComponent(query)}&role=${mockData.user.role === 'student' ? 'parent' : 'student'}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      const data = await response.json()
      setSearchResults(data.users || [])
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  // Функция связывания аккаунтов
  const linkAccount = async (userId) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/link-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ linkedUserId: userId })
      })
      
      if (response.ok) {
        alert('Аккаунты успешно связаны!')
        setShowLinkModal(false)
        setSearchQuery('')
        setSearchResults([])
      } else {
        const data = await response.json()
        alert(data.message || 'Ошибка при связывании аккаунтов')
      }
    } catch (error) {
      console.error('Link error:', error)
      alert('Произошла ошибка при связывании аккаунтов')
    }
  }

  // Эффект для поиска при изменении запроса
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchUsers(searchQuery)
    }, 300)
    
    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="bg-gray-900/95 backdrop-blur-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">EduGuide</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <User className="w-5 h-5" />
                <span>{mockData.user.name} {mockData.user.surname}</span>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-300">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-300">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Меню</h3>
              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Обзор', icon: <Target className="w-5 h-5" /> },
                  { id: 'tests', label: 'Тесты', icon: <BookOpen className="w-5 h-5" /> },
                  { id: 'recommendations', label: 'Рекомендации', icon: <TrendingUp className="w-5 h-5" /> },
                  { id: 'schedule', label: 'План', icon: <Calendar className="w-5 h-5" /> }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Progress Card */}
                <div className="bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-700">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Твой прогресс
                  </h2>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm text-gray-300 mb-2">
                        <span>Завершено тестов</span>
                        <span>2 из 3</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${mockData.user.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-blue-400">
                      {mockData.user.progress}%
                    </div>
                  </div>
                </div>

                {/* Link Account Suggestion */}
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Свяжите аккаунты для лучшего опыта
                      </h3>
                      <p className="text-gray-300 mb-4">
                        {mockData.user.role === 'student' 
                          ? 'Свяжите свой аккаунт с аккаунтом родителя, чтобы он мог следить за вашим прогрессом и помогать с выбором.'
                          : 'Свяжите свой аккаунт с аккаунтом ребёнка, чтобы следить за его прогрессом и помогать с выбором учебного заведения.'
                        }
                      </p>
                      <button
                        onClick={() => setShowLinkModal(true)}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Link className="w-4 h-4" />
                        <span>Найти и связать аккаунт</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Следующие шаги
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Clock className="w-5 h-5 text-orange-500" />
                        <span className="text-gray-700">Пройди тест интересов</span>
                        <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Target className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-700">Изучи рекомендации</span>
                        <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Статистика
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Пройдено тестов</span>
                        <span className="font-semibold">2</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Средний балл</span>
                        <span className="font-semibold">81.5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Рекомендаций</span>
                        <span className="font-semibold">2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'tests' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Тесты и опросники
                  </h2>
                  <div className="space-y-4">
                    {mockData.tests.map((test) => (
                      <div key={test.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              test.completed ? 'bg-green-100' : 'bg-gray-100'
                            }`}>
                              {test.completed ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <BookOpen className="w-5 h-5 text-gray-400" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{test.name}</h3>
                              <p className="text-sm text-gray-600">
                                {test.completed ? `Завершен • Балл: ${test.score}` : 'Не пройден'}
                              </p>
                            </div>
                          </div>
                          <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            test.completed
                              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              : 'btn-primary'
                          }`}>
                            {test.completed ? 'Повторить' : 'Начать'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'recommendations' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Персональные рекомендации
                  </h2>
                  <div className="space-y-4">
                    {mockData.recommendations.map((rec, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {rec.title}
                            </h3>
                            <p className="text-gray-600">{rec.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary-600">
                              {rec.match}%
                            </div>
                            <div className="text-sm text-gray-500">соответствие</div>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <button className="btn-primary">
                            Подробнее
                          </button>
                          <button className="btn-secondary">
                            Сохранить
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'schedule' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    План действий
                  </h2>
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary-500 pl-4 py-2">
                      <h3 className="font-semibold text-gray-900">Этап 1: Анализ</h3>
                      <p className="text-gray-600">Пройди все тесты для полного анализа</p>
                      <div className="text-sm text-green-600 mt-1">✓ Завершено</div>
                    </div>
                    <div className="border-l-4 border-orange-500 pl-4 py-2">
                      <h3 className="font-semibold text-gray-900">Этап 2: Исследование</h3>
                      <p className="text-gray-600">Изучи рекомендованные учебные заведения</p>
                      <div className="text-sm text-orange-600 mt-1">В процессе</div>
                    </div>
                    <div className="border-l-4 border-gray-300 pl-4 py-2">
                      <h3 className="font-semibold text-gray-900">Этап 3: Решение</h3>
                      <p className="text-gray-600">Прими окончательное решение</p>
                      <div className="text-sm text-gray-500 mt-1">Ожидает</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Link Account Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-md"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Связать аккаунт
                </h3>
                <button
                  onClick={() => setShowLinkModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Поиск по имени и фамилии
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Введите имя и фамилию..."
                  />
                </div>
              </div>

              <div className="max-h-64 overflow-y-auto">
                {isSearching ? (
                  <div className="text-center py-4 text-gray-500">
                    Поиск...
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-2">
                    {searchResults.map((user) => (
                      <div
                        key={user._id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <div>
                          <div className="font-medium text-gray-900">
                            {user.name} {user.surname}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                        <button
                          onClick={() => linkAccount(user._id)}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Связать
                        </button>
                      </div>
                    ))}
                  </div>
                ) : searchQuery.length >= 2 ? (
                  <div className="text-center py-4 text-gray-500">
                    Пользователи не найдены
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    Введите имя и фамилию для поиска
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
