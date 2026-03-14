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
        type: Number
    },
    tempoRecirculacao:{
        type: Number
    },
    filtragem:{
        type: Boolean        
    },
    tempoDeFiltragem:{
        type: Number
    },
    ph:{
        type: Number
    },
    cloro:{
        type: Number
    },
    acido:{
        type: Number
    },
    tipoAcido:{
        type: String
    },
    aguaSanitaria:{
        type: Number
    },
    lavagensDoDia:{
        type: Number
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
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('tambor', tamborSchema);
