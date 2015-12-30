//Set up 
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan'); //log requests to the console express 4
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); // pull information from express 4
var mongoose = require('mongoose'); // mongoose, Object Document Mapper (ODM) or Object Relational Mapping (ORM) for mongodb
var methodOverride = require('method-override'); // Simulate DELETE  and PUT express 4
var db = require('./config/db');

//routes 
//poit to the existing routes in the routes folder
var routes = require('./app/routes');
var users = require('./routes/users');


var app = express();

//configuration
mongoose.connect(db.url);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('jade').renderFile);
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride());

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
