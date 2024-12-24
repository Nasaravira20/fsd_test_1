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

exports.getUsers = async (req,res) => {
    try{
        const users = await Employee.findAll({
            logging: console.log,
            })
            return res.status(200).send(users);
        } catch (err)
            {
                console.log(err);
                return res.status(500).send(`Internal server error ${err}`);
            }
        }

exports.deleteUsers = async (req, res) => {
    const { id } = req.params;
    try {
        const userToDelete = await Employee.findByPk(id, {
            logging: console.log,
        });
        if (!userToDelete) {
            return res.status(404).send({ msg: 'User not found' });
        }
        await userToDelete.destroy();
        return res.status(200).send({ msg: 'User deleted successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ msg: 'Internal server error', error: err });
    }
}

exports.updateUsers = async (req, res) => {
    // const { id } = req.params;
    const { firstname, lastname, employee_id, email, number, department, dateOfJoining, role } = req.body;
    try {
        const userToUpdate = await Employee.findOne({
            where:{email:email},
            logging: console.log,
        })
        if (!userToUpdate) {
            return res.status(404).send({ msg: 'User not found' });
        }
        await userToUpdate.update({
            firstname: firstname,
            lastname: lastname,
            employee_id: employee_id,
            email: email,
            phone_number: number,
            department: department,
            dateOfJoining: dateOfJoining,
            role: role
        });
        return res.status(200).send({ msg: 'User updated successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ msg: 'Internal server error', error: err });
    }
}