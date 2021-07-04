var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var port = 3000

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/board');

console.log("path="+ __dirname);
var multer = require('multer')
var upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './back/public/static/');
    },
    filename: function (req, file, cb) {
      cb(null,  new Date().valueOf() + path.extname(file.originalname));
    }
  }),
});

// 카페 24 웹 호스트 포트 설정 
var app = express();

app.listen(port, () => {
  console.log(`Example app listening at ${port}`)
})
 
// view engine setup1
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json( {limit: "140mb"} ));
app.use(express.urlencoded( {limit: "140mb",  extended: false} ));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

// 이미지 업로드
app.post('/api/upload', upload.single('image'), (req, res) => {
  res.send(req.file.filename);
  res.end();
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
});


module.exports = app;
