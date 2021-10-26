const express = require('express')
const app = express();
var cors = require('cors')
const path = require('path');
const Register = require('./models/register');
const Pet = require('./models/pet.model')
require('./db/conn')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
require("./routes/pet.routes")(app);
require("./routes/user.routes")(app);

app.listen(3000);