const sequelize = require('../util/database')
const Sequelize = require('sequelize')

const User = require('./User')
const Movie = require('./Movie')


const Favorite = sequelize.define('favorite', {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    movieId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: Movie,
            key: 'id'
        }
    }
})

module.exports = Favorite