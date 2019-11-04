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

app.post('/newpost', function (req, res) {
    console.log(req.body);
    var title = req.body.title;
    var content = req.body.content;
    var author_id = req.body.author_id;
    var photo_url = req.body.photo_url;
    var done = "no";

    var sql = 'INSERT INTO board ( title, content, author_id) VALUES( ?, ?, ?)';
    var params = [title, content, author_id];
    connection.query(sql, params, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.json({
                'status': err
            });
        } else {
            const map1 = photo_url.map(x => {
                return [rows.insertId];
            })
            console.log(rows.insertId);
            sql = 'INSERT INTO board ( board_id, photo_url) VALUES ?'
            connection.query(sql, map1, function (err, rows, fields) {
                if (err) {
                    res.json({
                        'status': err
                    })
                } else {
                    res.json({
                        'status': "success"
                    });
                }
            });
        }
    });
})

app.get('/getpost', function (req, res, next) {
    connection.query('SELECT * from SpotInformation', function (err, rows, fields) {
        if (!err)
            res.send(rows);
        else
            console.log('Error while performings Query.', err);
    });
});

module.exports = app;
