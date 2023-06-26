const { DataTypes } = require('sequelize');
const uuid = require('uuid');
const sequelize = require('../configs/sequelize.config');

const User = sequelize.define('users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuid.v4(),
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true,
        validate: {
            is: /^[a-zA-Z0-9]{2,60}$/,
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

(async () => {
    await User.sync({ force: false });
})();

module.exports = User;