const express = require('express');
const db = require('./db');


const app = express();
app.use(express.json());
var cors = require('cors');
app.use(cors());
app.options('*', cors());
app.use(express.urlencoded({extended:true}));

const users = require('./Routes/User')
const employee = require('./Routes/Employee');
const admin = require('./Routes/Admin')

app.use('/api/users',users);
app.use('/api/employee',employee);
app.use('/api/admin',admin);
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});