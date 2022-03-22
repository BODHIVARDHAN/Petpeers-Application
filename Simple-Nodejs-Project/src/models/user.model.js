const mongoose = require('mongoose');
const jwt =require("jsonwebtoken");

const users = new mongoose.Schema({
  user_name:String,
  user_place:String,
  user_age:Number,
  user_status:Number,
  user_role:String,
});
// tokens:[{
//   token:{
//     type:String,
//     required:true
//   }
// }]
users.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
users.methods.genrateToken = async function() {
  try {
    const token = jwt.sign({_id:this._id}, "mynameisbodhivardhankasabe");
    this.tokens = this.tokens.concat({token:token});
    await this.save();
    return token;
  } catch (error) {
    res.send(error);
    console.log('error..',error);
  }
}
const user = new mongoose.model("user",users);
module.exports = user;