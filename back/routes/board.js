var express = require('express');
var router = express.Router();

 // MYSQL DB 실행
 const mysql      = require('mysql');
 const connection = mysql.createConnection({
  host     : 'nodejs-009.cafe24.com',
  port     : '3306',
  user     : 'shwogjs00',
  password : 'shwo1379@',
  database : 'shwogjs00'
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

    console.log('rows'+ rows);
    res.send(rows);
  });
});

router.post('/boardCheck', function(req, res, next) {
  // 쿼리 날려서 가져오기
  if( req.body.pwd ==="admin") {
    //admin 으로 접속
    adminYN = 0;
  }else {
    adminYN = 1;
  }
  connection.query(`SELECT seq, subject, userName, userBrith, userTel, regdate, content, gender, checkOption, pwd, counselStatus FROM board WHERE (pwd='${req.body.pwd}' OR adminYN='${ adminYN }') AND seq='${req.body.seq}' `,
  (error, rows) => {
    console.log()
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
    debugger;
    if(rows.length > 0){
      rows.push(adminYN);
      res.send(rows);
    }else {
      res.send('0');
    }
  });
});

router.post('/boardreplyList', function(req, res, next) {
  // 쿼리 날려서 가져오기
  
  connection.query(`SELECT seq, comment, regdate, adminYN, userName FROM boardreply WHERE board_seq='${req.body.seq}' ORDER BY REGDATE ASC`,
  (error, rows) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }

    console.log(': ', rows);
    res.send(rows);
  });
});


router.post('/boardReply', function(req, res, next) {
  if( req.body.adminYN ===0) {
    //admin 으로 접속
    adminYN = 0;
    userName = "관리자";
  }else {
    adminYN = 1;
    userName = req.body.userName;
  }
  // 댓글등록 insert
  connection.query(`INSERT INTO boardreply (board_seq, comment, adminYN, userName) VALUES('${ req.body.seq}', '${ req.body.comment}', '${ adminYN }', '${ userName }')`,
  (error, rows) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
    res.send(rows);
  });
});

module.exports = router;
