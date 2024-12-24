const Admin = require('../Models/AdminModel'); 
const { encryptData } = require('../utils/encryption'); 

const registerAdmin = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const get_employee_bymail = await Admin.findOne({
            where:{email:email},
            logging: console.log,
        })
        if (get_employee_bymail)
        {
            console.log(get_employee_bymail)
            return res.status(500).send({"msg":`Email already exists`,"user":`${get_employee_bymail.dataValues.firstname}`});
        }

        // const encryptedPhone = await encryptData(phone);
        const encryptedPassword = await encryptData('welcome');

        const newAdmin = await Admin.create({
            firstname:firstname,
            lastname:lastname,
            email: email,
            password: encryptedPassword
        });


        res.status(201).json({ message: 'Admin registered successfully', Admin: newAdmin });
    } catch (error) {
        console.error('Error registering Admin:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { registerAdmin };