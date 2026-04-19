const mongoose = require('mongoose');

const tamborSchema = new mongoose.Schema({
    data:{
        type: Date,
        default: Date.now
    },
    volume:{
        type: Number
    },
    horaInicial:{
        type: Date,
        default: Date.now
    },
    horaFinal:{
        type:Date        
    },
    totalDeRecirculação:{
        type:Number,
        default:1
    },
    tempoRecirculacao:{
        type: Number,
        default: 0
    },    
    ph:{
        type: Number
    },    
    lavagensDoDia:{
        type: Number,
        default: 0
    },
    cor:{
        type: String,
        enum:["transparente", "cinzaClaro", "cinza", "cinzaEscuro"]
    },
    turbidez:{
        type: String,
        enum:["baixa", "media", "alta", "muitaAlta"]
    },
    odor:{
        type: String,
        enum:["semOdor", "leveOdor", "forteOdor"]
    },
    obs:{
        type:String,
        default: ""
    },
    iqa:{
        type:String
    },
    classificacaoIQA:{
         type:String,
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('tambor', tamborSchema);
