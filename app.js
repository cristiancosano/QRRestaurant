var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./routes/index');
var restaurantsRouter = require('./routes/restaurants');
var myRestaurantsRouter = require('./routes/myRestaurants');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var registerRouter = require('./routes/register');
var qrCodeRouter = require('./routes/qrCode');
var searchRouter = require ('./routes/search');
var aboutUsRouter = require('./routes/aboutUs');


require('./models/relationships')


var app = express();
//let checkAdminUser = require('./middlewares/checkAdminUser')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'qrrestaurant_key',
  resave: false,
  saveUninitialized: false
}));
app.use((req, res, next)=>{
  res.locals.session = req.session;
  res.locals.currentUrl = req.url;
  next();
})
app.use('/', indexRouter);
app.use('/restaurants', restaurantsRouter);
app.use('/my-restaurants', myRestaurantsRouter);
app.use('/about-us', aboutUsRouter);
app.use('/qr-code', qrCodeRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);
app.use('/search', searchRouter);

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
