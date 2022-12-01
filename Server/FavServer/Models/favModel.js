const mongoose = require('mongoose');

const favSchema = mongoose.Schema({
    _id: {
        type: String,
        require: true,
    },
    arr: [
        {
            _id: Number,
            coverImage: Number,
            title: String,
            key: String
        }
    ]
});


module.exports = mongoose.model('FavModel', favSchema, 'favdata');