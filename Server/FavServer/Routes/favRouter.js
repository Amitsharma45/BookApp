const express = require('express');
const router = express.Router();
const { addfavorite, getfavorite ,removefavorite} = require('../Controllers/favController')



router.get('/getfavorite',getfavorite );
router.post('/addfavorite',addfavorite);
router.put('/removefavorite', removefavorite)

module.exports = { router }