const sequelize = require('../util/database')
const Sequelize = require('sequelize')

const User = require('./User')

const Favorite = sequelize.define('favorite', {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    movieId: {
        type: Sequelize.INTEGER,
        primaryKey: true
    }
})

module.exports = Favorite