const mongoose = require('mongoose');

const hidrometroSchema  = new mongoose.Schema({
    data:{
        type:Date,
        default: Date.now
    },
    horario:{
        type:String
    },
    leitura:{
        type:Number
    },
    obs:{
        type:String
    }
})

module.exports = mongoose.model('hidrometro', hidrometroSchema);