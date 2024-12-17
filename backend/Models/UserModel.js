
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://nimbus:335555777777@localhost:5432/nimbus');

const User = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    createdat: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    }
}, {
    tableName: 'users',  
    timestamps: false,   
});

async function syncModel() {
    await sequelize.sync();
    console.log("Users table has been created or synchronized");
}

syncModel();

module.exports = User;
