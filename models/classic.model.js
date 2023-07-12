const { DataTypes } = require('sequelize');
const uuid = require('uuid');
const sequelize = require('../configs/sequelize.config');

const User = sequelize.define('users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuid.v4(),
        primaryKey: true,
    },
 
    fullname: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: false,
    },
    phoneNumber:  {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true,
            validate: {
                is: /^[0-9]{11,15}$/,
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
    facultyName : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    departmentName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    classRoll: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    registrationNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    session: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    universityMeritPosition: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fatherName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    motherName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bloodGroup: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    religion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    presentAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    permanentAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hallName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    residentialType: {
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