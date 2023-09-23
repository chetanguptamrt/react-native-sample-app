const UserModel = require('../models/user.model')
const { sendEmail } = require('../helper/email')
const crypto = require('crypto')
const { encryptPassword, comparePassword } = require('../helper/bcrypt')
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const isEmailExists = await UserModel.exists({ email: email.trim() });
        if (isEmailExists)
            return res.status(400).json({ message: 'Email already exists.' })

        const token = crypto.randomBytes(20).toString('hex')
        await UserModel({
            name: name.trim(),
            email: email.trim(),
            password: await encryptPassword(password),
            token: token,
        }).save();

        sendEmail({
            to: email.trim(),
            subject: 'Email verification',
            body: `Please click to following link to verify your email ${process.env.DOMAIN}verify/${token}`
        })
        res.status(201).send({ message: 'Signup successfully' })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'Something went wrong.' })
    }
}

const verifyToken = async (req, res) => {
    try {
        const { token } = req.params;
        const user = await UserModel.findOne({ token });
        if (!user)
            return res.status(400).send({ message: 'Invalid token' })

        user.token = undefined;
        user.isActive = true;
        await user.save()

        res.status(200).send({ message: 'Verify successfully' })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'Something went wrong.' })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email.trim() });
        if (!user)
            return res.status(400).send({ message: 'Invalid credentials' })

        if (!await comparePassword(password, user.password))
            return res.status(400).send({ message: 'Invalid credentials' })

        if (!user.isActive)
            return res.status(400).send({ message: 'User is not active' })

        const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY)

        res.status(200).send({ message: 'Login successfully', token })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'Something went wrong.' })
    }
}

const validateSession = async (req, res) => {
    try {
        const { authorization } = req.headers
        if (authorization) {
            const token = authorization.split(' ')[1]
            if (token) {
                const json = jwt.verify(token, process.env.JWT_KEY)
                const user = await UserModel.findOne({ _id: json.userId }, { name: 1, email: 1 });
                if (user) {
                    return res.status(200).send({ message: 'Token validate', session: user })
                } else {
                    return res.status(400).send({ message: 'Token Expire' })
                }
            } else {
                return res.status(400).send({ message: 'Token Expire' })
            }
        } else {
            return res.status(400).send({ message: 'Token Expire' })
        }
    } catch (err) {
        console.log(err)
        return res.status(400).send({ message: 'Token Expire' })
    }
}

const verifyJwt = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (authorization) {
            const token = authorization.split(' ')[1]
            if (token) {
                const json = jwt.verify(token, process.env.JWT_KEY)
                const user = await UserModel.findOne({ _id: json.userId }).lean();
                if (user) {
                    req['user'] = user;
                    return next()
                } else {
                    return res.status(400).send({ message: 'Token Expire' })
                }
            } else {
                return res.status(400).send({ message: 'Token Expire' })
            }
        } else {
            return res.status(400).send({ message: 'Token Expire' })
        }
    } catch (err) {
        console.log(err)
        return res.status(400).send({ message: 'Token Expire' })
    }
}

module.exports = {
    signup,
    verifyToken,
    login,
    validateSession,
    verifyJwt,
}