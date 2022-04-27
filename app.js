//jshint esversion:6
require('dotenv').config()
const express = require ("express")
const bodyParser = require ("body-parser")
const ejs = require ("ejs")
const mongoose = require ('mongoose')
const encrypt  = require ('mongoose-encryption')


const app = express ();

//add this section after creating  .env  and copied paste secrete ecrtypt opener into .env

console.log(process.env.API_KEY) 





app.use(express.static("puplic"));;
app.set('view engine', 'ejs')
 app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

const userSchema = new mongoose.Schema({
  email: String,
  password: String
})

// add this from mongoose encrpt document inorder to encrpt certain info
userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] });




 const User = new mongoose.model("User", userSchema)

app.get("/home", function (req, res){
  res.render("home")
})
app.get("/login", function (req, res){
  res.render("login")
})


app.get("/register", function (req, res){
  res.render("register");
});


app.post("/register", function (req , res){
  const newUser = new User ({
   email: req.body.username,
    password: req.body.password
  })

  newUser.save(function(err){
    if (err){
      console.log(err);
    }else{

      //we are now rendering th secrete page because we only want make it accessible for users with acess
      res.render("secrets")
    }
  })
})

app.post("/login", function(req,res){
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({email: username}, function(err, foundUser){
    if (err){
      console.log(err);

    }else{
      if (foundUser){
        if (foundUser.password === password ){
          res.render("secrets")
        }
      }
    }

  })

})









app.listen(3000, function (){
  console.log("here we go server start")
})
