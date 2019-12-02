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
            const map1 = photo_url.map(url => {
                return [rows.insertId, url];
            })
            console.log(rows.insertId);
            console.log(map1);
            sql = 'INSERT INTO board_photo ( board_id, photo_url) VALUES ?;';
            connection.query(sql, [map1], function (err, rows, fields) {
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

app.post('/newcomment', function (req, res) {
    console.log(req.body);
    var board_id = req.body.board_id;
    var content = req.body.content;
    var author_id = req.body.author_id;

    var sql = 'INSERT INTO comment (board_id, content, author_id) VALUES( ?, ?, ?)';
    var params = [board_id, content, author_id];
    connection.query(sql, params, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.json({
                'status': err
            });
        } else {
            res.json({
                'status': "done"
            });
        }
    });
})

app.post('/getpost', function (req, res) {
    console.log(req.body);
    var offset = parseInt(req.body.offset);
    var limit = parseInt(req.body.limit);
    var sql = 'SELECT title,id,author_id,creation_time FROM board LIMIT ?,?;';
    var param = [offset, limit];
    connection.query(sql, param, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.json({
                'status': err
            });
        } else {
            res.send(rows);
        }
    });
})

app.post('/getcontent', function (req, res) {
    console.log(req.body);
    var board_id = req.body.board_id;
    var sql = 'SELECT content,photo_url FROM board NATURAL LEFT OUTER JOIN board_photo WHERE id = ?';
    var param = board_id;
    connection.query(sql, param, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.json({
                'status': err
            });
        } else {
            res.send(rows);
        }
    });
})

app.post('/getcomment', function (req, res) {
    console.log(req.body);
    var board_id = req.body.board_id;
    var sql = 'SELECT FROM comment WHERE board_id = ?';
    var param = board_id;
    connection.query(sql, param, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.json({
                'status': err
            });
        } else {
            res.send(rows);
        }
    });
})



module.exports = app;
