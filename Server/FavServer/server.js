const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors');
const logger = require('morgan');
const { router } = require('./Routes/favRouter')

// const URI = process.env.MONGODB_SERVER;
const URI = 'mongodb+srv://mongoadmin:amit1234@cluster0.ny6ohvf.mongodb.net/?retryWrites=true&w=majority';
app.use(cors({
    origin: true,
    credentials: true,
}));
// mongodb connection
mongoose.connect(URI);
mongoose.connection.once('open', () => {
    console.log('Mongodb connected')
})

app.use(bodyParser.json());
app.use(logger('dev'));
app.use('/api', router);

app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8001;

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
module.exports = app