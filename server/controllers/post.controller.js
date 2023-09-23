const PostModel = require('../models/post.model');

const createPost = async (req, res) => {
    try {
        const { message } = req.body
        await PostModel({
            content: message,
            userId: req.user._id,
        }).save()
        res.status(201).send({ message: 'Post created successfully' })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'Something went wrong' })
    }
}

const getPosts = async (req, res) => {
    try {
        const posts = await PostModel
            .find({ userId: { $in: [req.user._id, ...req.user.followers] } })
            .populate('userId', 'name')
            .sort({ createdAt: -1 })
            .lean()

        res.status(200).send({ data: posts })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'Something went wrong' })
    }
}

const likePost = async (req, res) => {
    try {
        const { postId } = req.params
        await PostModel.updateOne({ _id: postId }, {
            $push: {
                likes: req.user._id
            }
        })
        res.status(201).send({ message: 'Post like successfully' })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'Something went wrong' })
    }
}

const unlikePost = async (req, res) => {
    try {
        const { postId } = req.params
        await PostModel.updateOne({ _id: postId }, {
            $pull: {
                likes: req.user._id
            }
        })
        res.status(201).send({ message: 'Post like successfully' })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'Something went wrong' })
    }
}

const commentPost = async (req, res) => {
    try {
        const { postId } = req.params
        const { comment } = req.body
        await PostModel.updateOne({ _id: postId }, {
            $push: {
                comments: {
                    comment: comment,
                    userId: req.user._id,
                }
            }
        })
        res.status(201).send({ message: 'Post comment successfully' })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'Something went wrong' })
    }
}

module.exports = {
    createPost,
    getPosts,
    likePost,
    unlikePost,
    commentPost,
}