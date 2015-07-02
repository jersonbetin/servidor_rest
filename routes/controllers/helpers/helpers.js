"use strict";
var crypto = require('crypto');

exports.isDefined = function (params){
  if( typeof params ==="undefined" || params === null){
    return false;
  }else{
    return true;
  }
}

exports.encrypt = function (string){
  var shasum = crypto.createHash('sha1');
  shasum.update(string);
  var d = shasum.digest('hex');
  return d;
}

