const User = require('../models/User')
const Favorite = require('../models/Favorite')
const AuthToken = require('../models/AuthToken')

module.exports = () => {
    User.hasMany(Favorite, { foreignKey: { name: 'userId', allowNull: false }, onDelete: 'CASCADE' })
    Favorite.belongsTo(User)
    AuthToken.belongsTo(User, { onDelete: 'CASCADE', foreignKey: { allowNull: false } })
    User.hasMany(AuthToken)
}