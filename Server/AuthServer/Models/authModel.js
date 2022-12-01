const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    _id:{
        type : String,
        required : true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resettoken : String,
    resetExpr : Date
});

module.exports = mongoose.model('UserModel', UserSchema, 'Users');
