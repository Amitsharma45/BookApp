import express from "express";
import {
    getWorksByAuthor, getWorksByTitle, getWorksBySubject, getBookDetail, getName
} from "../controllers/searchController.js";
import swaggerUI from "swagger-ui-express";
import swaggerDoc from "../swagger.json" assert {type: "json"};
const router = express.Router();

router.use('/api-docs', swaggerUI.serve);
router.get('/api-docs', swaggerUI.setup(swaggerDoc));

router.get('/getWorks/author', getWorksByAuthor);
router.get('/getWorks/title', getWorksByTitle);
router.get('/getWorks/subject', getWorksBySubject);
router.get('/getDetails', getBookDetail);
router.get('/getName', getName);

export default router;