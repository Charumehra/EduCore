const rateLimit = require('express-rate-limit')

const loginLimiter = rateLimit({
    windowMs:15 * 60 * 1000,
    max: 5,
    message: {
    success: false,
    message: "Too many login attempts. Try again later."
  }
})

const aiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 20,
    message:{
    success: false,
    message: "Too many requests. Try again later."
    }
})

module.exports = {loginLimiter, aiLimiter}