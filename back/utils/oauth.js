/*
const axios = require('axios');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const G_AUTORIZACION_URL = "https://accounts.google.com/o/oauth2/v2/auth"
const G_TOKEN_URL = "https://www.googleapis.com/oauth2/v4/token"
const G_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo"

const OAuth2Strategy = new GoogleStrategy({
    authorizationURL : G_AUTORIZACION_URL,
    tokenURL : G_TOKEN_URL,
    clientID : "226196706149-ftdlhd36nlatgn0kc9abupdjcbiu0o0f.apps.googleusercontent.com",
    clientSecret : "t2U9F8SDeGlyXN0WNphN0ddn",
    callbackURL : "/google-oauth/callback"
},
async (accessToken,refreshToken,profile,cb)=>{
    const {data, status} = await axios({
        url : `${}/api/auth/sign-provider`,
        method : "POST"
    })
})

*/

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: "226196706149-ftdlhd36nlatgn0kc9abupdjcbiu0o0f.apps.googleusercontent.com",
    clientSecret: "t2U9F8SDeGlyXN0WNphN0ddn",
    callbackURL: "http://localhost:3000/loginGoogle/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("aaaaaaaaaaaaaaaaa");
    console.log({accessToken,refreshToken,profile});
    done()
  }
  
));