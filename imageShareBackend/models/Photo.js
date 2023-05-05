const mongoose = require('mongoose')

const schema = mongoose.Schema({
    sourceId: {
        required: true,
        type: String
    },
    postedBy: {
        required: true,
        type: mongoose.Types.ObjectId
    },
    description: {
        type: String
    },
    like: {
        type: Number,
        default: 0
    },
    dislike: {
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
    },
    comments: {
        type: [{
            username: String,
            comment: String
        }],
        default: []
    }
})

module.exports = mongoose.model("Photo", schema)