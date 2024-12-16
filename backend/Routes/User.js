const { getUserinfo, inserUser, getUserinfobyemail } = require('../Controllers/userController');
const db = require('../db')
const express = require('express')


const router = express.Router();

router.get('/allusers', getUserinfo)
router.post('/adduser',inserUser);
router.post('/getuser',getUserinfobyemail);

module.exports = router;