var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://escorcia:1q2w3e4r@ds061298.mongolab.com:61298/mundoricura');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function callback(){
  console.log('conexion establecida');
  console.log('Database HealthyFood');
});

var userSchema = new Schema({
  user : {type : String, required : true, unique:true},
  password : {type: String, required: true},
  name : {
    first : {type : String, default : ''},
    last : {type : String, default : ''}
  }
});

exports.users = mongoose.model('users', userSchema);