const User = require('../models/User')
const Favorite = require('../models/Favorite')
const AuthToken = require('../models/AuthToken')
const Movie = require('../models/Movie')

module.exports = () => {
    User.belongsToMany(Movie, { through: Favorite })
    Movie.belongsToMany(User, { through: Favorite })
    AuthToken.belongsTo(User, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
    User.hasMany(AuthToken)
}