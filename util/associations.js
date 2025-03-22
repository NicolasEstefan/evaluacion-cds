const User = require('../models/User')
const Favorite = require('../models/Favorite')
const AuthToken = require('../models/AuthToken')

module.exports = () => {
    User.hasMany(Favorite, { foreignKey: 'userId', onDelete: 'CASCADE' })
    Favorite.belongsTo(User, { foreignKey: 'userId' })
    AuthToken.belongsTo(User, { onDelete: 'CASCADE' })
    User.hasMany(AuthToken)
}