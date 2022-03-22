const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const user = new mongoose.Schema({
    username:String,
    confirmPassword:String,
    password:String,
    role:String,

});

user.pre("save", async function(next) {
    this.password = await bcrypt.hash(this.password,10);
    next();
})


const Register = new mongoose.model("Register",user);
module.exports = Register;