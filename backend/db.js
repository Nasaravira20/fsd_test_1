const { Pool } = require('pg');

const pool = new Pool({
  user: 'nimbus',
  password: '335555777777',
  host: 'postgres',
  port: 5432, 
  database: 'nimbus'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};