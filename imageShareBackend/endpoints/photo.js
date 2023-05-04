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

router.get('/', async (req, res) => {
    return res.json(await Photo.find({}, 'id sourceId postedBy'))
})

router.get('/:photoId', async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.photoId)
        return res.json({
            success: true,
            data: photo
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: 'unable to retrieve to photo. Motly likely photo id is incorrect format.'
        })
    }
})

router.post('/:photoId/comment/', async (req, res) => {
    const photoId = req.params.photoid
    const photo = await Photo.findById(photoId)
    if (!photo) {
        return res.json({
            success: false,
            code: 'PHOTO_NOT_FOUND'
        })
    }
    console.log(Object.keys(photo))

})

module.exports = router
