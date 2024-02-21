const express = require("express");
const mysql = require('mysql2');
const cors = require("cors");

const app = express();
const port = 3000;

require('dotenv').config();
// creating connection
const connection = mysql.createConnection({
    host     : process.env.DB_ADDR,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSW,
    database : process.env.DB_NAME
});

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cors({ origin: '*' }));

app.get('/medoc', function (req, res) {
    let sql = 'SELECT * FROM Medicaments WHERE Code_CIS = 60002283'
    connection.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.json(data);
    })
});

app.post('/login', function (req, res){
    console.log('User ' + req.body.firstName + ' is trying to login');
    let sql = 'SELECT * FROM Utilisateurs WHERE Prenom = ? AND Mot_De_Passe = ?'
    let values = [
        req.body.firstName,
        req.body.passwordUser
    ];
    connection.query(sql, values, function (err, data, fields) {
        if (err) throw err;
        res.json(data);
        console.log(JSON.stringify(data))
    })

})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});