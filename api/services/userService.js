let userService = {};

userService.find = async(req, req_filter) => {

    let query = {}

    if(typeof req_filter.username != "undefined"){
        query['username'] = req_filter.username
    }

    var userRes = await req.db.userModel.find(query);
    
    // console.log("userRes", userRes);
    return userRes;

}

userService.create = async(req) => {

    let data = {}
    if(req.body.name){
        data['name'] = req.body.name
    }

    if(req.body.username){
        data['username'] = req.body.username
    }
    
    if(req.body.password){
        data['password'] = req.body.password
    }

    await req.db.userModel.create(data)
    .then(result => {
        console.log(result);
        return result;
    })
    .catch(err => {
        console.log(err);
        throw err;
    })

}

module.exports = userService;
