// const mongoose= require('mongoose');

// mongoose.connect('mongodb://localhost:27017/mongoose')
//  .then(()=> console.log("connected to mongodb"));

// const categorySchema =new mongoose.Schema({
//     name:String,
// }) 
// const category = mongoose.model('category',categorySchema);

// module.exports=category

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongoose')
  .then(() => console.log("connected to mongodb"));

const categorySchema = new mongoose.Schema({
  name: String,
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;
