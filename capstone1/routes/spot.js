var express = require('express');
var mysql = require('mysql');

var app = express();
app.use(express.json());

var connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "starstarstar",
    password: "Ironman3000!",
    port: 3306
});

app.post('/newspot', function (req, res) {
    console.log(req.body);
    var name = req.body.name;
    var author_id = req.body.author_id;
    var address = req.body.address;
    var photo_url = req.body.photo_url;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var done = "no";

    var sql = 'INSERT INTO spot (name, address, photo_url, author_id, latitude, longitude) VALUES(?, ?, ?, ?, ?, ?)';
    var params = [name, address, photo_url, author_id, latitude, longitude];
    connection.query(sql, params, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.json({
                'status': "no"
            });
        } else {
            console.log(rows.insertId);
            res.json({
                'status': "done"
            });
        }
    });
})

app.post('/spotsearchbylocation', function (req, res) {
    console.log(req.body);
    var location = req.body.location;
    var authorID = req.body.authorID;
    // var spotId = req.body.spotID;
    var grade = req.body.grade;
    var done = "no";

    var sql = 'INSERT INTO SpotInformation (location, authorID, grade) VALUES(?, ?, ?)';
    var params = [location, authorID, grade];
    connection.query(sql, params, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.json({
                'status': "no"
            });
        } else {
            console.log(rows.insertId);
            res.json({
                'status': "done"
            });
        }
    });
})

app.get('/getspot', function (req, res, next) {
    connection.query('SELECT * from SpotInformation', function (err, rows, fields) {
        if (!err)
            res.send(rows);
        else
            console.log('Error while performings Query.', err);
    });
});

module.exports = app;
