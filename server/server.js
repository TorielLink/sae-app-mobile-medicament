const express = require('express');
const mysql = require('mysql');
const cors = require("cors");
require('dotenv').config();


const connection = mysql.createPool({
    host     : process.env.DB_ADDR,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSW,
    database : process.env.DB_NAME
});

const app = express();
app.use(cors({ origin: '*' }));

app.get('/medoc', function (req, res) {
    connection.getConnection(function (err, connection) {
        connection.query('SELECT * FROM Medicaments WHERE Code_CIS = 60002283', function (error, results, fields) {
            if (error) throw error;
            res.send(results)
        });
    });
});

// Starting our server.
app.listen(3000, () => {
    console.log('Go to http://localhost:3000/medoc so you can see the data.');
});