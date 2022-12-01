const express = require('express');
const router = express.Router();
const { addfavorite, getfavorite ,removefavorite} = require('../Controllers/favController')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));


router.get('/getfavorite',getfavorite );
router.post('/addfavorite',addfavorite);
router.put('/removefavorite', removefavorite)

module.exports = { router }