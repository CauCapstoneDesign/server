var express = require('express');
var mysql = require('mysql');

var app = express();
app.use(express.json());

var connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "sys",
    password: "Ironman3000!",
    port: 3306
});

app.post('/newspot', function (req, res) {
    console.log(req.body);
    var location = req.body.location;
    var authorId = req.body.authorID;
    var spotId = req.body.spotID;
    var grade = req.body.grade;

    var sql = 'INSERT INTO SpotInformation (location, authorID, grade) VALUES(?, ?, ?)';
    var params = [location, authorID, grade];
    connection.query(sql2, params, function (err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log(rows.insertId);
        }
    });

    res.json({
            'code': resultCode,
            'message': message
    });

})


app.get('/getspot', function (req, res, next) {
    res.send("Oh no1");

    connection.query('SELECT * from UserInformation', function (err, rows, fields) {
        if (!err)
            res.send(rows);
        else
            console.log('Error while performing Query.', err);
    });

});

module.exports = app;
