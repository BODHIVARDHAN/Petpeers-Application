const mongoose = require('mongoose')

console.log('enter..')
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=>{
    console.log('connected....');
}).catch((e)=>{
    console.log(e);
});