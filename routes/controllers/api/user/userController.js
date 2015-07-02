'use strict'
var userModel = require('../../../../models/user').users;
var helpers = require('../../helpers/helpers');
var userStruct = require('./userStruct');

function addUser(req, res){  
  console.log(req.body);
  userStruct.validateUser(req.body, function(testAuthorize, data){
    if(testAuthorize){
      var passSha1 = helpers.encrypt(req.body.pass);
      userModel.create({
        user:req.body.user,
        password:passSha1,
        name:{
          first:req.body.name.first,
          last:req.body.name.last
        }
      }, function(err, users){
        if(!err){
          console.log(users);
            var userCreate = {
              "user" : users.user,
              "name" : {
                "first" : users.name.first,
                "last" : users.name.last
              }
            };
            res
              .status(201)
              .send({userCreate:userCreate});
          }else{
            if(err.code == 11000){
              res
                .status(406)
                .send({
                  "error":{
                    "info":"resource repeat",
                    "message":"this resource already exists"
                  }
                });
            }else{
              res
                .status(500)
                .send({
                  "error":{
                    "info":"bad struct",
                    "message":"error in the struct"
                  }
                });
            }            
          }
      });
    }else{      
      res
        .status(500)
        .send({
          "error":{
            "info":"bad struct",
            "message":"error in the struct",
            "data":data
          }
        });
    }
  });
}

function getUsers(req, res){
  userModel.find().exec(function(err, users){
    if(!err){
      console.log(users);
      res
      .status(200)
      .send({
        users:users
      });
    }else{      
      console.log(err);
      res
      .status(500)
      .send({
        "menssage":"server error",
        "info":"problems in the server"
      });
    }
  });
}

function getUserById(req, res){
  console.log(req.params.id);
  userModel.findOne({user:req.params.id}).exec(function(err, user){
    if(!err){
      console.log(user);
      res
      .status(200)
      .send({
        user:user
      });
    }else{      
      console.log(err);
      res
      .status(500)
      .send({
        "menssage":"server error",
        "info":"problems in the server"
      });
    }
  });
}

module.exports={
  addUser:addUser,
  getUsers:getUsers,
  getUserById:getUserById
};

