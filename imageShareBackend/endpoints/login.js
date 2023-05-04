const router = require('express').Router()
const { includeStringFields } = require('../utils')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

router.post('/', async (req, res) => {
    const { email, password } = req.body
    if(!includeStringFields(['email', 'password'], req.body)) {
        return res.status(400).json({
            error: true,
            message: 'provide email and password'
        })
    }
    
    const loginUser = await User.findOne({
        email,
        password
    })

    if(!loginUser) return res.status(401).json({
        login: false,
        code: 'INCORRECT_CREDENTIALS',
        message: 'incorrect email or password'
    })

    const token = jwt.sign({
        userId: loginUser.id
    }, process.env.jwtSecret)

    return res.json({
        login: true,
        token
    })
})

router.post('/:photoId/comment/', async (req, res) => {
    const photoId = req.params.photoid
    const photo = await Photo.findById(photoId)
    if(!photo) {
        return res.json({
            success: false,
            code: 'PHOTO_NOT_FOUND' 
        })
    }
    console.log(Object.keys(photo))
    
})

module.exports = router
