const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const GitHubStrategy = require('passport-github2').Strategy;
const userModel = require("../models/userModel");
const userController = require("../controllers/userController");

var GITHUB_CLIENT_ID = "8c5245a240678035a9e0";
var GITHUB_CLIENT_SECRET = "7196ffd4cf365188aeb83565174217990d1f7f7c";

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:8000/auth/gitcallback"
},
function(accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function () { 
    let userExist = false;

    userModel.database.forEach((user)=>{

      if(user.id == profile.id && user.name == profile.displayName){
        console.log("user exists in database!");
        userExist = true;
        return done(null, profile);
      }

    })

    if(!userExist){
      let initialPass = parseInt(Math.random() * 100000000000);
      userModel.database.push(
        {
          id: profile.id,
          name: profile.displayName,
          site_admin: profile._json.site_admin,
          email: profile._json.email,
          password: initialPass,
        }
      );
    console.log(`Your temperoary password is: ${initialPass}. Please login to change it!`);

    // GitHub user now has local credentials
  
    return done(null, profile);
    }
  }); 
}
));

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: '/login' }),
  function(req, res) {
      if(userController.checkAdmin(req.body.email,req.body.password) == true){
        res.redirect('/admin');
      }else if(userController.checkAdmin(req.body.email,req.body.password) == false){
        res.redirect('/dashboard');
      }
  }
);
router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

router.get('/gitcallback', 
passport.authenticate('github', { failureRedirect: '/login' }),
function(req, res) {
    res.redirect('/dashboard');
});


  

module.exports = router;
