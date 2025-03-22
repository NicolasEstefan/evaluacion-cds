const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const AuthToken = require('../models/AuthToken')
const isAuth = require('../middleware/auth')

const router = express.Router()

router.post('/signup', async (req, res, next) => {
    const { email, password, firstName, lastName } = req.body

    if (!email || !password || !firstName || !lastName) {
        res.status(400).json({ errorMessage: "Must specify email, password, firstName and lastName." })
        return
    }

    try {
        const user = await User.findOne({ where: { email } })

        if (user) {
            res.status(400).json({ errorMessage: "User with provided email already exists." })
            return
        }

        const passwordHash = await bcrypt.hash(password, 12)

        await User.create({
            email,
            password: passwordHash,
            firstName,
            lastName
        })

        res.status(201).json({ message: "User created successfully." })
    } catch (err) {
        console.log(err)
        next(err)
    }
})

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body

    const sendInvalidCredentialsError = () => {
        res.status(401).json({ errorMessage: "Invalid credentials." })
    }

    if (!email || !password) {
        sendInvalidCredentialsError()
        return
    }

    try {

        const user = await User.findOne({ where: { email } })

        if (!user) {
            sendInvalidCredentialsError()
            return
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            sendInvalidCredentialsError()
            return
        }

        const authToken = await AuthToken.create({ userId: user.id })
        const signedToken = jwt.sign({ id: authToken.id }, process.env['TOKEN_SECRET'])

        res.status(200).json({ token: signedToken })

    } catch (err) {
        console.log(err)
        next(err)
    }

})

router.post('/logout', isAuth, async (req, res, next) => {

    try {
        await req.authToken.destroy()

        res.status(200).json({ message: 'Logged out successfully.' })

    } catch (err) {
        console.log(err)
        next(err)
    }
})

module.exports = router