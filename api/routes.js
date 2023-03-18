'use strict';
const userRoutes = require('./routes/userRoutes');

var custom_routes = function(app) {

    app.use("/user", userRoutes);

}

module.exports = custom_routes;