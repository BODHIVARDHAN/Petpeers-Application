const express = require('express')
const app = express();
var cors = require('cors')
const path = require('path');
const Register = require('./models/register');
const Pet = require('./models/pet')
require('./db/conn')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


app.get('/user', (req, res) => {
    //get all user list
});

app.get('/getAllpets', async (req, res) => {
    //get all pets list
    try {
        let PetData = await Pet.find();
        if (PetData == null) {
            res.status(202).send({
                status: "nodata"
            });
        }
        res.status(202).send({
            status: "success",
            PetData: PetData,
        });
    } catch (error) {
        res.status(202).send({
            status: "error"
        });
    }
});

app.post('/login', async (req, res) => {
    try {
        const user = req.body.username;
        const role = req.body.role;
        const passw = req.body.password
        console.log('user...', user);

        const uservalid = await Register.findOne({ username: user, password: passw })
        console.log('uservali', uservalid);
        if (uservalid) {
            res.status(202).send({
                status: "success"
            });
        }
        res.status(202).send({
            status: "user Not found"
        });

    } catch (error) {
        res.status(400).send('Invalud user')
    }
});

app.post('/register', async (req, res) => {
    console.log(req.body);
    try {
        let res1 = await Register.findOne({ 'username': req.body.username });
        console.log('res...', res1);
        if (res1) {
            console.log('found...')
            res.status(202).send({
                status: "exits",
            });
        } else {
            console.log('not found...')
            let role = 'user'
            const userRegiter = new Register({
                confirmPassword: req.body.confirmPassword,
                password: req.body.password,
                username: req.body.username,
                role: role,
            })
            console.log('userRegiter', userRegiter);
            const register = await userRegiter.save();
            console.log('register', register);
            res.status(202).send({
                status: "success",
                data: register
            });
            // res.status(201).send('sucess');
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});


app.post('/addpet', async (req, res) => {
    console.log(req.body);
    try {
        let res1 = await Pet.findOne({ 'pet_name': req.body.pet_name });
        console.log('res...', res1);
        if (res1) {
            console.log('found...')
            res.status(202).send({
                status: "exits",
            });
        } else {
            console.log('not found...')
            const petRegiter = new Pet({
                pet_name: req.body.pet_name,
                pet_place: req.body.pet_place,
                pet_age: req.body.pet_age,
                borrowed_status: req.body.borrowed_status
            })
            console.log('petRegiter', petRegiter);
            const pet = await petRegiter.save();
            console.log('Pet', pet);
            res.status(202).send({
                status: "success",
                data: pet
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});


app.listen(3000);