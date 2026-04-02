const mongoose = require('mongoose');

const ultimaLeituraSchema = new mongoose.Schema({
    data:{
        type:Date,
        default: Date.now
    },
    leitura:{
        type:Number,
        required:true
    },
    obs:{
        type:String
    }
},{
    timestamps:true
});

module.exports = mongoose.model('ultimaLeitura', ultimaLeituraSchema);