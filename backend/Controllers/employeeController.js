const Employee = require('../Models/EmployeeModel')

exports.insertUser = async (req,res) => {
    const {firstname,lastname,employee_id,email,number,department,dateOfJoining,role} = req.body;
    try{
        
        const get_employee_bymail = await Employee.findOne({
            where:{email:email},
            logging: console.log,
        })
        if (get_employee_bymail)
        {
            console.log(get_employee_bymail)
            return res.status(500).send({"msg":`Email already exists`,"user":`${get_employee_bymail.dataValues.firstname}`});
        }

        const get_employee_byempid = await Employee.findOne({
            where:{employee_id:employee_id},
            logging: console.log,
        })
        if (get_employee_byempid)
        {
            return res.status(500).send({"msg":`Employee id already exists`,"user":`${get_employee_byempid.dataValues.firstname}`});
        }

        const new_employee = await Employee.create({
            firstname:firstname,
            lastname:lastname,
            employee_id:employee_id,
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