const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Rate = new mongoose.Schema({
    WriterId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:[true,'please enter User'],
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required:[true,'please enter Movie'],
    },
    content: {
        type: String
    },
    rate:{
        type:Number,
        required:[true,'please enter Movie'],
    }

},)


module.exports = mongoose.model('Rate',Rate)