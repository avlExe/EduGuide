import React from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  GraduationCap, 
  Target, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Star,
  BookOpen,
  Lightbulb,
  Shield,
  Clock,
  Mail,
  BarChart3,
  MapPin,
  Send,
  FileText,
  TrendingUp,
  UserCheck,
  Calendar,
  Award,
  Upload,
  Search,
  Database,
  Download
} from 'lucide-react'

const LandingPage = () => {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <header className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-md z-50 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">EduGuide</span>
            </button>
            <nav className="hidden md:flex space-x-8">
              <a 
                href="#features" 
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('features').scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer"
              >
                Возможности
              </a>
              <a 
                href="#how-it-works" 
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer"
              >
                Как работает
              </a>
              <a 
                href="#pricing" 
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer"
              >
                Тарифы
              </a>
            </nav>
            <div className="flex space-x-4">
              <button 
                onClick={() => window.location.href = '/auth'}
                className="text-gray-300 hover:text-blue-400 font-medium transition-colors"
              >
                Войти
              </button>
              <button 
                onClick={() => {
                  window.location.href = '/auth?tab=register'
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
              >
                Попробовать бесплатно
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                ИИ-помощник для поступления:<br />
                <span className="text-blue-400">анализ учебных заведений, оценка шансов, готовые решения</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Выбираешь между 10 классом и колледжем? Думаешь, куда поступать после 11-го? 
                Наш помощник анализирует твои баллы ОГЭ/ЕГЭ, находит подходящие учебные заведения и даже 
                общается с ними вместо тебя.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => {
                    window.location.href = '/auth?tab=register'
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg flex items-center justify-center space-x-2"
                >
                  <span>Оценить мои шансы</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-gray-600 hover:border-blue-400 text-gray-300 hover:text-blue-400 font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
                >
                  Узнать больше
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl p-8 shadow-2xl border border-gray-700">
                <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <Brain className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Анализ в реальном времени</h3>
                      <p className="text-sm text-gray-400">Обработка данных...</p>
                    </div>
                  </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Баллы ОГЭ/ЕГЭ</span>
                        <span className="text-sm font-medium text-green-400">✓ Загружены</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Подходящие учебные заведения</span>
                        <span className="text-sm font-medium text-blue-400">12 найдено</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Запросы отправлены</span>
                        <span className="text-sm font-medium text-purple-400">8 из 12</span>
                      </div>
                    </div>
                  <div className="mt-4 bg-gray-700 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-300">Получен ответ от МГУ</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Что делает помощник
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Полный цикл помощи в поступлении — от анализа до общения с вузами
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: "Анализирует твои шансы",
                description: "Загружаешь баллы ОГЭ/ЕГЭ, получаешь прогноз по учебным заведениям с точностью до 95%"
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Подбирает учебные заведения",
                description: "Показывает подходящие колледжи, техникумы и университеты в твоём и соседних городах"
              },
              {
                icon: <Send className="w-8 h-8" />,
                title: "Отправляет запросы от твоего имени",
                description: "Автоматически пишет в приёмные комиссии учебных заведений по профессиональным шаблонам"
              },
              {
                icon: <FileText className="w-8 h-8" />,
                title: "Формирует отчёты",
                description: "Собранные ответы от учебных заведений и сводка по шансам в удобной таблице"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700"
              >
                <div className="text-blue-400 mb-4">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Почему это важно
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Проблема</h3>
                    <p className="text-gray-300">
                      Выпускники и родители тратят <strong>недели</strong> на поиск информации 
                      и переписки с учебными заведениями. Хаотичные вкладки, списки вузов и колледжей, переписки в почте.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Решение</h3>
                    <p className="text-gray-300">
                      Мы сокращаем это время до <strong>нескольких минут</strong>. 
                      Единый интерфейс помощника вместо хаоса.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gray-700 rounded-xl p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 rounded-lg p-4 shadow-sm">
                    <div className="text-2xl font-bold text-red-400 mb-2">До</div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-600 rounded"></div>
                      <div className="h-2 bg-gray-600 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-600 rounded w-1/2"></div>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">Недели поиска</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 shadow-sm">
                    <div className="text-2xl font-bold text-green-400 mb-2">После</div>
                    <div className="space-y-2">
                      <div className="h-2 bg-green-500 rounded"></div>
                      <div className="h-2 bg-green-500 rounded w-3/4"></div>
                      <div className="h-2 bg-green-500 rounded w-1/2"></div>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">Минуты работы</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-gradient-to-l from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Как это работает
            </h2>
            <p className="text-xl text-gray-300">
              Простой сценарий в 4 шага
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Загружаешь свои баллы/интересы",
                description: "Вводишь результаты ОГЭ/ЕГЭ и указываешь интересующие направления",
                icon: <Upload className="w-6 h-6" />,
                animation: "upload"
              },
              {
                step: "2", 
                title: "Получаешь список учебных заведений с шансами",
                description: "ИИ анализирует данные и показывает подходящие колледжи, техникумы и университеты",
                icon: <Search className="w-6 h-6" />,
                animation: "search"
              },
              {
                step: "3",
                title: "Помощник отправляет запросы",
                description: "Автоматическая рассылка в приёмные комиссии учебных заведений от твоего имени",
                icon: <Send className="w-6 h-6" />,
                animation: "send"
              },
              {
                step: "4",
                title: "Получаешь отчёт и рекомендации",
                description: "Сводка по всем учебным заведениям, ответы и персональные рекомендации",
                icon: <Download className="w-6 h-6" />,
                animation: "download"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ 
                  y: -10,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                className="text-center relative group bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-600"
              >
                {/* Анимированная линия между шагами */}
                {index < 3 && (
                  <motion.div 
                    className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-600 transform translate-x-8"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                  />
                )}
                
                {/* Анимированный номер шага с иконкой */}
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 relative z-10 shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {step.step}
                </motion.div>
                
                {/* Логическая анимация для каждого шага */}
                <motion.div 
                  className="flex justify-center mb-4"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2 + 0.5
                  }}
                  viewport={{ once: true }}
                >
                  {step.animation === "upload" && (
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                      className="p-3 bg-blue-500/20 rounded-lg"
                    >
                      <Upload className="w-8 h-8 text-blue-400" />
                    </motion.div>
                  )}
                  
                  {step.animation === "search" && (
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                      className="p-3 bg-green-500/20 rounded-lg"
                    >
                      <Search className="w-8 h-8 text-green-400" />
                    </motion.div>
                  )}
                  
                  {step.animation === "send" && (
                    <motion.div
                      animate={{ 
                        x: [0, 10, 0],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                      className="p-3 bg-purple-500/20 rounded-lg"
                    >
                      <Send className="w-8 h-8 text-purple-400" />
                    </motion.div>
                  )}
                  
                  {step.animation === "download" && (
                    <motion.div
                      animate={{ 
                        y: [0, 5, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ 
                        duration: 1.8,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                      className="p-3 bg-orange-500/20 rounded-lg"
                    >
                      <Download className="w-8 h-8 text-orange-400" />
                    </motion.div>
                  )}
                </motion.div>
                
                {/* Анимированный контент */}
                <motion.h3 
                  className="text-lg font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                  viewport={{ once: true }}
                >
                  {step.title}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                  viewport={{ once: true }}
                >
                  {step.description}
                </motion.p>
                
                {/* Декоративные элементы */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 bg-gradient-to-r from-gray-800 via-blue-900/30 to-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Для кого помощник
            </h2>
            <p className="text-lg text-gray-300">
              Две основные аудитории, которым мы помогаем
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <GraduationCap className="w-16 h-16" />,
                title: "Выпускник",
                subtitle: "Выбор учебного заведения",
                description: "Помогаем найти подходящие вузы и колледжи, когда баллов ОГЭ/ЕГЭ не хватает для желаемого направления или нужно найти альтернативы",
                features: ["Анализ баллов ОГЭ/ЕГЭ", "Поиск альтернатив", "Автоматические запросы", "Рекомендации по поступлению"],
                gradient: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-600/20 to-cyan-600/20",
                iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500"
              },
              {
                icon: <Users className="w-16 h-16" />,
                title: "Родитель",
                subtitle: "Контроль и спокойствие",
                description: "Отслеживайте прогресс ребёнка, получайте уведомления и будьте в курсе всех этапов поступления",
                features: ["Мониторинг прогресса", "Уведомления", "Совместное планирование", "Контроль процесса"],
                gradient: "from-purple-500 to-pink-500",
                bgGradient: "from-purple-600/20 to-pink-600/20",
                iconBg: "bg-gradient-to-br from-purple-500 to-pink-500"
              }
            ].map((audience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-gradient-to-br ${audience.bgGradient} rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-600/50 hover:border-gray-500/50`}
              >
                <div className={`${audience.iconBg} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <div className="text-white">
                    {audience.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {audience.title}
                </h3>
                <p className={`text-lg font-semibold bg-gradient-to-r ${audience.gradient} bg-clip-text text-transparent mb-4`}>
                  {audience.subtitle}
                </p>
                <p className="text-gray-200 mb-6 leading-relaxed">
                  {audience.description}
                </p>
                <ul className="space-y-3">
                  {audience.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${audience.gradient} flex items-center justify-center`}>
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-200 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Стоимость и тарифы
            </h2>
            <p className="text-xl text-gray-300">
              Начни с бесплатного анализа, затем выбери подходящий тариф
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-800 rounded-xl p-8 shadow-lg border-2 border-gray-700"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Бесплатный</h3>
                <p className="text-gray-300">Анализ шансов + подбор учебных заведений</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Анализ баллов ОГЭ/ЕГЭ</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Подбор подходящих учебных заведений</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Оценка шансов поступления</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Базовые рекомендации</span>
                </li>
              </ul>
              <button 
                onClick={() => {
                  window.location.href = '/auth?tab=register'
                }}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Начать бесплатно
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-800 rounded-xl p-8 shadow-lg border-2 border-blue-600 relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Популярный
                </span>
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Премиум</h3>
                <p className="text-gray-300">Полный функционал + автоматизация</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-blue-400">499₽</span>
                  <span className="text-gray-300">/месяц</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Всё из бесплатного тарифа</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Автоматическая рассылка запросов в учебные заведения</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Расширенные отчёты и аналитика</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Приоритетная поддержка</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Уведомления о новых возможностях</span>
                </li>
              </ul>
              <button 
                onClick={() => {
                  window.location.href = '/auth?tab=register'
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Попробовать Премиум
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Готов снять с себя рутину поступления?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Присоединяйся к тысячам выпускников, которые уже экономят время с нашим ИИ-помощником
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/auth?tab=register'}
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
            >
              Оценить мои шансы бесплатно
            </button>
            <button 
              onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
            >
              Посмотреть тарифы
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">EduGuide</span>
              </div>
              <p className="text-gray-400">
                ИИ-помощник для поступления в учебные заведения. 
                Анализируем, подбираем, общаемся за вас.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Продукт</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Возможности</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">Как работает</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Тарифы</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Поддержка</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2 text-gray-400">
                <li>support@eduguide.ru</li>
                <li>+7 (800) 123-45-67</li>
                <li>Москва, ул. Примерная, 123</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EduGuide. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </motion.div>
  )
}

export default LandingPage
