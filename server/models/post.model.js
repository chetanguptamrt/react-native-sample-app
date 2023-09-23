const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const postSchema = new Schema({
    content: { type: Schema.Types.String, require: true },
    media: [{ type: Schema.Types.String }],
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    likes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    comments: [
        new Schema({
            userId: { type: Schema.Types.ObjectId, ref: 'user' },
            comment: { type: Schema.Types.String }
        }, {
            timestamps: { createdAt: true }
        })
    ],
}, {
    timestamps: true,
});

module.exports = mongoose.model('post', postSchema)