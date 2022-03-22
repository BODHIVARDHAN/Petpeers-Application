const User = require("../models/register.model");
const jwt = require("jsonwebtoken");

// const createToken = async() => {
//   jwt.sign()
// }
// Create and Save a new User
exports.create = async (req, res) => {
    // Create a User
    const User1 = new User({
      username:req.body.username,
      confirmPassword:req.body.confirmPassword,
      password:req.body.password,
      role:'user'
    });
    // const token = await User1.genrateToken();

    // password hash
    
    // Save User in the database
    try {
        const user = await User1.save(User)
        res.status(202).send({
            status: "success",
            data: user
        });
    } catch (error) {
        res.status(500).send({
            message:
            error.message || "Some error occurred while creating the User."
        });
    }
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    User.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        });
}

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found User with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving User with id=" + id });
        });
};

// Update a User by the id in the request
exports.update = async(req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
        if (!data) {
            res.status(404).send({
            message: `Cannot update User with id=${id}. Maybe User was not found!`
            });
        } else res.send({ 
            message: "User was updated successfully.",
            status:"success"
        });
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating User with id=" + id
        });
        }); 
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        } else {
          res.send({
            message: "User was deleted successfully!",
            status:"success"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
  };

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`,
        status:"success"
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    });
};
