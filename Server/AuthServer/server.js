const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport');
const app = express();
const logger = require('morgan');
const { router } = require('./Routers/authRouter');
const UserModel = require('./Models/authModel');
const { passportauth } = require('./Auth/userauth');
const cors = require('cors');
const cookieParser = require('cookie-parser')
app.use(cookieParser());

app.use(cors({
    origin: true,
    credentials: true,
}));

// const URI = 'mongodb://localhost:27017/BookApp';
const URI = process.env.MONGODB_SERVER;
// session store in mongodb
const store = MongoDBStore({
    uri: URI,
    collection: 'booksession'
})

app.use(session({
    secret: 'this is passport',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 6000000
    },
    store: store
}));
// mongodb connection
mongoose.connect(URI);
mongoose.connection.once('open', () => {
    console.log('Mongodb connected')
})

//  Passport js USer authication
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user._id);
})

passport.deserializeUser(function (id, done) {
    UserModel.findById(id, function (err, user) {
        done(err, user);
    });
});
passport.use(passportauth());


app.use(bodyParser.json());
app.use(logger('dev'));
app.use('/api', router);

app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8003;

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

module.exports = app
