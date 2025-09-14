import express from 'express'
import { body, validationResult } from 'express-validator'
import User from '../models/User.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    console.log('Getting profile for user ID:', req.user.userId)
    const user = await User.findById(req.user.userId)
    if (!user) {
      console.log('User not found')
      return res.status(404).json({ message: 'User not found' })
    }

    console.log('User found:', { name: user.name, surname: user.surname, email: user.email })
    res.json({ user: user.toSafeObject() })
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Update user profile
router.put('/profile', authenticateToken, [
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('phone').optional().isMobilePhone('ru-RU').withMessage('Please provide a valid phone number'),
  body('profile.grade').optional().isIn(['9', '10', '11', '12']).withMessage('Invalid grade'),
  body('profile.interests').optional().isArray().withMessage('Interests must be an array'),
  body('profile.subjects').optional().isArray().withMessage('Subjects must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      })
    }

    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const { name, phone, profile } = req.body

    // Update basic info
    if (name) user.name = name
    if (phone) user.phone = phone

    // Update profile
    if (profile) {
      if (profile.grade) user.profile.grade = profile.grade
      if (profile.interests) user.profile.interests = profile.interests
      if (profile.subjects) user.profile.subjects = profile.subjects
    }

    await user.save()

    res.json({ 
      message: 'Profile updated successfully',
      user: user.toSafeObject()
    })

  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Save test result
router.post('/test-result', authenticateToken, [
  body('testId').notEmpty().withMessage('Test ID is required'),
  body('testName').notEmpty().withMessage('Test name is required'),
  body('score').isNumeric().withMessage('Score must be a number'),
  body('answers').isObject().withMessage('Answers must be an object')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      })
    }

    const { testId, testName, score, answers } = req.body

    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Remove existing result for this test
    user.profile.testResults = user.profile.testResults.filter(
      result => result.testId !== testId
    )

    // Add new result
    user.profile.testResults.push({
      testId,
      testName,
      score,
      answers,
      completedAt: new Date()
    })

    await user.save()

    res.json({ 
      message: 'Test result saved successfully',
      testResults: user.profile.testResults
    })

  } catch (error) {
    console.error('Save test result error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Get test results
router.get('/test-results', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ testResults: user.profile.testResults })
  } catch (error) {
    console.error('Get test results error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Save recommendation
router.post('/recommendation', authenticateToken, [
  body('type').isIn(['college', 'school', 'profession']).withMessage('Invalid recommendation type'),
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('match').isNumeric().withMessage('Match must be a number'),
  body('details').optional().isObject().withMessage('Details must be an object')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      })
    }

    const { type, title, description, match, details } = req.body

    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.profile.recommendations.push({
      type,
      title,
      description,
      match,
      details: details || {},
      saved: false
    })

    await user.save()

    res.json({ 
      message: 'Recommendation saved successfully',
      recommendations: user.profile.recommendations
    })

  } catch (error) {
    console.error('Save recommendation error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Get recommendations
router.get('/recommendations', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ recommendations: user.profile.recommendations })
  } catch (error) {
    console.error('Get recommendations error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Update recommendation (save/unsave)
router.put('/recommendation/:id', authenticateToken, [
  body('saved').isBoolean().withMessage('Saved must be a boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      })
    }

    const { id } = req.params
    const { saved } = req.body

    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const recommendation = user.profile.recommendations.id(id)
    if (!recommendation) {
      return res.status(404).json({ message: 'Recommendation not found' })
    }

    recommendation.saved = saved
    await user.save()

    res.json({ 
      message: 'Recommendation updated successfully',
      recommendation
    })

  } catch (error) {
    console.error('Update recommendation error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Update preferences
router.put('/preferences', authenticateToken, [
  body('notifications').optional().isObject().withMessage('Notifications must be an object'),
  body('privacy').optional().isObject().withMessage('Privacy must be an object')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      })
    }

    const { notifications, privacy } = req.body

    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (notifications) {
      user.preferences.notifications = { ...user.preferences.notifications, ...notifications }
    }

    if (privacy) {
      user.preferences.privacy = { ...user.preferences.privacy, ...privacy }
    }

    await user.save()

    res.json({ 
      message: 'Preferences updated successfully',
      preferences: user.preferences
    })

  } catch (error) {
    console.error('Update preferences error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Delete account
router.delete('/account', authenticateToken, [
  body('password').notEmpty().withMessage('Password is required for account deletion')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      })
    }

    const { password } = req.body

    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    await User.findByIdAndDelete(req.user.userId)

    res.json({ message: 'Account deleted successfully' })

  } catch (error) {
    console.error('Delete account error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export default router
