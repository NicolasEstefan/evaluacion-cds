const sequelize = require('../util/database')
const Sequelize = require('sequelize')

const AuthToken = sequelize.define('auth_token', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

module.exports = AuthToken