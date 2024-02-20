const express = require('express');
const mysql = require('mysql2');
const cors = require("cors");
require('dotenv').config();
// creating connection
const connection = mysql.createConnection({
    host     : process.env.DB_ADDR,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSW,
    database : process.env.DB_NAME
});

connection.connect();

// define app
const app = express();
app.use(cors({ origin: '*' }));

/**
 * Test query on drug
 */
app.get('/medoc', function (req, res) {
    console.log("getting medoc");
    connection.query('SELECT * FROM Medicaments WHERE Code_CIS = 60002283', function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    });
});

/**
 * Login page
 */
app.get('/login', function (req, res) {
    console.log("user "+req.body.firstName+" is trying to login");
    const [results, fields] = connection.execute(
        'SELECT * FROM `Utilisateurs` WHERE `Prenom` = ? AND `Mot_De_Passe` = ?',
        [req.body.firstName, req.body.password]
    );
    res.send(results)
});

// start server
app.listen(3000, () => {
    console.log('OK');
});
