import mysql = require("mysql");
const mysqlConfig = require("../config/mysql.config");
const sql = mysql.createConnection(mysqlConfig);
sql.connect();
export = sql;