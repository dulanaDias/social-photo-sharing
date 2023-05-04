const router = require('express').Router()
const User = require('../models/User')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { includeStringFields } = require('../utils')

router.post('/', async (req, res) => {
    if(!includeStringFields(['name', 'email', 'password'], req.body)) {
        return res.status(400).json({
            success: false,
            message: "profile basic details are missing"
        })
    }
    const { name, email, password } = req.body
    const hasProfilePicture = typeof req.body.profilePicture == "string"
    if(await User.findOne({ name, email })) {
        return res.status(400).json({
            success: false,
            code: "USER_ALEADY_EXISTS" 
        })
    }
    const newUser = await new User({
        name,
        email,
        password: bcrypt.hashSync(password, 1),
        hasProfilePicture
    }).save()
    
    if(hasProfilePicture) {
        fs.writeFileSync(`profileImages/${newUser.id}`, req.body.profilePicture)
    }
    const token = jwt.sign({
        userId: newUser.id
    }, process.env.jwtSecret)

    return res.json({
        success: true,
        message: "user registered successfully",
        token
    })
})

module.exports = router