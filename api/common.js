var commonFunc = {};

commonFunc.send = (res, code, data = {}, msg = "") => {
    let response = {
      error: {},
    };
  
    response.success = true;
  
    if (code >= 400 && code < 600) {
      response.success = false;
    }
    response.error.code = code;
    response.error.message = msg;
    response.result = data;
  
    res.status(response.error.code).json(response);
  };


module.exports = commonFunc