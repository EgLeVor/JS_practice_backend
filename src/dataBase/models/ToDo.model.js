const Sequelize = require('sequelize');
const { sequelize } = require('..');

class ToDo extends Sequelize.Model {}

ToDo.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4
        },
        title: {
            type: Sequelize.STRING,
            defaultValue: 'title',
        },
        description: {
            type: Sequelize.STRING,
            defaultValue: 'description',
        },
        isCompleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        isFav: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        priority:
        {
            type: Sequelize.INTEGER,
            defaultValue: 1488,
        }

    },
    { sequelize: sequelize, underscored: true, modelName: 'todo', timestamps: false }
);

module.exports = ToDo