const repo = require('../Repository/AuthRepo');
const { generateJWT, VerifyToken, VerifyAuthenticated } = require('../Auth/userauth')
const jwt = require('jsonwebtoken')
const SECRET_KEY = "this is book app"
const login = async (req, res) => {
    // console.log(req.body)
    const token =  await generateJWT(req.session.passport);
    res.cookie("jwt", token, { httpOnly: false ,maxAge: 6000000 })
    res.status(200).send({ message: "Your Are Login In to Website" , token : token});
}
const register = (req, res) => {
    repo.register(req.body).then(data => {
        res.status(data.status).send(data);
    }).catch(data =>{
        res.status(401).send(data);
    });
}
const profile = (req, res) => {
    repo.profile(req.user.user).then(data => {
        res.status(200).send(data);
    });
}

const changePassword = (req, res) => {
    repo.changePassword(req.user.user , req.body ).then(data => {
        res.status(200).send(data);
    }).catch(data =>{
        res.status(401).send(data);
    });
}

const logout = (req, res) => {
    req.logOut((err)=>{
        if(!err){
            res.send('logiu outttttttt')
        }
    });
}
const updateProfile = (req,res) =>{
    repo.updateProfile(req.user.user ,req.body).then(data =>{
        res.status(200).send(data);
    }).catch(data =>{
        res.status(401).send(data);
    })
}

function isAuthenticated(req, res) {
    const auth = VerifyAuthenticated(req.headers.authorization);
    if(auth){
        res.status(200).send({ isAuthenticated: auth});
    }else{
        res.status(404).send({ isAuthenticated: auth});
    }
}
function CreateOTP(req,res){
    repo.CreateOTP(req.body.email).then(data =>{
        // console.log(data)
        res.send(data);
    }).catch(data =>{
        res.status(401).send(data);
    })
}
function VerifyOTP(req,res){
    repo.VerifyOTP(req.body.otp,req.body.email,req.body.password).then(data =>{
        res.send(data);
    }).catch(data =>{
        res.status(401).send(data);
    })
}



module.exports = { login, profile, register, changePassword, logout, isAuthenticated ,updateProfile ,CreateOTP ,VerifyOTP};