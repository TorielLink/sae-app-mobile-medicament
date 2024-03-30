const express = require("express");
const mysql = require('mysql2');
const cors = require("cors");

const app = express();

require('dotenv').config();

// constants
const port = process.env.PORT ?? 8100;
const MIN_LENGTH_PASSWORD_USER = 5;
const MIN_LENGTH_NAME_USER = 1;
const HOME_REP_SERVER = "/saeGestionMedicaments";//pour un serveur en local, modifier par ""

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
 * Search for a drug by CIS code
 */
app.post(`${HOME_REP_SERVER}/searchDrug`, function (req, res) {
    let sql = 'SELECT M.Code_CIS, M.Denomination FROM Medicaments M INNER JOIN Correspondances C ON M.Code_CIS = C.Code_CIS WHERE M.Code_CIS LIKE ? OR C.Code_CIP7 LIKE ? OR C.Code_CIP13 LIKE ? LIMIT 20';
    let values = [
        `${req.body.CIS}%`,
        `${req.body.CIS}%`,
        `${req.body.CIS}%`
    ];
    executeQuery(sql, values, function (error, result){
        if(error){
            res.status(500).json(error);
        }
        else {
            res.json(result);
        }
    });
});

/**
 * Get user's drugs on the Ordonnance table
 */
app.post(`${HOME_REP_SERVER}/getOrdonances`, function (req, res) {
    let sql = 'SELECT O.Code_CIS, M.Denomination, O.Quantité FROM Ordonnance O INNER JOIN Medicaments M ON O.Code_CIS = M.Code_CIS WHERE Id_Utilisateur = ?';
    let values = [
        req.body.idUser
    ];
    executeQuery(sql, values, function (error, result){
        if(error){
            res.status(500).json(error);
        }
        else {
            res.json(result);
        }
    });
});

/**
 * Add a signalement
 */
app.post(`${HOME_REP_SERVER}/addSignalement`, function (req, res){
    let sqlCIP = 'SELECT C.Code_CIS FROM Correspondances C WHERE C.Code_CIS = ? OR C.Code_CIP7 = ? OR C.Code_CIP13 = ?';
    let values = [
        req.body.CIP,
        req.body.CIP,
        req.body.CIP
    ];
    executeQuery(sqlCIP, values, function (error, result){
        if(error){
            res.status(500).json(error);
        }
        else {
            if(result.length > 0){
                makeTheSignalement(res, result[0].Code_CIS)
            }
            else {
                res.status(500).json("noData");
            }
        }
    });
});

/**
 * really make the signalement
 */
function makeTheSignalement(res, codeCIS) {
    let sqlCheck = 'SELECT S.Code_CIS FROM Signalements S WHERE S.Code_CIS = ?';
    let valuesCheck = [
        codeCIS,
        codeCIS,
        codeCIS
    ];

    executeQuery(sqlCheck, valuesCheck, function (error, result) {
        if (error) {
            res.status(500).json(error);
        } else {
            if (result.length > 0) {
                let sqlUpdate = 'UPDATE Signalements SET Nb_Signalement = Nb_Signalement + 1 WHERE Code_CIS = ?';
                let valuesUpdate = [codeCIS];

                executeQuery(sqlUpdate, valuesUpdate, function (error, result) {
                    if (error) {
                        res.status(500).json(error);
                    } else {
                        res.json({ message: 'Médicament signalé avec succès' });
                    }
                });
            } else {
                let sqlInsert = 'INSERT INTO Signalements (Code_CIS) VALUES (?)';
                let valuesInsert = [codeCIS];

                executeQuery(sqlInsert, valuesInsert, function (error, result) {
                    if (error) {
                        res.status(500).json(error);
                    } else {
                        res.json({ message: 'Médicament signalé avec succès' });
                    }
                });
            }
        }
    });
}

/**
 * Remove drug from user's Ordonnance table
 */
app.post(`${HOME_REP_SERVER}/removeDrug`, function (req, res) {
    let sql = 'DELETE FROM Ordonnance WHERE Id_Utilisateur = ? AND Code_CIS = ?';
    let values = [
        req.body.idUser,
        req.body.CIS
    ];
    executeQuery(sql, values, function (error, result){
        if(error){
            res.status(500).json(error);
        }
        else {
            res.send('OK');
        }
    });
});

/**
 * Login
 */
app.post(`${HOME_REP_SERVER}/login`, function (req, res){
    console.log('User "' + req.body.firstName + ' ' + req.body.lastName + '" is trying to login');
    let sql = 'SELECT Id_Utilisateur, Prenom, Nom_Famille, Admin FROM Utilisateurs WHERE Prenom = ? AND Nom_Famille = ? AND Mot_De_Passe = ?';
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
 * Create an account
 */
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
 * Update user's information
 */
app.post(`${HOME_REP_SERVER}/updateProfile`, function (req, res){
    //TODO ne fonctionne pas
    //piste : tu selectionne en fonction de firstName sauf que dans le corps de la requete c'est le meme qui est le nouveau
    const { firstName, lastName, password } = req.body;
    let idUser = -1;

    let updateFields = [];
    if (firstName) {
        updateFields.push("`firstname` = '" + firstName + "'");
    }
    if (lastName) {
        updateFields.push("`lastname` = '" + lastName + "'");
    }
    if (password) {
        updateFields.push("`password` = '" + password + "'");
    }

    if (updateFields.length > 0) {
        let updateFieldsString = updateFields.join(", ");
        sql = "UPDATE Utilisateurs SET " + updateFieldsString + " WHERE Id_Utilisateur = ?";
        getIdUser(req.body.firstName, req.body.lastName, function (error, result) {
            if (error) {
                res.status(500).json(error);
            } else {
                idUser = result[0].Id_Utilisateur;
                let values = [
                    idUser
                ];
                executeQuery(sql, values, function (error, result) {
                    if (error) {
                        console.error(error);
                        res.status(500).json(error);
                    } else {
                        res.status(200).json('User information updated successfully');
                    }
                });
            }
        });
    } else {
        res.status(400).json('No fields to update');
    }
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

/**
 * Add a drug to the user's Ordonance table
 */
app.post(`${HOME_REP_SERVER}/prescription`, function (req, res){
    //TODO a faire
    let sql = 'INSERT INTO Ordonnance(ID_UTILISATEUR, CODE_CIS, QUANTITÉ) VALUES (?, ?, ?)';
    let idUser = -1;
    let quantity = req.body.quantityMedoc;
    if(quantity < 0){
        res.send("Error : negative quantity");
        return;
    }
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
                quantity
            ];
            executeQuery(sql, values, function(error, result){
                if(error){
                    res.status(500).json(error);
                }
                else {
                    res.send("OK");
                }
            })
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});