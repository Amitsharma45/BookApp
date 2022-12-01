const { v4: uuidv4 } = require('uuid');
const UserModel = require('../Models/authModel');
const bcrypt = require('bcryptjs');
const { generateOTP } = require('../Auth/userauth');
const { generateEmail } = require('../Email/UserEmail');

function CreateOTP(email){
    return new Promise((resolve,reject) =>{
        const otp = generateOTP();
        var dt = new Date();
        dt.setMinutes( dt.getMinutes() + 5 );
        UserModel.findOne({ email: email } ,(err,data)=>{
            if(data){
                UserModel.findOneAndUpdate({ email :email } , {resettoken : otp , resetExpr : dt } ,(err,data)=>{
                    if(!err){
                        generateEmail(otp,email);
                        resolve(`We Have send One Time Password(OTP) to your Email id : ${email}. OTP is valid for next 5 min`);
                    }
                })
            }else if(!data){
                reject("Please Check Your Email Id")
            }else {
                reject(err)
            }
        })
        
    });
}

function VerifyOTP(otp,email,password){
    var dt = new Date();
    return new Promise((resolve,reject) =>{
        UserModel.findOne({ email: email } ,(err,data)=>{
            if(data.resettoken === otp.toString() && data.resetExpr > dt){
                UserModel.findOneAndUpdate({ email :email } , {resettoken : '' ,password : bcrypt.hashSync(password, 10)} ,(err,data)=>{
                    if(!err){
                        resolve('Your Password Reset Successfully');
                    }
                })
            }else if(!data){
                resolve("Please Check Your Email Id")
            }else if(data.resettoken !== otp) {
                reject('inValid opt')
            }else if(dt> data.resetExpr){
                reject("Opt is Expire.")
            }else{
                reject(err);
            }
        })
    })
}
function profile(id) {
    return new Promise((resolve, reject) => {
        UserModel.findOne({ _id: id }, (err, data) => {
            if (data) {
                resolve(data);
            } else if(!data) {
                resolve('User does Not exisits')
            }else {
                reject(err);
            }
        });
    });
}

function register(detail) {
    return new Promise((resolve, reject) => {
        UserModel.findOne({ email: detail.email }, (err, data) => {
            if (data) {
                resolve({ status: 409, message: 'User  email already exists' });
            } else if(!err) {
                let AddUser = new UserModel({
                    _id: uuidv4(),
                    firstname: detail.firstName,
                    lastname: detail.lastName,
                    email: detail.email,
                    resettoken : 0,
                    password: bcrypt.hashSync(detail.password, 10)
                });
                AddUser.save((err) => {
                    if (!err) {
                        resolve({ status: 200, message: 'Your Account created successfully' });
                    } else {
                        reject(err);
                    }
                });
            }else{
                reject(err);
            }
        });

    });
}


function logout(req) {
    return new Promise((resolve, reject) => {
        req.logOut((err)=>{
            if(!err){
                resolve("Your are Logout");
            }else{
                reject(err);
            }
        });
    });
}
function changePassword(id, detail) {
    return new Promise((resolve, reject) => {
        UserModel.findOne({ _id: id} ,(err,data)=>{
            if(!err){
                if(bcrypt.compareSync(detail.password, data.password)){
                    UserModel.findOneAndUpdate({ _id: id} , {password : bcrypt.hashSync(detail.newpassword, 10)} ,(err,data)=>{
                        if(!err){
                            resolve("Your PassWord Change Succesfully");
                        }else{
                            reject(err);
                        }
                    });
                }else{
                    reject('Please Check Your Current Password');
                }
            }
        })
    });
}

function updateProfile(id,data){
    return new Promise ((resolve,reject) =>{
        UserModel.findOneAndUpdate({ _id: id} , {firstname : data.firstName , lastname : data.lastName } ,(err,data)=>{
            if(!err){
                resolve("Your Profile Change Succesfully");
            }else{
                reject("Some thing want Wrong")
            }
        });
    });
}


module.exports = { profile, changePassword, register ,logout , updateProfile , CreateOTP , VerifyOTP};