const mysql = require('mysql2')

const conn = mysql.createConnection({
    'host' : 'localhost',
    'user' : 'root',
    'password' : '1234',
    'port' : 3306,
    'database' : 'project01'
})

conn.connect()

module.exports = conn;