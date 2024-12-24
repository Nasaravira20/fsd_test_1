const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:335555777777@localhost:5432/nimbus');

const Employee = sequelize.define('Employees', {
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
    employee_id: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique:true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    phone_number: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
            isNumeric: true,
        },
    },
    department: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    dateOfJoining: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
        },
    },
    role: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    createdat: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    updatedat: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    }
}, {
    tableName: 'employees',  
    timestamps: true,        
    createdAt: 'createdat',  
    updatedAt: 'updatedat',  
});

async function syncModel() {
    await sequelize.sync();
    console.log("Employees table has been created or synchronized");
}

syncModel();

module.exports = Employee;
