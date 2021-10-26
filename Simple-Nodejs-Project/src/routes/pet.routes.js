module.exports = app => {
    const pets = require("../controller/pet.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Pets
    router.post("/", pets.create);
  
    // Retrieve all pets
    router.get("/", pets.findAll);
  
    // Retrieve a single Pets with id
    router.get("/:id", pets.findOne);
  
    // Update a Pets with id
    router.put("/:id", pets.update);
  
    // Delete a Pets with id
    router.delete("/:id", pets.delete);
  
    // Create a new Pets
    router.delete("/", pets.deleteAll);
  
    app.use('/api/pets', router);
  };