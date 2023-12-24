const mysql = require("mysql2/promise");

let connection = {};

const getMySQLConnection = (configKey) => {
    if (!connection[configKey]) {
        connection[configKey] = mysql.createPool({
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            waitForConnections: true,
            database: process.env.MYSQL_DEFAULT_DB,
            connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
        });
    }
    return connection[configKey];
};

const getConnection = async (configKey = "default") => {
    return await getMySQLConnection(configKey);
};

module.exports = { getConnection };
