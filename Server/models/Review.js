const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Review = new mongoose.Schema({
    WriterId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:[true,'please enter fields'],
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
    },
    description: {
        type: String,
    },
    poster: {
        type: String,
    },
    title: {
        type: String,
    },
    post_date: {
        type: String,
    },
    content: {
        type: Array,
    },
    keywords: {
        type: Array,
    },

},)


module.exports = mongoose.model('Review',Review)