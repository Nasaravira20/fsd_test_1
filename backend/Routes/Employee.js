const express = require('express');
const { insertUser } = require('../Controllers/employeeController');

const router = express.Router();

router.post('/add',insertUser);

module.exports = router;