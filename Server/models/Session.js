const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Session = new mongoose.Schema({
    WriterId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:[true,'please enter fields'],
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
    },
    review: {
        type: Schema.Types.ObjectId,
        ref: 'Review',
    },
    news: {
        type: Schema.Types.ObjectId,
        ref: 'News',
    },
}, { timestamps: true })


module.exports = mongoose.model('Session',Session)