const express=require("express")
const {proform,saveproData,deleteproData,editproData}=require("../controllers/productcontroller")
const router=express.Router();
const multer =require('multer')

const path =require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage: storage })

var bodyParser =require("body-parser");

var urlencodedParser=bodyParser.urlencoded({extended:false});
router.get("/",proform);
router.post("/savepro",upload.single('primg'),saveproData);
router.get("/deletepro/:id",deleteproData);
router.get("/editpro/:id",editproData);

router.get('/register', (req, res) => {
  res.render('register');
});
router.get('/show-message',(req,res)=>{
    req.flash('info','flash message added');
    req.redirect('show-massage')
})
router.get('/show-flash-massage',(req,res)=>{
    req.flash('info','flash messages added')
    req.render('homepage',{messages:req.flash('info'),userName:"abhi"});
})

module.exports=router;