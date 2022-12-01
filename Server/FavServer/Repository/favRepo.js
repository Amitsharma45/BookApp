const  favModel = require('../Models/favModel');
const { v4: uuidv4 } = require("uuid")

function getfavorite(id){
    return new Promise((resolve,reject) =>{
        favModel.findOne({_id : id} , (err,data) =>{
            if(!err){
                resolve(data);
            }else if(!data){
                reject("No item present in Favorite");
            }else {
                reject(err);
            }
        });
    });
}

function addfavorite(detail){
    // console.log(detail);
    return new Promise((resolve,reject) =>{
        favModel.findOne({_id : detail._id} , (err,data) =>{
            if(!data){
                const User = new favModel({
                    _id: detail._id,
                    arr: [{
                        _id : detail.coverImage,
                        title : detail.title ,
                        coverImage :detail.coverImage ,
                        key : detail.key
                    }]
                })
                User.save((err) =>{
                    if(!err){
                        resolve("Book Added to favorite SuccessFully");
                    }
                })
            }else if(data){
                favModel.findOneAndUpdate( { _id : detail._id} , { $push : { arr : {_id : detail.coverImage, title : detail.title , coverImage :detail.coverImage , key : detail.key}}} ,(err,data) =>{
                    if(!err){
                        resolve("Book Added to favorite SuccessFully");
                    }
                })
            }else{
                 reject(err);
            }
        });
        
    });
}

function removefavorite(detail){
    // console.log(detail)
    return new Promise((resolve,reject) =>{
        favModel.findOneAndUpdate( { _id : detail._id} , { $pull : { arr : {coverImage : detail.coverImage}}} ,(err,data) =>{
            if(!err){
                resolve("Book Removed from favorite SuccessFully");
            }else{
                reject(err)
            }
        })
    })
}

module.exports= {getfavorite ,addfavorite ,removefavorite};