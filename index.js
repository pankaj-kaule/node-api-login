const express = require('express');
var Session = require('express-session');
bodyParser = require('body-parser');
const dotenv = require("dotenv")

dotenv.config()

var app = express();
var port = process.env.PORT || 4000;

app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//using session in express
app.use(Session({
    secret: '987654321',
    resave: true,
    saveUninitialized: true
}));

global.db = {};
global.conn = undefined;

global.config = {
    "JWT_PRIVATE_KEY": "jwtPrivateKey"
}



var dbConfig = require('./api/dbConfig');
// console.log("dbConfig", dbConfig)
app.use(dbConfig);


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});


var custom_routes = require('./api/routes');
custom_routes(app);

//Handle 404
app.use(function (req, res) {


    //console.log(req.originalUrl);

    var errObj = {};
    errObj.status = 'fail';
    errObj.msg = 'No such url found';

    res.json(errObj);

});

//Handle 500
app.use(function (error, req, res) {

    var errObj = {};
    errObj.status = 'fail';
    errObj.msg = error.message;

    res.json(errObj);

});


console.log('listening to port ' + port);
app.listen(port);