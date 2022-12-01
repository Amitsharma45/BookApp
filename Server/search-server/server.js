import express from "express";
import router from "./routes/searchRoutes.js";
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from "morgan";

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use('/api', router);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
export default app;