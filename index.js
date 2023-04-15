const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

// create application/json parser
var jsonParser = bodyParser.json();


// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Trantrung.00',
    database: 'tntbookcomic'
});

connection.connect(function (err) {
    (err) ? console.log(err) : console.log(connection);
});

app.get('/api/categories/all', (req, res) => {
    var sql = "SELECT * FROM categories;";
    connection.query(sql, (err, results) => {
        if (err) console.log(err);
        res.json({categories: results})
    })
});

app.post('/api/categories/update', jsonParser, (req, res) => {
    var sql = `UPDATE categories SET search = ${req.body.search} WHERE (id = ${req.body.id});`;
    connection.query(sql, (err, results) => {
        if (err) console.log(err);
        res.status(200).json("Update search done!")
    })
});

app.listen(4000, () => {
    console.log("Port 4000 server, DONE!");
});