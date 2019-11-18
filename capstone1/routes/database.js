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

app.post('/login', function (req, res) {
    console.log(req.body);
    var gmail = req.body.gmail;
    var nickname = req.body.nickname;
    var id = req.body.id;
    var sql = "SELECT * FROM user_information WHERE gmail = ?";
    var resultCode = 'no RDB..';
    var message = 'My SQL TEST ' + gmail;
    var temp = 0;

    connection.query(sql, gmail, function (err, row) {
        console.log(row);
        if (err) {
            console.log(err);
            res.json({
                'code': '0',
                'message': err
            });
        } else {
            if (row.length === 0) {
                console.log("fuck2");
                var sql2 = 'INSERT INTO user_information (id, gmail, nickname) VALUES(?, ?, ?)';
                var params = [id, gmail, nickname];
                connection.query(sql2, params, function (err, rows, fields) {
                    if (err) {
                        console.log(err);
                        res.json({
                            'code': '0',
                            'message': err
                        });
                    } else {
                        console.log(rows.insertId);
                        res.json({
                            'code': "200",
                            'message': "new account"
                        });
                    }
                });
                message = 'new account';
                temp = 1;
            } else {
                console.log("fuck3");
                res.json({
                    'code': "300",
                    'message': "success"
                });
            }
        }
    })
});

app.get('/getapod', function (req, res, next) {
    connection.query('SELECT * FROM apod', function (err, rows, fields) {
        if (!err)
            res.send(rows);
        else
            console.log('Error while performings Query.', err);
    });
});

module.exports = app;
