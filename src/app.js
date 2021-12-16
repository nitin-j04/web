require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 8000;
var path = require('path');
var bodyParser = require('body-parser');  
require("./conn");
const Menu=require("../models/menu_db");
const Login=require("../models/login_db");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const auth = require("../middleware/auth");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

const staticPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../views")
//to set view engine

app.set('view engine', 'hbs');
app.set('views', viewPath);
//built in middleware
app.use(express.static(staticPath));

//template engine route


app.get('/', async (req, res) => {



  const token = req.cookies.jwt;
  if(token)
  {

    const verifyuser = jwt.verify(token, process.env.SECRET_KEY);

    const user = await Login.findOne({ _id: verifyuser._id, "tokens.token": token });
    if(user)
      res.render('index_1');
  }
  else
  res.render('index');
  


});
app.get('/', (req, res) => {
  res.send("hello wolrd");
})
app.get('/menu', (req,res) => {
  res.render('menu');
});

app.get('/record',async (req,res) => {

  //const rec = await Menu.find();
  //res.status(201).json(rec);

  const rec=[
    {
      name:"pizza"
    },
    {
        name:"parantha"
    }
  ];
  
  


    const token = req.cookies.jwt;

  if(token){
    const verifyuser = jwt.verify(token, process.env.SECRET_KEY);

    const user = await Login.findOne({ _id: verifyuser._id, "tokens.token": token });
    if(user){

      const menu= await Menu.find({"email" : user.email});

      res.status(201).json(menu);
    }else{
      res.status(201).json(rec);
    }

  }

});

// app.post("/login",async(req,res) => {

//   console.log(req.email);
//   res.redirect("index");

// });

app.post('/clicked',bodyParser.urlencoded({ extended: false }) ,async (req, res) => {

  try {


    const token = req.cookies.jwt;
    if (token) {
        
      const verifyuser = jwt.verify(token, process.env.SECRET_KEY);

      const user = await Login.findOne({ _id: verifyuser._id, "tokens.token": token });
      console.log("loged in " + user);
      if(user){
        var obj={
          name:req.body.name,
          email:user.email
        };

        var new_item=Menu(obj);
        const userExist = await Menu.findOne({ name: req.body.name ,email:user.email});
        if (!userExist) {

          const result = await new_item.save();
          console.log(result);
        } else
          console.log(`${req.body.name} already exists`);
      }

    }else{



      // var new_item = Menu(
      //   req.body
      // );
      // const userExist = await Menu.findOne({ name: req.body.name });

      // if (!userExist) {
      //   const result = await new_item.save();
      //   console.log(result);
      // } else
      //   console.log(`${req.body.name} already exists`);

    }

 

    res.status(201).send("success");
 

  } catch (error) {
    console.log(error);
  }

});

// Delete user
app.delete('/deletemenu/:name', function(req, res) { 

  // var db = req.db;

  var name = req.params.name.toString();
    

    Menu.deleteMany({"name":name}, function(err, result) { 
      res.status(201).send( (result === 1) ? { msg: 'Deleted' } : { msg: 'error: '+ err } );
  });

});


app.post('/register', bodyParser.urlencoded({ extended: false }),async(req,res)=> {

  try {

    var new_item = Login(
      req.body
    );
    const userExist = await Login.findOne({ email: req.body.email });
    // console.log("user Exist");
    // console.log(userExist);
    // console.log(req.body);

    if (!userExist) {
      const token = await new_item.generateAuthToken();
      console.log("token generated on register " + token);

     res.cookie("jwt",token);
    
      const result = await new_item.save();

      res.status(201).send("success");
      // console.log(result);
    } else{
      console.log(`${req.body.name} already exists`);

    res.status(200).send("Failure");
    }

  } catch (error) {
    console.log(error);
  }


});



app.post('/login', bodyParser.urlencoded({ extended: false }), async (req, res) =>{

  try {

    var new_item = Login(
      req.body
    );
    const userExist = await Login.findOne({ email: req.body.email,password : req.body.pass });
      // console.log(userExist);
    const token = await userExist.generateAuthToken();
    //   console.log(token);

    res.cookie("jwt", token,{
      expires:new Date(Date.now() + 258920000000),
      httpOnly:true
    });

    


    if (!userExist) {
      // const result = await new_item.save();
      // console.log(result);

      console.log("register first");

      res.status(404).send("Register");

    } else {

      console.log("login successfully");
     

      res.status(201).send("success");
    }
      // console.log(`${req.body.name} already exists`);



  } catch (error) {
    console.log(error);
  }

});

app.get('/logout',auth,async(req,res)=>{

  try {
    res.clearCookie("jwt");
    console.log("logout successfully");
    
    await req.user.save();
    res.render('index');
    // res.status(201).send("success");
  } catch (error) {
    res.status(400).send(error);
    
  }

});





  



//create document or insert

const createDocument = async (itemName) => {


      const item = new Menu({
        name : `${itemName}`
      });
      const result = await item.save();
      console.log(result);
}
//createDocument();


//get document

const getDocument =async () => {
  const result = await Menu.find();
  console.log(result);
}

//getDocument();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
