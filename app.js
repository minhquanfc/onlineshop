var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/products');
var apiUser = require('./routes/api.user');
var apiProduct = require('./routes/api');
var catecoryRouter = require('./routes/category');
var bannerRouter = require('./routes/banner');
var GioHangRouter = require('./routes/api.giohang');
var orderRouter = require('./routes/api.order');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:'fksdfn24235bdInfsdHSNF9999',
  resave:true,
  saveUninitialized:true,
}))
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/api/users', apiUser);
app.use('/api', apiProduct);
app.use('/category', catecoryRouter);
app.use('/banner', bannerRouter);
app.use('/api/giohang', GioHangRouter);
app.use('/api/order', orderRouter);





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
  res.render('error');
});

module.exports = app;
