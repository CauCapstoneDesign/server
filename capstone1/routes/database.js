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

app.post('/login1', function (req, res) {
    console.log(req.body);
    var userEmail = req.body.userEmail;
    var userNickname = req.body.userNickname;
    var userToken = req.body.userToken;
    var sql = 'SELECT * FROM UserInformation WHERE gmail = ?';
    var temp = 0;

    connection.connect();

    connection.query(sql, userEmail, function (err, row) {
        var resultCode = 'no RDB';
        var message = 'My SQL TEST ' + userEmail;
        console.log("1");
        if (err) {
            console.log(err);
        } else {
            if (row.length === 0) {
                console.log("fuck2");
                message = 'new account';
                temp = 1;
            } else {
                console.log("fuck2");
                resultCode = 200;
                message = 'Success';
            }
        }

    })

    // if (temp === 1) {
    //     var sql2 = 'INSERT INTO UserInformation (id, gmail, nickname) VALUES(?, ?, ?)';
    //     var params = [userToken, userEmail, userNickname];
    //     connection.query(sql2, params, function (err, rows, fields) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             console.log(rows.insertId);
    //         }
    //     });
    // }

    res.json({
        'code': resultCode,
        'message': message
    });

    connection.end();
});

app.get('/login', function (req, res, next) {
    console.log("fuck");
    res.send("Oh no1");
    connection.connect();

    connection.query('SELECT * from UserInformation', function (err, rows, fields) {
        if (!err)
            console.log('The solution is: ', rows);
        else
            console.log('Error while performing Query.', err);
    });

    connection.end();
});

module.exports = app;
