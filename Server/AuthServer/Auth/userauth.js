const UserModel = require('../Models/authModel');
const bcrypt = require('bcryptjs');
const passportLocal = require('passport-local');
const jwt =require('jsonwebtoken');
const { resolveContent } = require('nodemailer/lib/shared');
const SECRET_KEY = "this is book app"
// const  GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
// const passportGoogleAuth = () =>{
//     return new GoogleStrategy({
//         clientID:     GOOGLE_CLIENT_ID,
//         clientSecret: GOOGLE_CLIENT_SECRET,
//         callbackURL: "http://localhost:8000/api/profile",
//         passReqToCallback   : true
//       },
//       function(request, accessToken, refreshToken, profile, done) {
//         User.findOrCreate({ googleId: profile.id }, function (err, user) {
//           return done(err, user);
//         });
//       }
//     );
// }
const passportauth = () =>{
    return new passportLocal({ usernameField: 'email', passwordField: "password" }, function (username, password, done) {
        UserModel.findOne({ email: username }, (err, user) => {
            if (err) {
                return done(err);
            } else if (!user) {
                return done(null, false, { status: 409, message: "Invalid email id" })
            } else if (bcrypt.compareSync(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { status: 409, message: "Invalid password" })
            }
        })
    
    });
}
function generateJWT (user){
    
    return jwt.sign(user,SECRET_KEY , { expiresIn: '1h' });
}
function VerifyToken(token) {
    let res = jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err);
    if (res instanceof Error) {
        return false;
    } else {
        return res ;
    }
}
function VerifyAuthenticated(token) {
    let res = jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err);
    if (res instanceof Error) {
        return false;
    } else {
        return true ;
    }
}
function generateOTP() {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

module.exports = { passportauth ,  generateJWT ,VerifyToken ,VerifyAuthenticated ,generateOTP}