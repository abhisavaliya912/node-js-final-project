// const mongoose= require('mongoose');

// mongoose.connect('mongodb://localhost:27017/mongoose')
//  .then(()=> console.log("connected to mongodb"));


// const productSchema =new mongoose.Schema({
//   catid:[{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:'category'
//   }],
//     productname:String,
//     price:String,
//     desc:String,
//     image:String
// }) 
// const Product = mongoose.model('product',productSchema);

// module.exports=Product
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongoose')
  .then(() => console.log("connected to mongodb"));

const productSchema = new mongoose.Schema({
  catid: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category'
  }],
  productname: String,
  price: String,
  desc: String,
  image: String
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
