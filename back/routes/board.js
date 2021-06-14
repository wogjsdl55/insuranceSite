var express = require('express');
var router = express.Router();

 // MYSQL DB 실행
 const mysql      = require('mysql');
 const connection = mysql.createConnection({
   host     : 'localhost',
   port     : '3306',
   user     : 'root',
   password : 'shwo2936',
   database : 'nodejs'
 });

 connection.connect();

 router.get('/boardList', function(req, res, next) {
  // 쿼리 날려서 가져오기
  connection.query(`SELECT seq, subject, userName, regdate, counselStatus FROM board`,
  (error, rows) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }

    console.log(': ', rows);
    res.send(rows);
  });
});

/* POST home page. */

router.post('/boardSubmit', function(req, res, next) {
  // 쿼리 날려서 가져오기
  connection.query(`INSERT INTO board (userName, userBrith, userTel, subject, content, gender, checkOption, pwd) VALUES('${ req.body.userName}', '${ req.body.userBrith}', '${ req.body.userTel}', '${ req.body.subject}', '${ req.body.content}', '${ req.body.gender}', '${ req.body.checkOption}', '${ req.body.userPwd}')`,
  (error, rows) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }

    console.log(': ', rows);
    res.send(rows);
  });
});

router.post('/boardCheck', function(req, res, next) {
  // 쿼리 날려서 가져오기
  console.log(req.body.pwd);
  connection.query(`SELECT seq, subject, userName, regdate, counselStatus FROM board WHERE pwd='${ req.body.pwd}'`,
  (error, rows) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
    console.log(rows);
    res.send(rows);
  });
});

module.exports = router;
