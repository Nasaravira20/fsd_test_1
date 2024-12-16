const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const users = require('./Routes/User')
const employee = require('./Routes/Employee');

app.use('/api/users',users);
app.use('/api/employee',employee);
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});