var commonFunc = require('../common.js');
const userService =  require('../services/userService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);

var userController = {};

userController.list = async function(req, res) {

	let resp = {
		data : [],
        total : '',
        limit : '',
        page : ''
    }; 

    let limit = ( parseInt(req.query.records_per_page) ) ? parseInt( req.query.records_per_page ) : 50;
    let page  = ( parseInt(req.query.page) && parseInt(req.query.page) > 0 ) ? parseInt(req.query.page) : 1;

	userRes = await userService.find(req);
	console.log("userRes", userRes);
	if(!userRes || userRes.length <= 0){
        commonFunc.send(res, 404, {}, 'Data Not Found');
        return false;
    }

	resp.data = userRes;
    resp.total = userRes.length;
    resp.limit = limit;
    resp.page = page;

	commonFunc.send(res, 200, resp, 'Successfully');
}


userController.login = async function(req, res) {

	let resp = {
		data : {},
        total : '',
        limit : '',
        page : ''
    }; 
    
    const { username, password } = req.body;

    userRes = await userService.find(req, {username: username});
    // console.log("userRes", userRes);

    if(!userRes || userRes.length <= 0){
        commonFunc.send(res, 404, {}, 'Data Not Found');
        return false;
    }

    let userResDetails = userRes[0];
    
    const isPasswordMatch = bcrypt.compareSync(password, userResDetails.password);

    if (isPasswordMatch) {
        const token = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' });
        resp.data = { "token" : token };
    }else{
        commonFunc.send(res, 404, resp, 'password not matched');
        return false;
    }

	commonFunc.send(res, 200, resp, 'Successfully');
}


userController.create = async function(req, res, callback) {

	let resp = {
		data : [],
        total : '',
        limit : '',
        page : ''
    }; 

    if(req.body.password){
      req.body.password = await bcrypt.hashSync(req.body.password, salt);
    }

    userRes = await userService.create(req);
	
	resp.data = userRes;

	commonFunc.send(res,200,resp,'Successfully');

}

userController.getById = async function (req, res) {
    let resp = {
        code: 200,
        data: [],
        msg: ''
    };

    if (!req.params.id) {
        commonFunc.send(res, 404, {}, 'Please Provide Ui Data Id ');
        return;
    }

    let uidata = await userService.getByUiId(req);

    if (!uidata) {
        return commonFunc.send(res, 404, {}, 'Data Not Found');
    }
    resp.data[0] = uidata;
    commonFunc.send(res, resp.code, resp.data, resp.msg);
}


userController.update = async function (req, res) {
    let resp = {
        code: 200,
        data: [],
        msg: 'Successfully'
    };

	if (!req.params.id) {
        commonFunc.send(res, 403, {}, 'Mandatory parameter missing id.');
        return;
    }
    let updateRes = await userService.updateUiData(req);

    commonFunc.send(res, updateRes.code, updateRes['data'], updateRes.msg);
}


module.exports = userController;