const UserModel = require("../models/user.model")

const fetchPeople = async (req, res) => {
    try {
        const users = await UserModel.find({
            _id: {
                $nin: [req.user._id, ...req.user.followers]
            },
            name: new RegExp(req.query.search, 'i'),
        }, { name: 1, profile: 1 })
        res.status(200).send({ data: users })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'Something went wrong' })
    }
}

const fetchMyPeople = async (req, res) => {
    try {
        const users = await UserModel.find({
            _id: {
                $in: req.user.followers
            },
            name: new RegExp(req.query.search, 'i'),
        }, { name: 1, profile: 1 })
        res.status(200).send({ data: users })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'Something went wrong' })
    }
}

const followPeople = async (req, res) => {
    try {
        await UserModel.updateOne({
            _id: req.user._id
        }, {
            $push: {
                followers: req.params.userId
            }
        })
        res.status(200).send({ message: 'Follow successfully' })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'Something went wrong' })
    }
}

const unfollowPeople = async (req, res) => {
    try {
        await UserModel.updateOne({
            _id: req.user._id
        }, {
            $pull: {
                followers: req.params.userId
            }
        })
        res.status(200).send({ message: 'Unfollow successfully' })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'Something went wrong' })
    }
}

module.exports = {
    fetchPeople,
    fetchMyPeople,
    followPeople,
    unfollowPeople,
}