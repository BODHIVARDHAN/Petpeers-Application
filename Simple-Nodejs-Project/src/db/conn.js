const mongoose = require('mongoose')
const db = require("../config/db.config.js")
console.log('enter..')
mongoose.connect(db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=>{
    console.log('connected....');
}).catch((e)=>{
    console.log(e);
});                                                                 