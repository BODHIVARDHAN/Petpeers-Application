const mongoose = require('mongoose');

const users = new mongoose.Schema({
  user_name:String,
  user_place:String,
  user_age:Number,
  user_status:Number,
  user_role:String
});
users.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

const user = new mongoose.model("user",users);
module.exports = user;