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

app.post('/spotrating', function (req, res) {
    var spot_id = req.body.spot_id;
    var grade = req.body.grade;
    var comment = req.body.comment;
    var author_id = req.body.author_id;

    var sql = 'INSERT INTO spot_rating (spot_id, grade, comment, author_id) VALUES(?, ?, ?, ?)';
    var params = [spot_id, grade, comment, author_id];
    connection.query(sql, params, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.json({
                'status': "no"
            });
        } else {
            res.json({
                'status': "done"
            });
        }
    });
})

app.post('/getrating', function (req, res) {
    var spot_id = req.body.spot_id;

    var sql = 'SELECT * FROM spot_rating WHERE spot_id=?';
    var param = spot_id;
    connection.query(sql, param, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.json({
                'status': "no"
            });
        } else {
            res.send(rows);
        }
    });
})

app.get('/getspot', function (req, res, next) {
    connection.query('SELECT id,name,address,author_id,creation_time,latitude,longitude FROM spot', function (err, rows, fields) {
        if (!err)
            res.send(rows);
        else
            console.log('Error while performings Query.', err);
    });
});

app.post('/getspotphoto', function (req, res) {
    var spot_id = req.body.spot_id;

    var sql = 'SELECT photo_url FROM spot WHERE id=?';
    var param = spot_id;
    connection.query(sql, param, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.json({
                'status': "no"
            });
        } else {
            res.send(rows);
        }
    });
})

module.exports = app;
