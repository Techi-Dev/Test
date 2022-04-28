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





// app.post("/register", function (req , res){

//   bcrypt.hash(req.body.password, saltRounds, function(err, hash) {


//     const newUser = new User ({
//      email: req.body.username,
//       // password: md5(req.body.password)
//       password: hash

//     })

//     newUser.save(function(err){
//       if (err){
//         console.log(err);
//       }else{

//         //we are now rendering th secrete page because we only want make it accessible for users with acess
//         res.render("secrets")
//       }
//     })
//    });
// })






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


// app.post("/login", function(req,res){
//   const username = req.body.username;
//   // const password = md5(req.body.password); //this was a hash line
//   const password = req.body.password;


//   User.findOne({email: username}, function(err, foundUser){
//     if (err){
//       console.log(err);

//     }else{
//       if (foundUser){
//         bcrypt.compare(password, foundUser.password, function(err, result) {
//           if (result ===true){
//             res.render("secrets")
//           }
//             // Store hash in your password DB.
//         });
//         }
//       }

//   })

// })







app.listen(3000, function (){
  console.log("here we go server start")
})


















//jshint esversion:6


// require('dotenv').config()
// const express = require ("express")
// const bodyParser = require ("body-parser")
// const ejs = require ("ejs")
// const mongoose = require ('mongoose')
// const session = require('express-session')
// const passport = require ("passport")
// const passportLocalMongoose= require ("passport-local-mongoose")


// hash
// const md5 = require ("md5")

// bcrypt
// const bcrypt = require ("bcrypt")
// const saltRounds = 10;




// const app = express ();





//add this section after creating  .env  and copied paste secrete ecrtypt opener into .env




// app.use(express.static("puplic"));;
// app.set('view engine', 'ejs')
//  app.use(bodyParser.urlencoded({extended: true}));


//  app.use(session({
//    secret: 'keyboard cat',
//    resave: false,
//    saveUninitialized: false,

//  }))

// app.use(passport.initialize());
// app.use(passport.session());



// mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

// const userSchema = new mongoose.Schema({
//   email: String,
//   password: String
// })


// userSchema.plugin(passportLocalMongoose);



// add this from mongoose encrpt document inorder to encrpt certain info
//  userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] });











//  const User = new mongoose.model("User", userSchema)

// passport.use(User.createStrategy());

//  passport.serializeUser(User.serializeUser());
//  passport.deserializeUser(User.deserializeUser());





// app.get("/", function (req, res){
//   res.render("home")
// })
// app.get("/login", function (req, res){
//   res.render("login")
// })


// app.get("/register", function (req, res){
//   res.render("register");
// });








// app.get("/secrets", function(req, res){
//   if (req.isAuthenticated()){
//     res.render("secrets");
//   }else{
//     res.redirect("/login")
//   }
// });


// app.get("/logout", function (req, res){
//   req.logout();
//   res.redirect("/");
// })


// app.post("/register", function(req, res){

//   User.register({username: req.body.username}, req.body.password, function(err, user){
//     if (err) {
//       console.log(err);
//       res.redirect("/register");
//     } else {
//       passport.authenticate("local")(req, res, function(){
//         res.redirect("/secrets");
//       });
//     }
//   });

// });






// app.post("/login", function(req,res){

//   const user = new User({
//     username: req.body.username,
//     password: req.body.password
//   })
// req.login(user, function(err){
//   if(err){
//     console.log(err);

//   }else{
//     passport.authenticate("local")(req, res, function (){
//       res.redirect("/secrets");
//     })
//   }
// })

// })









// app.listen(3000, function (){
//   console.log("here we go server start")
// })














// ===============================================================

//jshint esversion:6
// require('dotenv').config()
// const express = require ("express")
// const bodyParser = require ("body-parser")
// const ejs = require ("ejs")
// const mongoose = require ('mongoose')
// const session = require('express-session')
// const passport = require ("passport")
// const passportLocalMongoose= require ("passport-local-mongoose")
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const findOrCreate = require('mongoose-findorcreate')




// // hash
// // const md5 = require ("md5")

// // bcrypt
// // const bcrypt = require ("bcrypt")
// // const saltRounds = 10;




// const app = express ();

// //add this section after creating  .env  and copied paste secrete ecrtypt opener into .env




// app.use(express.static("puplic"));;
// app.set('view engine', 'ejs')
//  app.use(bodyParser.urlencoded({extended: true}));


//  app.use(session({
//    secret: 'keyboard cat',
//    resave: false,
//    saveUninitialized: false,

//  }))

// app.use(passport.initialize());
// app.use(passport.session());



// mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

// const userSchema = new mongoose.Schema({
//   email: String,
//   password: String,
//   googleId: String,
//   //googleId allows us to save users  id that connected through google  in our data
//   secret: String
// })


// userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);




// // add this from mongoose encrpt document inorder to encrpt certain info
// // userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] });

//  const User = new mongoose.model("User", userSchema)

// passport.use(User.createStrategy());


// //local authentication
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });



//  passport.use(new GoogleStrategy({
//      clientID: process.env.CLIENT_ID,
//      clientSecret: process.env.CLIENT_SECRET,
//      callbackURL: "http://localhost:3000/auth/google/secrets",
//      userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo"
//    },
//    function(accessToken, refreshToken, profile, cb) {
//      console.log(profile)


//      User.findOrCreate({ googleId: profile.id }, function (err, user) {
//        return cb(err, user);
//      });
//    }
//  ));




// app.get("/", function (req, res){
//   res.render("home")
// })


// // Google

// //this brings google pup up or redirect us to google to log in or sign up
// app.get('/auth/google',
//   passport.authenticate("google", {scope:["profile"] })

// )

// app.get("/auth/google/secrets",
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect to secret.
//     res.redirect('/secrets');
//   });







// app.get("/login", function (req, res){
//   res.render("login")
// })


// app.get("/register", function (req, res){
//   res.render("register");
// });

// app.get("/secrets", function(req, res){
//   if (req.isAuthenticated()){
//     res.render("secrets");
//   }else{
//     res.redirect("/login")
//   }
// });


// // submit this checks whether the user is authnticated inorder to access the page 

// app.get("/submit", function(req, res){
//   if (req.isAuthenticated()){
//     res.render("submit");
//   }else{
//     res.redirect("/login")
//   }
// });


// app.post("/submit", function(req, res){
//   const submittedSecret = req.body.secret;

//    console.log(req.user.id)

//   User.findById(req.user.id,function(err , foundUser){
//     if (err){
//       console.log(err)

//     }else{
//       if (foundUser){
//         foundUser.secret =submittedSecret;
//         foundUser.save (function(){
//           res.redirect("/secrets")
//         })
//       }
//     }
//   })
// })




// app.get("/logout", function (req, res){
//   req.logout();
//   res.redirect("/");
// })





// app.post("/register", function(req, res){

//   User.register({username: req.body.username}, req.body.password, function(err, user){
//     if (err) {
//       console.log(err);
//       res.redirect("/register");
//     } else {
//       passport.authenticate("local")(req, res, function(){
//         res.redirect("/secrets");
//       });
//     }
//   });

// });






// app.post("/login", function(req,res){

//   const user = new User({
//     username: req.body.username,
//     password: req.body.password
//   })
// req.login(user, function(err){
//   if(err){
//     console.log(err);

//   }else{
//     passport.authenticate("local")(req, res, function (){
//       res.redirect("/secrets");
//     })
//   }
// })

// })









// app.listen(3000, function (){
//   console.log("here we go server start")
// })
