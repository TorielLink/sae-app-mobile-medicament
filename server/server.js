const express = require("express");
const mysql = require('mysql2');
const cors = require("cors");

const app = express();

require('dotenv').config();

// constants
const port = process.env.PORT ?? 8100;
const MIN_LENGTH_PASSWORD_USER = 5;
const MIN_LENGTH_NAME_USER = 1;
const HOME_REP_SERVER = "/saeGestionMedicaments";//TODO pour faire en local modifier par ""

// creating connection
const connection = mysql.createConnection({
    host     : process.env.DB_ADDR ?? 'defineHostPlease',
    user     : process.env.DB_USER ?? 'defineUserPlease',
    password : process.env.DB_PASSW ?? 'definePasswordPlease',
    database : process.env.DB_NAME ?? 'defineDatabasePlease'
});

// verify connection
connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cors({ origin: '*' }));

/**
 * execution of a query on the database. The result is returned as ASYNC
 * @param query the sql query
 * @param values the values to use in the query
 * @param callback the callback function
 */
function executeQuery(query, values, callback) {
    connection.query(query, values, function (err, results) {
        return callback(err, results);
    });
}

/**
 * Get User ID from first and last name
 * @param firstName first name of the user
 * @param lastName last name of the user
 * @param callback callback function
 */
function getIdUser(firstName, lastName, callback) {
    let sql = 'SELECT Utilisateurs.Id_Utilisateur FROM Utilisateurs WHERE Prenom = ? AND Nom_Famille = ?';
    let values = [
        firstName,
        lastName
    ];
    executeQuery(sql, values, function (error, result){
        return callback(error, result);
    });
}

/**
 * Homepage of the server
 */
app.get(`${HOME_REP_SERVER}/`, function (req, res){
    res.send("Server OK, please read the documentation to know how to use it.");
});

/**
 * Test query on drug
 * TODO : remove
 */
app.get(`${HOME_REP_SERVER}/medoc`, function (req, res) {
    let sql = 'SELECT * FROM Medicaments WHERE Code_CIS = 60002283';
    executeQuery(sql, [], function (error, result){
        if(error){
            res.status(500).json(error);
        }
        else {
            res.json(result);
        }
    });
});

/**
 * Login
 */
app.post(`${HOME_REP_SERVER}/login`, function (req, res){
    console.log('User "' + req.body.firstName + ' ' + req.body.lastName + '" is trying to login');
    let sql = 'SELECT Utilisateurs.Id_Utilisateur, Utilisateurs.Prenom, Utilisateurs.Nom_Famille FROM Utilisateurs WHERE Prenom = ? AND Nom_Famille = ? AND Mot_De_Passe = ?';
    let values = [
        req.body.firstName,
        req.body.lastName,
        req.body.passwordUser
    ];
    executeQuery(sql, values, function(error, result){
        if(error){
            res.status(500).json(error);
        }
        else {
            res.json(result);
        }
    });
});

app.post(`${HOME_REP_SERVER}/createAccount`, function (req, res){
    if(req.body.passwordUser.length < MIN_LENGTH_PASSWORD_USER || req.body.firstName < MIN_LENGTH_NAME_USER || req.body.lastName < MIN_LENGTH_NAME_USER){
        res.status(500).json({errorMessage: 'Un des champs est trop court.'});
        return;
    }
    let sql = 'INSERT INTO Utilisateurs(Prenom, Nom_Famille, Mot_De_Passe) VALUES (?, ?, ?)';
    let values = [
        req.body.firstName,
        req.body.lastName,
        req.body.passwordUser
    ];
    executeQuery(sql, values, function(error, result){
        if(error){
            res.status(500).json(error);
        }
        else {
            res.json(result);
        }
    });
});


/**
 * Delete profile
 */
app.post(`${HOME_REP_SERVER}/delete`, function (req, res){
    let sql1 = 'DELETE FROM Ordonnance WHERE Id_Utilisateur = ?';
    let sql2 = 'DELETE FROM Utilisateurs WHERE Id_Utilisateur = ?';
    let idUser = -1;
    getIdUser(req.body.firstName, req.body.lastName, function (error, result){
        if(error){
            console.error(error);
            res.status(500).json(error);
        }
        else {
            idUser = result[0].Id_Utilisateur;
            let values = [
                idUser
            ];
            executeQuery(sql1, values, function (error, result) {
                if (error) {
                    console.error(error);
                    res.status(500).json(error);
                } else {
                    executeQuery(sql2, values, function (error, result) {
                        if (error) {
                            console.error(error);
                            res.status(500).json(error);
                        } else {
                            if (result.affectedRows === 0) {
                                console.error("no data found // wrong ID");
                                res.status(500).send('ERROR');
                            } else {
                                res.send('DELETED');
                            }
                        }
                    });
                }
            });
        }
    });
});

app.post(`${HOME_REP_SERVER}/prescription`, function (req, res){
    let sql = 'INSERT INTO Ordonnance(ID_UTILISATEUR, CODE_CIS, QUANTITÉ) VALUES (?, ?, ?)';
    let idUser = -1;
    getIdUser(req.body.firstName, req.body.lastName, function (error, result){
        if(error){
            console.error(error);
            res.status(500).json(error);
        }
        else {
            idUser = result[0].Id_Utilisateur;
            let values = [
                idUser,
                req.body.idMedoc,
                req.body.quantityMedoc//TODO check >0
            ];
            executeQuery(sql, values, function(error, result){
                if(error){
                    res.status(500).json(error);
                }
                else {
                    res.json(result);
                }
            })
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});