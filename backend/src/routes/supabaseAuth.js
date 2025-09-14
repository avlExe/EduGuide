import express from 'express'
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import { SupabaseUser } from '../models/SupabaseUser.js'
import { sendEmail } from '../utils/notifications.js'

const router = express.Router()

// Register
router.post('/register', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('surname').trim().isLength({ min: 2 }).withMessage('Surname must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('phone').optional().isMobilePhone().withMessage('Please provide a valid phone number'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['student', 'parent']).withMessage('Role must be either student or parent'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password')
    }
    return true
  })
], async (req, res) => {
  try {
    console.log('📝 Registration attempt:', req.body)
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log('❌ Validation errors:', errors.array())
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      })
    }

    const { name, surname, email, phone, password, role } = req.body

    console.log('Raw data from request:', { name, surname, email, role })

    // Check if user already exists
    const existingUser = await SupabaseUser.findByEmail(email)
    
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email already exists' 
      })
    }

    // Create new user
    const user = new SupabaseUser({
      name,
      surname,
      email,
      phone: phone || undefined,
      password_hash: password, // Will be hashed in save()
      role: role || 'student'
    })

    // Hash password
    await user.hashPassword()

    console.log('Creating user with data:', { name, surname, email, role })

    // Auto-verify email for development
    user.is_email_verified = true
    await user.save()

    console.log('User saved successfully:', user.toSafeObject())

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    res.status(201).json({
      message: 'User registered successfully.',
      user: user.toSafeObject(),
      token
    })

  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Login
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      })
    }

    const { email, password } = req.body

    // Find user
    const user = await SupabaseUser.findByEmail(email)
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Check if account is locked
    if (user.isLocked) {
      return res.status(423).json({ 
        message: 'Account is temporarily locked due to too many failed login attempts' 
      })
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      await user.incLoginAttempts()
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Reset login attempts on successful password check
    await user.resetLoginAttempts()

    // Update last login
    user.last_login = new Date()
    await user.save()

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        type: 'access'
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    res.json({
      message: 'Login successful',
      token,
      user: user.toSafeObject()
    })

  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Forgot password
router.post('/forgot-password', [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      })
    }

    const { email } = req.body

    // Find user by email
    const user = await SupabaseUser.findByEmail(email)
    if (!user) {
      // Don't reveal if user exists or not for security
      return res.json({ 
        message: 'If an account with that email exists, we have sent a password reset link.' 
      })
    }

    // Generate password reset token
    const resetToken = user.generatePasswordResetToken()
    await user.save()

    // Create reset link
    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`

    // Send password reset email
    try {
      await sendEmail({
        to: user.email,
        template: 'password-reset',
        data: {
          name: user.name,
          resetLink: resetLink
        }
      })

      console.log('Password reset email sent to:', user.email)
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError)
      // Don't fail the request if email sending fails
      console.log('Reset link for development:', resetLink)
    }

    res.json({ 
      message: 'If an account with that email exists, we have sent a password reset link.' 
    })

  } catch (error) {
    console.error('Forgot password error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Reset password
router.post('/reset-password', [
  body('token').notEmpty().withMessage('Reset token is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password')
    }
    return true
  })
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      })
    }

    const { token, password } = req.body

    // Find user by reset token
    const user = await SupabaseUser.findByPasswordResetToken(token)

    if (!user) {
      return res.status(400).json({ 
        message: 'Invalid or expired reset token' 
      })
    }

    // Update password
    user.password_hash = password
    await user.hashPassword()
    user.password_reset_token = null
    user.password_reset_expires = null
    await user.save()

    console.log('Password reset successfully for user:', user.email)

    res.json({ 
      message: 'Password has been reset successfully' 
    })

  } catch (error) {
    console.error('Reset password error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Search users by name and surname for linking
router.get('/search-users', async (req, res) => {
  try {
    const { name, surname, role } = req.query
    const currentUserId = req.user?.userId

    if (!name || !surname) {
      return res.status(400).json({ 
        message: 'Name and surname are required' 
      })
    }

    // Search for users with matching name and surname
    const users = await SupabaseUser.searchByName(name, surname, currentUserId)

    // Filter by role if specified
    const filteredUsers = role ? users.filter(user => user.role === role) : users

    res.json({
      users: filteredUsers
    })

  } catch (error) {
    console.error('Search users error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router
