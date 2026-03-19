const mongoose = require('mongoose');

const tamborSchema = new mongoose.Schema({
    data:{
        type: Date,
        default: Date.now
    },
    hora:{
        type: Date,
        default: Date.now
    },
    volume:{
        type: Number
    },
    recirculacao:{
        type: Number,
        default: 0
    },
    tempoRecirculacao:{
        type: Number,
        default: 0
    },
    filtragem:{
        type: Boolean,
        default: false
    },
    tempoDeFiltragem:{
        type: Number,
        default: 0
    },
    ph:{
        type: Number
    },
    cloro:{
        type: Number
    },
    acido:{
        type: Number,
        default: 0
    },
    tipoAcido:{
        type: String,
        default: "Sem ácido"
    },
    aguaSanitaria:{
        type: Number,
        default: 0
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
