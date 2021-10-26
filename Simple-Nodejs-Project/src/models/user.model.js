const mongoose = require('mongoose');

const users = new mongoose.Schema({
    username:String,
    confirmPassword:String,
    password:String,
    role:String,
});
users.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

const user = new mongoose.model("user",users);
module.exports = user;