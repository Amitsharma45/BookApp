const favModel = require('../Models/favModel');
const { v4: uuidv4 } = require("uuid")
const repo = require('../Repository/favRepo')
const getfavorite = (req, res) => {
    repo.getfavorite(req.query._id).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(401).send(err);
    })
}

const addfavorite = (req, res) => {
    repo.addfavorite(req.body).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(404).send(err);
    })
}
const removefavorite = (req, res) => {
    repo.removefavorite(req.body).then(data =>{
        res.status(200).send(data);
    }).catch(data =>{
        res.status(404).send(data);
    })
}
module.exports = { addfavorite, removefavorite, getfavorite };