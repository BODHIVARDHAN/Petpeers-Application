const Pet = require("../models/pet.model");
// const Pet = db.Pet;

// Create and Save a new Pet
exports.create = async (req, res) => {
    // Create a Pet
    const Pet1 = new Pet({
        pet_name: req.body.pet_name,
        pet_place: req.body.pet_place,
        pet_age: req.body.pet_age,
        borrowed_status: req.body.borrowed_status
    });
    console.log("pet1...",Pet1);
    // Save Pet in the database
    try {
        const pet = await Pet1.save(Pet)
        res.status(202).send({
            status: "success",
            data: pet
        });
    } catch (error) {
        res.status(500).send({
            message:
            error.message || "Some error occurred while creating the Pet."
        });
    }
};

// Retrieve all Pets from the database.
exports.findAll = (req, res) => {
    Pet.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Pets."
            });
        });
}

// Find a single Pet with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Pet.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Pet with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Pet with id=" + id });
        });
};

// Update a Pet by the id in the request
exports.update = async(req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    Pet.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
        if (!data) {
            res.status(404).send({
            message: `Cannot update Pet with id=${id}. Maybe Pet was not found!`
            });
        } else res.send({ 
            message: "Pet was updated successfully.",
            status:"success"
        });
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating Pet with id=" + id
        });
        }); 
};

// Delete a Pet with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Pet.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Pet with id=${id}. Maybe Pet was not found!`
          });
        } else {
          res.send({
            message: "Pet was deleted successfully!",
            status:"success"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Pet with id=" + id
        });
      });
  };

// Delete all Pets from the database.
exports.deleteAll = (req, res) => {
    Pet.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Pets were deleted successfully!`,
        status:"success"
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Pets."
      });
    });
};