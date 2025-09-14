import nodemailer from 'nodemailer'

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

// Email templates
const emailTemplates = {
  'email-verification': (data) => ({
    subject: 'Подтверждение регистрации - EduGuide',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0ea5e9, #a855f7); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">EduGuide</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">ИИ-помощник для выбора будущего</p>
        </div>
        <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #1f2937; margin: 0 0 20px 0;">Привет, ${data.name}!</h2>
          <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
            Спасибо за регистрацию в EduGuide! Для завершения регистрации и начала работы с нашим ИИ-помощником, 
            пожалуйста, подтверди свой email адрес.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.verificationLink}" 
               style="background: linear-gradient(135deg, #0ea5e9, #a855f7); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
              Подтвердить Email
            </a>
          </div>
          <p style="color: #9ca3af; font-size: 14px; margin: 30px 0 0 0;">
            Если кнопка не работает, скопируй и вставь эту ссылку в браузер:<br>
            <a href="${data.verificationLink}" style="color: #0ea5e9;">${data.verificationLink}</a>
          </p>
          <p style="color: #9ca3af; font-size: 12px; margin: 20px 0 0 0; border-top: 1px solid #e5e7eb; padding-top: 20px;">
            Если ты не регистрировался в EduGuide, просто проигнорируй это письмо.
          </p>
        </div>
      </div>
    `
  }),

  'password-reset': (data) => ({
    subject: 'Сброс пароля - EduGuide',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0ea5e9, #a855f7); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">EduGuide</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">ИИ-помощник для выбора будущего</p>
        </div>
        <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #1f2937; margin: 0 0 20px 0;">Сброс пароля</h2>
          <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
            Привет, ${data.name}! Мы получили запрос на сброс пароля для твоего аккаунта EduGuide.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.resetLink}" 
               style="background: linear-gradient(135deg, #0ea5e9, #a855f7); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
              Сбросить пароль
            </a>
          </div>
          <p style="color: #9ca3af; font-size: 14px; margin: 30px 0 0 0;">
            Если кнопка не работает, скопируй и вставь эту ссылку в браузер:<br>
            <a href="${data.resetLink}" style="color: #0ea5e9;">${data.resetLink}</a>
          </p>
          <p style="color: #ef4444; font-size: 14px; margin: 20px 0 0 0; padding: 15px; background: #fef2f2; border-radius: 8px; border-left: 4px solid #ef4444;">
            <strong>Важно:</strong> Эта ссылка действительна только в течение 1 часа. 
            Если ты не запрашивал сброс пароля, просто проигнорируй это письмо.
          </p>
        </div>
      </div>
    `
  }),

  'welcome': (data) => ({
    subject: 'Добро пожаловать в EduGuide!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0ea5e9, #a855f7); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">EduGuide</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">ИИ-помощник для выбора будущего</p>
        </div>
        <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #1f2937; margin: 0 0 20px 0;">Добро пожаловать, ${data.name}! 🎉</h2>
          <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
            Твой email успешно подтвержден! Теперь ты можешь начать свой путь к осознанному выбору будущего.
          </p>
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin: 0 0 15px 0;">Что дальше?</h3>
            <ul style="color: #6b7280; margin: 0; padding-left: 20px;">
              <li style="margin-bottom: 8px;">Пройди профориентационные тесты</li>
              <li style="margin-bottom: 8px;">Получи персональные рекомендации</li>
              <li style="margin-bottom: 8px;">Изучи подходящие учебные заведения</li>
              <li style="margin-bottom: 8px;">Составь план действий</li>
            </ul>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/dashboard" 
               style="background: linear-gradient(135deg, #0ea5e9, #a855f7); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
              Начать тестирование
            </a>
          </div>
        </div>
      </div>
    `
  })
}

// Send email function
export const sendEmail = async ({ to, subject, template, data }) => {
  try {
    const transporter = createTransporter()
    
    const templateData = emailTemplates[template]
    if (!templateData) {
      throw new Error(`Email template '${template}' not found`)
    }

    const emailContent = templateData(data)
    
    const mailOptions = {
      from: `"EduGuide" <${process.env.SMTP_USER}>`,
      to,
      subject: emailContent.subject,
      html: emailContent.html
    }

    const result = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', result.messageId)
    return result

  } catch (error) {
    console.error('Email sending failed:', error)
    throw error
  }
}

// Send SMS function (placeholder - would need actual SMS service integration)
export const sendSMS = async ({ to, message }) => {
  try {
    // This is a placeholder implementation
    // In production, you would integrate with a real SMS service like Twilio, SMS.ru, etc.
    console.log(`SMS to ${to}: ${message}`)
    
    // For development, just log the SMS
    if (process.env.NODE_ENV === 'development') {
      console.log('📱 SMS (Development mode):', { to, message })
      return { success: true, messageId: 'dev-' + Date.now() }
    }
    
    // In production, implement actual SMS sending
    throw new Error('SMS service not configured')
    
  } catch (error) {
    console.error('SMS sending failed:', error)
    throw error
  }
}

// Send verification SMS
export const sendVerificationSMS = async (phone, code) => {
  const message = `EduGuide: Ваш код подтверждения: ${code}. Код действителен 10 минут.`
  return await sendSMS({ to: phone, message })
}

// Send password reset SMS
export const sendPasswordResetSMS = async (phone, code) => {
  const message = `EduGuide: Код для сброса пароля: ${code}. Код действителен 10 минут.`
  return await sendSMS({ to: phone, message })
}
