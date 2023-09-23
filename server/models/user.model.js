const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const userSchema = new Schema({
    name: { type: Schema.Types.String, require: true },
    email: { type: Schema.Types.String, lowercase: true, require: true, unique: true },
    password: { type: Schema.Types.String, require: true },
    profile: { type: Schema.Types.String },
    sentFollowRequests: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    receivedFollowRequests: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    isActive: { type: Schema.Types.Boolean, default: false },
    token: { type: Schema.Types.String },
}, {
    timestamps: true,
})

module.exports = mongoose.model('user', userSchema)