const jwt = require('jsonwebtoken')
const AuthToken = require('../models/AuthToken')
const User = require('../models/User')

module.exports = async (req, res, next) => {
    const authHeader = req.headers['authorization']

    const sendUnauthorizedError = () => {
        res.status(403).json({ errorMessage: 'User unauthorized for the requested resource.' })
    }

    if (!authHeader) {
        sendUnauthorizedError()
        return
    }

    let payload

    try {
        // if the token has been tampered with or is not a valid token, jwt.verify will throw an error
        payload = jwt.verify(authHeader, process.env['TOKEN_SECRET'])

    } catch (err) {
        sendUnauthorizedError()
        return
    }

    try {
        const authToken = await AuthToken.findByPk(payload['id'], { include: User })

        if (!authToken) {
            sendUnauthorizedError()
            return
        }

        req.user = authToken.user
        req.authToken = authToken
        next()

    } catch (err) {
        console.log(err)
        next(err)
    }
}