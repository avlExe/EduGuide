import bcrypt from 'bcryptjs'
import { supabase } from '../config/supabase.js'

export class SupabaseUser {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.surname = data.surname
    this.email = data.email
    this.phone = data.phone
    this.password_hash = data.password_hash
    this.role = data.role || 'student'
    this.is_email_verified = data.is_email_verified || false
    this.is_phone_verified = data.is_phone_verified || false
    this.email_verification_token = data.email_verification_token
    this.email_verification_expires = data.email_verification_expires
    this.phone_verification_code = data.phone_verification_code
    this.phone_verification_expires = data.phone_verification_expires
    this.password_reset_token = data.password_reset_token
    this.password_reset_expires = data.password_reset_expires
    this.two_factor_secret = data.two_factor_secret
    this.is_two_factor_enabled = data.is_two_factor_enabled || false
    this.last_login = data.last_login
    this.login_attempts = data.login_attempts || 0
    this.lock_until = data.lock_until
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }

  // Сохранение пользователя
  async save() {
    try {
      const { data, error } = await supabase
        .from('users')
        .upsert({
          id: this.id,
          name: this.name,
          surname: this.surname,
          email: this.email,
          phone: this.phone,
          password_hash: this.password_hash,
          role: this.role,
          is_email_verified: this.is_email_verified,
          is_phone_verified: this.is_phone_verified,
          email_verification_token: this.email_verification_token,
          email_verification_expires: this.email_verification_expires,
          phone_verification_code: this.phone_verification_code,
          phone_verification_expires: this.phone_verification_expires,
          password_reset_token: this.password_reset_token,
          password_reset_expires: this.password_reset_expires,
          two_factor_secret: this.two_factor_secret,
          is_two_factor_enabled: this.is_two_factor_enabled,
          last_login: this.last_login,
          login_attempts: this.login_attempts,
          lock_until: this.lock_until,
          updated_at: new Date().toISOString()
        })
        .select()

      if (error) throw error
      
      if (data && data[0]) {
        this.id = data[0].id
        this.created_at = data[0].created_at
        this.updated_at = data[0].updated_at
      }
      
      return this
    } catch (error) {
      console.error('Error saving user:', error)
      throw error
    }
  }

  // Поиск пользователя по email
  static async findByEmail(email) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

      if (error) {
        if (error.code === 'PGRST116') return null // No rows found
        throw error
      }

      return data ? new SupabaseUser(data) : null
    } catch (error) {
      console.error('Error finding user by email:', error)
      throw error
    }
  }

  // Поиск пользователя по ID
  static async findById(id) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') return null
        throw error
      }

      return data ? new SupabaseUser(data) : null
    } catch (error) {
      console.error('Error finding user by ID:', error)
      throw error
    }
  }

  // Поиск пользователя по токену сброса пароля
  static async findByPasswordResetToken(token) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('password_reset_token', token)
        .gt('password_reset_expires', new Date().toISOString())
        .single()

      if (error) {
        if (error.code === 'PGRST116') return null
        throw error
      }

      return data ? new SupabaseUser(data) : null
    } catch (error) {
      console.error('Error finding user by reset token:', error)
      throw error
    }
  }

  // Поиск пользователей по имени и фамилии
  static async searchByName(name, surname, excludeId = null) {
    try {
      let query = supabase
        .from('users')
        .select('id, name, surname, email, role')
        .ilike('name', `%${name}%`)
        .ilike('surname', `%${surname}%`)

      if (excludeId) {
        query = query.neq('id', excludeId)
      }

      const { data, error } = await query.limit(10)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error searching users by name:', error)
      throw error
    }
  }

  // Сравнение пароля
  async comparePassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password_hash)
  }

  // Хеширование пароля
  async hashPassword() {
    const salt = await bcrypt.genSalt(12)
    this.password_hash = await bcrypt.hash(this.password_hash, salt)
  }

  // Генерация токена сброса пароля
  generatePasswordResetToken() {
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    this.password_reset_token = token
    this.password_reset_expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
    return token
  }

  // Увеличение попыток входа
  async incLoginAttempts() {
    this.login_attempts += 1
    if (this.login_attempts >= 5) {
      this.lock_until = new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 hours
    }
    await this.save()
  }

  // Сброс попыток входа
  async resetLoginAttempts() {
    this.login_attempts = 0
    this.lock_until = null
    await this.save()
  }

  // Проверка блокировки
  get isLocked() {
    return !!(this.lock_until && this.lock_until > new Date())
  }

  // Безопасный объект для отправки клиенту
  toSafeObject() {
    const obj = { ...this }
    delete obj.password_hash
    delete obj.email_verification_token
    delete obj.phone_verification_code
    delete obj.password_reset_token
    delete obj.two_factor_secret
    return obj
  }
}
