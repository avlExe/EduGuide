import express from 'express'
import jwt from 'jsonwebtoken'
import speakeasy from 'speakeasy'
import qrcode from 'qrcode'
import { body, validationResult } from 'express-validator'
import User from '../models/User.js'
import { sendEmail, sendSMS } from '../utils/notifications.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Register
router.post('/register', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('surname').trim().isLength({ min: 2 }).withMessage('Surname must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('phone').isMobilePhone().withMessage('Please provide a valid phone number'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['student', 'parent']).withMessage('Role must be either student or parent'),
  body('confirmPassword').custom((value, { req }) => {
    if (value && value !== req.body.password) {
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

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { phone }] 
    })
    
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email or phone already exists' 
      })
    }

    // Create new user
    const user = new User({
      name,
      surname,
      email,
      phone,
      password,
      role: role || 'student'
    })

    // Auto-verify email for development
    user.isEmailVerified = true
    await user.save()

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
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

    const { email, password, twoFactorCode } = req.body

    // Find user
    const user = await User.findOne({ email })
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

    // Check 2FA if enabled
    if (user.isTwoFactorEnabled) {
      if (!twoFactorCode) {
        return res.status(200).json({ 
          message: '2FA required',
          requiresTwoFactor: true,
          tempToken: jwt.sign(
            { userId: user._id, type: '2fa' },
            process.env.JWT_SECRET,
            { expiresIn: '5m' }
          )
        })
      }

      const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token: twoFactorCode,
        window: 2
      })

      if (!verified) {
        return res.status(401).json({ message: 'Invalid 2FA code' })
      }
    }

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
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

// Verify email (simplified for development)
router.post('/verify-email', async (req, res) => {
  res.json({ message: 'Email verification not needed in development mode' })
})

// Resend verification email (simplified)
router.post('/resend-verification', async (req, res) => {
  res.json({ message: 'Email verification not needed in development mode' })
})

// Forgot password (simplified)
router.post('/forgot-password', async (req, res) => {
  res.json({ message: 'Password reset not available in development mode' })
})

// Reset password (simplified)
router.post('/reset-password', async (req, res) => {
  res.json({ message: 'Password reset not available in development mode' })
})

// Setup 2FA (simplified)
router.post('/setup-2fa', async (req, res) => {
  res.json({ message: '2FA not available in development mode' })
})

// Verify 2FA setup (simplified)
router.post('/verify-2fa', async (req, res) => {
  res.json({ message: '2FA not available in development mode' })
})

// Disable 2FA (simplified)
router.post('/disable-2fa', async (req, res) => {
  res.json({ message: '2FA not available in development mode' })
})

// Link users (student and parent)
router.post('/link-users', authenticateToken, async (req, res) => {
  try {
    const { studentEmail, parentEmail } = req.body
    const currentUser = req.user

    // Find both users
    const student = await User.findOne({ email: studentEmail, role: 'student' })
    const parent = await User.findOne({ email: parentEmail, role: 'parent' })

    if (!student || !parent) {
      return res.status(404).json({ 
        message: 'Student or parent not found' 
      })
    }

    // Check if current user is one of them
    if (currentUser._id.toString() !== student._id.toString() && 
        currentUser._id.toString() !== parent._id.toString()) {
      return res.status(403).json({ 
        message: 'You can only link your own accounts' 
      })
    }

    // Link users
    if (!student.linkedUsers.includes(parent._id)) {
      student.linkedUsers.push(parent._id)
      await student.save()
    }

    if (!parent.linkedUsers.includes(student._id)) {
      parent.linkedUsers.push(student._id)
      await parent.save()
    }

    res.json({
      message: 'Users linked successfully',
      student: student.toSafeObject(),
      parent: parent.toSafeObject()
    })

  } catch (error) {
    console.error('Link users error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Get linked users
router.get('/linked-users', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('linkedUsers', 'name surname email role profile.grade')
      .select('linkedUsers')

    res.json({
      linkedUsers: user.linkedUsers
    })

  } catch (error) {
    console.error('Get linked users error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Search users by name and surname for linking
router.get('/search-users', authenticateToken, async (req, res) => {
  try {
    const { name, surname, role } = req.query
    const currentUser = req.user

    if (!name || !surname) {
      return res.status(400).json({ 
        message: 'Name and surname are required' 
      })
    }

    // Search for users with matching name and surname
    const searchQuery = {
      name: { $regex: name, $options: 'i' },
      surname: { $regex: surname, $options: 'i' },
      _id: { $ne: currentUser._id } // Exclude current user
    }

    if (role) {
      searchQuery.role = role
    }

    const users = await User.find(searchQuery)
      .select('name surname email role profile.grade')
      .limit(10)

    res.json({
      users: users
    })

  } catch (error) {
    console.error('Search users error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router
