const mongoose = require('mongoose');

const TIPOS_LAVAGEM = ['leve', 'moderada', 'pesada'];
const NIVEIS_MAQUINA = ['baixo', 'medio', 'alto'];
const MODOS_LAVAGEM = ['curto', 'normal', 'longo'];

const lavagemSchema = new mongoose.Schema({
    data: {
        type: Date,
        required: [true, "A data é obrigatória"]
    },

    obs: {
        type: String,
        trim: true,
        maxlength: 300
    },

    pesoRoupas: {
        type: Number,
        required: true,
        min: [0, "Peso não pode ser negativo"]
    },

    tipoLavagem: {
        type: String,
        enum: TIPOS_LAVAGEM,
        required: true
    },

    nivelMaquina: {
        type: String,
        enum: NIVEIS_MAQUINA,
        required: true
    },
    litros:{
        type:Number,
        required:true,
        min:0
    },
    sabao: {
        type: Number,
        required: true,
        min: 0
    },

    amaciante: {
        type: Number,
        required: true,
        min: 0
    },

    modoLavagem: {
        type: String,
        enum: MODOS_LAVAGEM,
        required: true
    },
    enchague:{
        type: Number,
        required: true
    }

}, {
    timestamps: true
});

module.exports =  mongoose.model("Lavagem", lavagemSchema);