const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const catrouter = require('./routes/categoryroutes');
const prorouter =require('./routes/productroutes')
const cookieParser = require('cookie-parser')
const flash=require('express-flash')
const session=require('express-session')
const nodemailer = require("nodemailer");
const { register, savecatData,checkLoginData } = require('./controllers/registercontrollers');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())

app.use(session({
    secret:'abhi@123',
    resave:false,
    saveUninitialized:true
}));
app.use(flash());

app.use('/category', catrouter);
app.use('/product', prorouter);
app.use('/register', register)
app.post("/savecat", urlencodedParser, savecatData);

app.get("/", (req, res) => {
    res.render("register");
});
app.get('/categoryData', (req, res) => {
    console.log("cookies....");
    if(req.cookies && req.cookies.userinfo){
        let cookies = JSON.parse(req.cookies.userinfo)
        console.log(cookies)
        res.render('category',{
            userName: cookies.name,
            catInfo: [],
            editUser: {},
        });
    } else {
        res.redirect('/login');
    }
});


app.get('/home', (req, res) => {
    console.log(req.cookies);
    if(req.cookies && req.cookies.userinfo){
        // console.log("hiiiiiiiiiiii");
        let cookies = JSON.parse(req.cookies.userinfo)
        // console.log(cookies)
        res.render('home',{
            userName:cookies.name
        });
    }else{
        console.log("hello");

        res.redirect('/login')
    }
   
});
// app.get('/category', (req, res) => {
//     console.log(req.cookies);
//     if(req.cookies && req.cookies.userinfo){
//         console.log("hiiiiiiiiiiii");
//         let cookies = JSON.parse(req.cookies.userinfo)
//         console.log(cookies)
//         res.render('category',{
//             userName:cookies.name,
           
//         });
//         console.log(userName)
//     }else{
//         console.log("hello");

//         res.redirect('/login')
//     }
   
// });

app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/forgotpwd',(req,res)=>{
    res.render('forgotpwd')
})

app.post('/forgotpwd',urlencodedParser,async (req,res)=>{
    const e1 =req.body.email;
    let getData = await User .find ({email,e1});
    
})

app.post("/login", urlencodedParser, checkLoginData);

app.listen(1212, "localhost", () => {
    console.log("running port 1212");
});
