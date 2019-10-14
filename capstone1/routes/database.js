var express = require('express');
var mysql = require('mysql');

var app = express();
app.use(express.json());

var connection = mysql.createConnection({
    host: "엔드포인트 주소",
    user: "유저 이름",
    database: "접근할 데이터베이스 이름",
    password: "설정해두었던 패스워드",
    port: 3306
});

app.post('/login1', function (req, res) {
  console.log(req.body);
  var userEmail = req.body.userEmail;
  var userName = req.body.userName;
  var userToken = req.body.userToken;
  var sql = 'select * from Users where UserEmail = ?';

  connection.query(sql, userEmail, function (err, result) {
      var resultCode = 'no RDB';
      var message = 'My SQL TEST ' + userEmail;

      if (err) {
          console.log(err);
      } else {
          if (result.length === 0) {
              // ToDo. Register In
              message = userEmail + '테스트중입니다.';
          } else {
              resultCode = 200;
              message = 'Success';
          }
      }

      res.json({
          'code': resultCode,
          'message': message
      });
  })
});

app.get('/login', function(req, res, next) {
  console.log("fuck");
  res.send("Oh no1");
});

module.exports = app;
