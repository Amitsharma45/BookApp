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
    origin:true,
    credentials: true,
}));

const URI = 'mongodb+srv://mongoadmin:amit1234@cluster0.ny6ohvf.mongodb.net/?retryWrites=true&w=majority';
// const URI = process.env.MONGODB_SERVER;
// session store in mongodb
const store = MongoDBStore({
    uri: URI,
    collection: 'booksession'
})
app.set("trust proxy", 1);

app.use(session({
    secret: 'this is passport',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 6000000,
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax', // must be 'none' to enable cross-site delivery
        secure: process.env.NODE_ENV === "production"// must be true if sameSite='none'
    },
    store: store
}));

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// });
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
