const mongoose = require('mongoose');

const user = new mongoose.Schema({
    pet_name:String,
    pet_place:String,
    pet_age:Number,
    borrowed_status:Number
});
const Pet = new mongoose.model("Pet",user);
module.exports = Pet;