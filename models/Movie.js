const sequelize = require('../util/database')
const Sequelize = require('sequelize')

const Movie = sequelize.define('movie', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    data: {
        type: Sequelize.JSON,
        allowNull: false
    }
})

module.exports = Movie