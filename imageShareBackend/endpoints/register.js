const router = require('express').Router()
const User = require('../models/User')
const fs = require('fs')
const jwt = require('jsonwebtoken')

const areStringFields = (fields, body) => {
    return fields.reduce((isStringType, field) => 
        isStringType && typeof body[field] == 'string'
    , true)
}

router.post('/', async (req, res) => {
    if(!areStringFields(['name', 'email', 'password'], req.body)) {
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
        password,
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
