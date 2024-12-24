// const mongoose = require('mongoose');
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:335555777777@localhost:5432/nimbus');


const Admin = sequelize.define('Admin',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstname: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    lastname: {
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
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        },
});

async function syncModel() {
    await sequelize.sync();
    console.log('admin created successfully')
}
syncModel();

// module.exports = mongoose.model('Admin', adminSchema);
module.exports = Admin;