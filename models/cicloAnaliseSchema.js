const mongoose = require('mongoose');

const cicloSchema = new mongoose.Schema({
    dataInicial: {
        type: Date,
        required: true
    },
    dataFinal: {
        type: Date,
        required: true
    }
}, { _id: false });

const consumoSchema = new mongoose.Schema({
    real: {
        type: Number,
        required: true
    },
    previsto: {
        type: Number,
        required: true
    },
    erro: {
        type: Number,
        required: true
    },
    erroPercentual: {
        type: Number,
        required: true
    }
}, { _id: false });

const metricasSchema = new mongoose.Schema({
    MAE: {
        type: Number,
        required: true
    },
    RMSE: {
        type: Number,
        required: true
    },
    MAPE: {
        type: Number,
        required: true
    },
    BIAS: {
        type: Number,
        required: true
    }
}, { _id: false });

const coeficienteSchema = new mongoose.Schema({
    anterior: {
        type: Number,
        required: true
    },
    sugerido: {
        type: Number,
        required: true
    }
}, { _id: false });

const cicloAnaliseSchema = new mongoose.Schema({
    ciclo: {
        type: cicloSchema,
        required: true
    },

    consumo: {
        type: consumoSchema,
        required: true
    },

    metricas: {
        type: metricasSchema,
        required: true
    },

    tendencia: {
        type: String,
        enum: ["superestimando", "subestimando", "neutra"],
        required: true
    },

    coeficiente: {
        type: coeficienteSchema,
        required: true
    },

    timestamp: {
        type: Date,
        default: () => new Date(),
        immutable: true
    }
});

cicloAnaliseSchema.index(
  { "ciclo.dataInicial": 1, "ciclo.dataFinal": 1 },
  { unique: true }
);

module.exports = mongoose.model('CicloAnalise', cicloAnaliseSchema);