const Employee = require('../Models/EmployeeModel')

exports.insertUser = async (req,res) => {
    const {firstname,lastname,email,number,department,dateOfJoining,role} = req.body;
    try{
        const get_employee = await Employee.findOne({
            where:{email:email},
            logging: console.log,
        })
        if (get_employee)
        {
            return res.status(500).send(`Email already exists`);
        }

        const new_employee = await Employee.create({
            firstname:firstname,
            lastname:lastname,
            email:email,
            phone_number:number,
            department:department,
            dateOfJoining:dateOfJoining,
            role:role
        })
        return res.status(201).send(`User created successfully ${new_employee}`);
    } catch (err)
    {
        console.log(err);
        return res.status(500).send(`Internal server error ${err}`);
    }
}