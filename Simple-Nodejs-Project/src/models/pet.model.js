const mongoose = require('mongoose');

const pets = new mongoose.Schema({
    pet_name:String,
    pet_place:String,
    pet_age:Number,
    borrowed_status:Number
});
pets.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

const Pet = new mongoose.model("Pet",pets);
module.exports = Pet;