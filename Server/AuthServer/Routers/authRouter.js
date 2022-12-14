const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportLocal = require('passport-local');
const { login, register, profile, changePassword, forgetPassword, logout  , isAuthenticated ,updateProfile ,CreateOTP ,VerifyOTP} = require("../Controllers/authController");
const  { isLoginMiddleware ,VerifyTokenMiddleware } = require('../Middleware/middlewares')




router.get('/profile', VerifyTokenMiddleware, profile);
router.post('/login',passport.authenticate('local'),login);
router.post('/register',register);
router.get('/isAuthenticated', isAuthenticated);
router.put('/changepassword',VerifyTokenMiddleware,changePassword);
router.post('/logout',logout);
router.put('/updateProfile',VerifyTokenMiddleware ,updateProfile);
router.post('/createotp' ,CreateOTP);
router.post('/resetpassword', VerifyOTP)

module.exports = { router };    