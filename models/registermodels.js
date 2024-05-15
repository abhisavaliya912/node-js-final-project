const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongoose')
 .then(()=> console.log("connected to mongodb-register"));

const EmployeeSchema =new mongoose.Schema({
    name:String,
    email:String,
    password:String
}) 
const Employee = mongoose.model('Employee',EmployeeSchema);

module.exports=Employee