const router = require('express').Router()
const { includeStringFields } = require('../utils')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bycrpt = require('bcrypt')

router.post('/', async (req, res) => {
    const { email, password } = req.body
    if(!includeStringFields(['email', 'password'], req.body)) {
        return res.status(400).json({
            error: true,
            message: 'provide email and password'
        })
    }
    
    const loginUser = await User.findOne({ email })
    
    if(!loginUser || !bycrpt.compareSync(password, loginUser.password))
        return res.status(401).json({
            success: false,
            code: 'INCORRECT_CREDENTIALS',
            message: 'incorrect email or password'
        })

    const token = jwt.sign({
        userId: loginUser.id
    }, process.env.jwtSecret)

    return res.json({
        success: true,
        token
    })
})

module.exports = router
