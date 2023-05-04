const router = require('express').Router()
const User = require('../models/User')
const fs = require('fs')
const { mayIncludeStringFields } = require('../utils')

router.put('/', async (req, res) => {
    const updateInfo = req.body
    if(!mayIncludeStringFields(['name', 'email', 'password', 'profilePicture'], updateInfo)) {
        return res.status(400).json({
            success: false,
            message: "one of the fields are invalid format"
        })
    }

    const { email, name } = updateInfo

    // check if user already with given name and email
    if ((name || email)
        && await User.findOne({ ...{ name, email } })) {
        return res.status(400).json({
            success: false,
            message: "user already exist with provide email or name",
            code: "USER_ALEADY_EXISTS" 
        })
    }
    
    if(updateInfo.profilePicture) 
        fs.writeFileSync(`profileImages/${req.user.id}`, updateInfo.profilePicture)
    const updatedUser = await User.findByIdAndUpdate(req.user.id, updateInfo, { returnOriginal: false })

    return res.json({
        success: true,
        data: updatedUser
    })
})

module.exports = router
