const mysql = require('mysql');
const dotenv = require('dotenv');

function getConfig() {
    return dotenv.config({path: __approot + '/.env'});
}

function getDb() {
    let config = getConfig();
    return mysql.createConnection({
        host: config.parsed.DB_HOST,
        user: config.parsed.DB_USER,
        database: config.parsed.DB_NAME,
        password: config.parsed.DB_PASS
    });
}


exports.getAllDrugs = (req, res) => {
    let db = getDb();
    let query = "SELECT * FROM Drugs";
    db.connect();

    db.query(query, (err, rows, fields) => {
        res.send(rows);
    });

    db.end();
}


exports.deleteDrug = (req, res) => {
    let db = getDb();
    let query = "DELETE FROM Drugs WHERE drug_name = ?";
    db.connect();

    db.query(query, [req.body.drug_name],(err, rows, fields) => {
        console.log(req.body);
        res.send(req.body);
    });

    db.end();
}


exports.getUserByEmail = (req, res) => {
    let db = getDb();
    let query = "SELECT * FROM Users WHERE email = ?";
    db.connect();

    db.query(query, [req.query.email], (err, rows, fields) => {
        rows[0]['isAdmin'] = (rows[0]['isAdmin'] === 1);
        res.send(rows[0]);
    });

    db.end();
}

exports.checkIfInBasket = (req, res) => {
    let db = getDb();
    let query = "SELECT EXISTS(SELECT * FROM Basket WHERE user_email = ? AND basket_drug_name = ?) as isInBasket"
    db.connect();

    db.query(query, [req.query.email, req.query.drug_name], (err, rows, fields) => {
        if(rows != undefined){
            rows[0]['isInBasket'] = (rows[0]['isInBasket'] === 1);
            res.send(rows[0]['isInBasket']);
        } else{
            res.send(false);
        }
    });

    db.end();
}


exports.addToBasket = (req, res) => {
    let db = getDb();
    let query = "INSERT INTO Basket (user_email, basket_drug_name) VALUES (?, ?)"
    db.connect();

    db.query(query, [req.query.email, req.query.drug_name], (err, rows, fields) => {
        console.log(err);
        res.send();
    });

    db.end();
}


exports.getAllBasket = (req, res) => {
    let db = getDb();
    let query = "SELECT d.drug_name, d.drug_image, d.weight, d.price, d.min_age, b.amount \
                    FROM Drugs AS d \
                    JOIN Basket AS b \
                    ON d.drug_name = b.basket_drug_name WHERE b.user_email = ?";

    db.connect();

    db.query(query, [req.query.email], (err, rows, fields) => {
        console.log(rows, err);
        res.send(rows);
    });

    db.end();
}

exports.decrease = (req, res) => {
    let db = getDb();
    let query = "UPDATE Basket SET amount = amount - 1 WHERE user_email = ? AND basket_drug_name = ?";
    db.connect();

    db.query(query, [req.query.email, req.query.drug_name], (err, rows, fields) => {
        console.log(err);
        res.send();
    });

    db.end();
}


exports.increase = (req, res) => {
    let db = getDb();
    let query = "UPDATE Basket SET amount = amount + 1 WHERE user_email = ? AND basket_drug_name = ?";
    db.connect();

    db.query(query, [req.query.email, req.query.drug_name], (err, rows, fields) => {
        console.log(err);
        res.send();
    });

    db.end();
}

exports.delete = (req, res) => {
    let db = getDb();
    let query = "DELETE FROM Basket WHERE user_email = ? AND basket_drug_name = ?";
    db.connect();

    db.query(query, [req.query.email, req.query.drug_name], (err, rows, fields) => {
        res.send();
    });

    db.end();
}