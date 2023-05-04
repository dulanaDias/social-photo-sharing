const router = require('express').Router()
const Photo = require('../models/Photo')
const fs = require('fs')

router.post('/', async (req, res) => {
    const base64Content = req.body.image
    const sourceId = `${req.user.id}-${Date.now().toString()}`
    fs.writeFile(`images/${sourceId}`, base64Content, (err) => {
        console.log(`error has occured ${err}`)
    })
    const newImage = await new Photo({ sourceId, postedBy: req.user.id }).save()
    return res.json({
        success: true,
        message: "photo successfully uploaded",
        image: newImage
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
