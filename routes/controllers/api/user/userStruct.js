var helpers = require('../../helpers/helpers');

function validateUser(structure, next){
  var data = [];
  var testAuthorize = true;
  if(helpers.isDefined(structure.user)){
    data.push({
      "user":{
        "status" : "ok",
        "value" : structure.user
      }
    });
  }else{
    data.push({
      "user":{
        "status" : "error",
        "value" : "the user is undefined"
      }
    });
    testAuthorize = false;
  }

  if(helpers.isDefined(structure.pass)){
    data.push({
      "pass":{
        "status" : "ok",
        "value" : structure.pass
      }
    });
  }else{
    data.push({
      "pass":{
        "status" : "error",
        "value" : "the user is undefined"
      }
    });

    testAuthorize = false;
  }
  if(helpers.isDefined(structure.name)){
    if(helpers.isDefined(structure.name.first)){
      data.push({
        "name.first" : {
          "status" : "ok",
          "value" : structure.name.first
        }
      });
    }else{
      data.push({
        "name.first": {
          "status" : "error",
          "value" : "the firt name is undefined"
        }
      });

      testAuthorize = false;
    }

    if(helpers.isDefined(structure.name.last)){
      data.push({
        "name.last":{
          "status" : "ok",
          "value" : structure.name.last
        }
      });
    }else{
      data.push({
        "name.last":{
          "status" : "error",
          "value" : "the last name is undefined"
        }
      });  

      testAuthorize = false;    
    }
  }else{
    data.push({
      "name":{
        "status" : "error",
        "value" : "the name is undefined"
      }
    });  

    testAuthorize = false;
  }
  next(testAuthorize, data);
}

module.exports = {
  validateUser : validateUser
}