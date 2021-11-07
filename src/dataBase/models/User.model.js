const Sequelize = require('sequelize');
const { sequelize } = require('..');
const ToDo = require('./ToDo.model');
const Token = require('./Token.model');

class User extends Sequelize.Model {}

User.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4
        },
        login: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        }
    },
    { sequelize: sequelize, underscored: true, modelName: 'user', timestamps: false }
);

User.hasMany(ToDo)
User.hasMany(Token)
ToDo.belongsTo(User, {foreignKey: 'userId'})
Token.belongsTo(User, {foreignKey: 'userId'})

module.exports = User;