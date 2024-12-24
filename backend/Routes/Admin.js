const express = require('express')
const {registerAdmin} = require('../Controllers/addadmin');
const { loginAdmin } = require('../Controllers/adminlogin');

const router = express.Router();

router.post('/add',registerAdmin);
router.post('/login',loginAdmin);

module.exports = router;