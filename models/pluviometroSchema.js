const mongoose = require('mongoose');

const pluviometroSchema = new mongoose.Schema({
    data:{
        type:Date,
        default:Date.now
    },
    coluna:{
        type:Number
    },
    mm:{
        type:Number
    },
    obs:{
        type:String
    }
})

module.exports = mongoose.model('pluviometro', pluviometroSchema);