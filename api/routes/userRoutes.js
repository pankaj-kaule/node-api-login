var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

router.route('/')
    .post(userController.create)
    .get(userController.list);

router.route('/:id')
    .get(userController.getById)
    .put(userController.update);

router.route('/list')
    .post(userController.list);

router.route('/login')
    .post(userController.login);    

module.exports = router;