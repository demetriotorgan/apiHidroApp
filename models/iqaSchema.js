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
    hidrometroInicial:{
        type:Number,
        default:0
    },
    totalDeRecirculação:{
        type:Number,
        default:1
    },
    ph:{
        type: Number
    },    
    lavagensNoDia:{
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
    valorDeiqa:{
        type:String
    },
    obs:{
        type:String,
        default: ""
    },
    hidrometroFinal:{
        type:Number,
        default:0
    },
    horaFinal:{
        type:Date        
    },
    
    tempoRecirculacao:{
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('tambor', tamborSchema);
