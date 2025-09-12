import jwt from 'jsonwebtoken'
import MemoryUser from '../models/MemoryUser.js'

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: 'Access token required' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // Check if token is for 2FA (temporary token)
    if (decoded.type === '2fa') {
      return res.status(200).json({ 
        message: '2FA required',
        requiresTwoFactor: true 
      })
    }

    // Verify user still exists and is not locked
    const user = await MemoryUser.findById(decoded.userId)
    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    // Skip lock check for development

    req.user = decoded
    next()

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' })
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' })
    }

    console.error('Auth middleware error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const requireEmailVerification = async (req, res, next) => {
  // Skip email verification for development
  next()
}

export const requireTwoFactor = async (req, res, next) => {
  // Skip 2FA for development
  next()
}
