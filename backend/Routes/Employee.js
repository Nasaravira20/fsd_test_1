const express = require('express');
const { insertUser, getUsers, deleteUsers, updateUsers } = require('../Controllers/employeeController');

const router = express.Router();

router.post('/add',insertUser);
router.get('/getall',getUsers);
router.delete('/delete/:id',deleteUsers);
router.put('/update',updateUsers);

module.exports = router;