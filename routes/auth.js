const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const AuthToken = require('../models/AuthToken')

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

router.post('/login', (req, res, next) => {

})

router.post('/logout', (req, res, next) => {

})

module.exports = router