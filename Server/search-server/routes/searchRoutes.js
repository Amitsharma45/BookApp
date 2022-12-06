import express from "express";
import {
    getWorksByAuthor, getWorksByTitle, getWorksBySubject, getBookDetail, getName
} from "../controllers/searchController.js";

const router = express.Router();



router.get('/getWorks/author', getWorksByAuthor);
router.get('/getWorks/title', getWorksByTitle);
router.get('/getWorks/subject', getWorksBySubject);
router.get('/getDetails', getBookDetail);
router.get('/getName', getName);

export default router;