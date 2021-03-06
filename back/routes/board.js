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
  connection.query(`SELECT seq, subject, userName, regdate, counselStatus, notice FROM board  ORDER BY notice DESC, regdate DESC`,
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
  console.log(req.body.userPwd);
  if( req.body.userPwd ==="admin") {
    //admin 으로 접속
    notice = 1;
    userName = "관리자";
    counselStatus = "3"
    subject = '<span style="color: red; font-weight: bold;"><공지></span>' + req.body.subject;
  }else {
    notice = 0;
    userName = req.body.userName;
    counselStatus = "1"
    subject = req.body.subject;
  }
  // 쿼리 날려서 저장
  connection.query(`INSERT INTO board (userName, userBrith, userTel, subject, content, gender, checkOption, pwd, notice, counselStatus, area) VALUES('${userName}', '${ req.body.userBrith}', '${ req.body.userTel}', '${ subject }', '${ req.body.content}', '${ req.body.gender}', '${ req.body.checkOption}', '${ req.body.userPwd}', '${ notice }', '${ counselStatus }', '${ req.body.area }')`,
  (error, rows) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
    res.send(rows);
  });
});


router.post('/boardUpdate', function(req, res, next) {
  // 쿼리 날려서 업데이트
  console.log(req.body.content);
  connection.query(`UPDATE board  SET content ='${ req.body.content}', subject='${ req.body.subject}', checkOption='${ req.body.checkOption}', counselStatus='${ req.body.counselStatus}'  WHERE seq='${ req.body.seq }'`,
  (error, rows) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
    res.send(rows);
  });
});


router.post('/boardDelete', function(req, res, next) {
  // 쿼리 날려서 삭제
  connection.query(`DELETE FROM board WHERE seq = '${ req.body.seq}'`,
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
    pwdAdmin = 0;
    adminYN = 1;
  }else {
    pwdAdmin = 1;
    adminYN = 0;
  }
  console.log(`SELECT seq, subject, userName, userBrith, userTel, regdate, content, gender, checkOption, adminYN, pwd, notice, counselStatus, area FROM board WHERE (pwd='${req.body.pwd}' OR adminYN='${ pwdAdmin }') AND seq='${req.body.seq}'`);
  connection.query(`SELECT seq, subject, userName, userBrith, userTel, regdate, content, gender, checkOption, adminYN, pwd, notice, counselStatus, area FROM board WHERE (pwd='${req.body.pwd}' OR adminYN='${ pwdAdmin }') AND seq='${req.body.seq}' `,
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
  if( req.body.adminYN === '1') {
    //admin 으로 접속
    adminYN = 1;
    userName = "관리자";
  }else {
    adminYN = 0;
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
