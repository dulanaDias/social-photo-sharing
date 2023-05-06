const router = require('express').Router()
const User = require('../models/User')
const fs = require('fs')
const bcrypt = require('bcrypt')

const { mayIncludeStringFields, getProfilePicture } = require('../utils')

router.get('/profile', async (req, res) => {
    const data = await User.findById(req.user.id)
    const profile = {
        name: data.name,
        email: data.email,
        profilePicture: getProfilePicture(req.user.id)
    }
    
    return res.json({
        success: true,
        profile
    })
})

router.put('/profile', async (req, res) => {
    const updateInfo = req.body
    if(!mayIncludeStringFields(['name', 'email', 'password', 'profilePicture'], updateInfo)) {
        return res.status(400).json({
            success: false,
            message: "one of the fields are invalid format"
        })
    }

    // check if user already with given name and email
    if (updateInfo.email
        && await User.findOne({ email: updateInfo.email })) {
        return res.status(400).json({
            success: false,
            message: "user already exist with provide email or name",
            code: "USER_ALEADY_EXISTS" 
        })
    }
    if(updateInfo.password) {
        updateInfo.password = bcrypt.hashSync(updateInfo.password, 1)
    }
    if(updateInfo.profilePicture) 
        fs.writeFileSync(`profileImages/${req.user.id}`, updateInfo.profilePicture)
    const data = await User.findByIdAndUpdate(req.user.id, updateInfo, { returnOriginal: false })

    const profile = {
        name: data.name,
        email: data.email,
        profilePicture: fs.readFileSync(`profileImages/${data._id}`).toString('utf8')
    }

    return res.json({
        success: true,
        profile
    })
})

module.exports = router
