const mongoose = require('mongoose')

const schema = mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    love: {
        type: Number,
        default: 0
    },
    funny: {
        type: Number,
        default: 0
    }
})


module.exports = mongoose.model("Comment", schema)