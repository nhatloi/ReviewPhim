const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const News = new mongoose.Schema({
    WriterId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:[true,'please enter fields'],
    },
    description: {
        type: String,
    },
    link: {
        type: String,
    },
    source: {
        type: String,
    },
    time: {
        type: String,
    },
    img: {
        type: String,
    },
    title: {
        type: String,
    },

}, { timestamps: true })


module.exports = mongoose.model('News',News)