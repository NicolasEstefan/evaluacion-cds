const Sequelize = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env['NODE_ENV'] === 'test' ? process.env['TEST_DB_ROUTE'] : process.env['DB_ROUTE'],
    logging: false
})

module.exports = sequelize