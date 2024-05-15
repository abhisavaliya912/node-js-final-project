const express=require("express")
const {catform,savecatData,deletecatData,editcatData}=require("../controllers/categorycontrollers")
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
router.get("/",catform);
router.post("/savecat",upload.single('userimg'),savecatData);
router.get("/deletecat/:id",deletecatData);
router.get("/editcat/:id",editcatData);

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