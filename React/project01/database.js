const mysql = require('mysql2')

const conn = mysql.createConnection({
    'host' : 'localhost',
    'user' : 'root',
    'password' : '88460000',
    // 'password' : '0000',
    'port' : 3306,
    'database' : 'project01'
})

conn.connect()

module.exports = conn;