const mongoose = require('mongoose');

const user = new mongoose.Schema({
    username:String,
    confirmPassword:String,
    password:String,
    role:String,

});
const Register = new mongoose.model("Register",user);
module.exports = Register;