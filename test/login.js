const { expect } = require('chai')
const setupAssociations = require('../util/associations')
const sequelize = require('../util/database')
const { postLogin } = require('../controllers/auth')
const User = require('../models/User')
const sinon = require('sinon')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

describe('Login endpoint', () => {

    before(async () => {
        setupAssociations()

        await sequelize.sync({ force: true })
        await User.create({
            email: 'user@test.com',
            password: 'test',
            firstName: 'test',
            lastName: 'user'
        })

        sinon.stub(bcrypt, 'compare').callsFake((password, hash) => {
            return password === hash
        })

        sinon.stub(jwt, 'sign').callsFake((payload, secret) => 'test_token')
    })

    after(() => {
        bcrypt.compare.restore()
        jwt.sign.restore()
    })

    const createDummyReq = (body) => {
        return {
            body
        }
    }

    const createDummyRes = () => {
        return {
            status: function (code) {
                this.statusCode = code
                return this
            },
            json: function (data) {
                this.data = data
            }
        }
    }

    it('Should return an error response saying "invalid credentials" (email and password not sent in request).', (done) => {
        const req = createDummyReq({})
        const res = createDummyRes()

        postLogin(req, res, () => { })
            .then(() => {
                expect(res).to.have.property('statusCode', 401)
                expect(res).to.have.property('data')
                expect(res.data).to.have.property('errorMessage', 'Invalid credentials.')

                done()
            })
    })

    it('Should return an error response saying "invalid credentials" (email not sent in request).', (done) => {
        const req = createDummyReq({
            password: 'test'
        })
        const res = createDummyRes()

        postLogin(req, res, () => { })
            .then(() => {
                expect(res).to.have.property('statusCode', 401)
                expect(res).to.have.property('data')
                expect(res.data).to.have.property('errorMessage', 'Invalid credentials.')

                done()
            })
    })

    it('Should return an error response saying "invalid credentials" (password not sent in request).', (done) => {
        const req = createDummyReq({
            email: 'test@test.com'
        })
        const res = createDummyRes()

        postLogin(req, res, () => { })
            .then(() => {
                expect(res).to.have.property('statusCode', 401)
                expect(res).to.have.property('data')
                expect(res.data).to.have.property('errorMessage', 'Invalid credentials.')

                done()
            })
    })

    it('Should return an error response saying "invalid credentials" (user with email provided does not exist).', (done) => {
        const req = createDummyReq({
            email: 'test@test.com',
            password: 'test'
        })
        const res = createDummyRes()

        postLogin(req, res, () => { })
            .then(() => {
                expect(res).to.have.property('statusCode', 401)
                expect(res).to.have.property('data')
                expect(res.data).to.have.property('errorMessage', 'Invalid credentials.')

                done()
            })
    })

    it('Should return an error response saying "invalid credentials" (password is incorrect).', (done) => {
        const req = createDummyReq({
            email: 'user@test.com',
            password: 'incorrect password'
        })
        const res = createDummyRes()

        postLogin(req, res, () => { })
            .then(() => {
                expect(res).to.have.property('statusCode', 401)
                expect(res).to.have.property('data')
                expect(res.data).to.have.property('errorMessage', 'Invalid credentials.')

                done()
            })
    })

    it('Should return an authorization token.', (done) => {
        const req = createDummyReq({
            email: 'user@test.com',
            password: 'test'
        })
        const res = createDummyRes()





        postLogin(req, res, () => { })
            .then(() => {
                expect(res).to.have.property('statusCode', 200)
                expect(res).to.have.property('data')
                expect(res.data).to.have.property('token', 'test_token')

                done()
            })

    })
})