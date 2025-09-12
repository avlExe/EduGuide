// Simple in-memory user storage for development
let users = []
let nextId = 1

class MemoryUser {
  constructor(data) {
    this._id = nextId++
    this.name = data.name
    this.email = data.email
    this.phone = data.phone
    this.password = data.password
    this.isEmailVerified = true
    this.isPhoneVerified = false
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.profile = {
      grade: '9',
      interests: [],
      subjects: [],
      testResults: [],
      recommendations: []
    }
    this.preferences = {
      notifications: {
        email: true,
        sms: true,
        push: true
      },
      privacy: {
        shareData: false,
        showProfile: false
      }
    }
  }

  async save() {
    const existingIndex = users.findIndex(u => u._id === this._id)
    if (existingIndex >= 0) {
      users[existingIndex] = this
    } else {
      users.push(this)
    }
    return this
  }

  async comparePassword(candidatePassword) {
    // Simple password comparison for development
    return this.password === candidatePassword
  }

  toSafeObject() {
    const { password, ...safeUser } = this
    return safeUser
  }

  static async findOne(query) {
    if (query.email) {
      return users.find(u => u.email === query.email) || null
    }
    if (query._id) {
      return users.find(u => u._id === query._id) || null
    }
    if (query.$or) {
      for (const condition of query.$or) {
        if (condition.email) {
          const user = users.find(u => u.email === condition.email)
          if (user) return user
        }
        if (condition.phone) {
          const user = users.find(u => u.phone === condition.phone)
          if (user) return user
        }
      }
    }
    return null
  }

  static async findById(id) {
    return users.find(u => u._id === parseInt(id)) || null
  }

  static async findByIdAndDelete(id) {
    const index = users.findIndex(u => u._id === parseInt(id))
    if (index >= 0) {
      return users.splice(index, 1)[0]
    }
    return null
  }
}

export default MemoryUser
