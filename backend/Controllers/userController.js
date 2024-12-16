const db = require('../db');
const User = require('../Models/UserModel');
const { get } = require('../Routes/User');

// exports.getUserinfo = async (req, res) => {
//     try {
//       const result = await db.query('SELECT * FROM users');
//       res.json(result.rows);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Internal Server Error');
//     }
//   };

exports.getUserinfo = async (req,res) => {
    try{
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).send(`Internal server error ${err}`);
    }
}

exports.getUserinfobyemail = async (req,res) =>{
    const {email} = req.body;
    console.log(email);

    try{
        const get_user = await User.findOne({
            where:{email:email},
            logging: console.log,
            
        })
        if (!get_user) return res.status(404).send(`User not found`);
        return res.json(get_user);
    } catch (err){
        return res.status(500).send(`Internal server error ${err}`);
    }
}

exports.inserUser = async (req,res) => {
    const {name,email} = req.body;
    try{
        const newUser = await User.create({
            name:name,
            email:email,
        })
        res.json(newUser);
    } catch (err) {
        console.log(err);
        res.status(500).send(`Internal server error ${err}`);
    }
}

