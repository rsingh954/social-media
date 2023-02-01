const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
/*
@desc Register a new user
@route /api/users
@access Public

*/
// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    console.log(req.body)
    // Validation
    if (!username || !email || !password) {
      res.status(400)
      throw new Error('Please include all fields')
    }
  
    // Find if user already exists
    const userExists = await User.findOne({ email })
  
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
  
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
  
    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    })
    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new error('Invalid user data')
    }
  })
/*
@desc login a new user
@route /api/users/login
@access Public

*/
// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    // Check user and passwords match
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(401)
      throw new Error('Invalid credentials')
    }
  })
  
/*
@Get current user
@route /api/users/me
@access Private
*/
const getMe =  asyncHandler(async (req, res) => {
    const user  = {
        id: req.user._id,
        email: req.user.email,
        username: req.user.username
    }
    res.status(200).json(user)
})
//Generate token
const generateToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}
module.exports= {registerUser, loginUser,getMe}

/*
    We will be able to use that token to do other things throughtout the application
*/