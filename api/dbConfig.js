const mongoose = require('mongoose');

module.exports = function(req, res, next) {

    if (!global.dbConn) {

        mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

        global.dbConn = mongoose;

    }

    // console.log("global.dbConn", global.dbConn);

    req.db = {
        "userModel": require("./models/userModel")
    }
    
    global.db = req.db;

    next();
}