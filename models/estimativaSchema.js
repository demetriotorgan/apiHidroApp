const mongoose = require('mongoose');

const DetalhamentoSchema = new mongoose.Schema({
  faixa: { type: String, required: true },
  volumeM3: { type: Number, required: true },
  agua: { type: Number, required: true },
  esgoto: { type: Number, required: true },
  total: { type: Number, required: true }
}, { _id: false });

const SnapshotSchema = new mongoose.Schema({
  data: { type: Date, required: true },
  leitura: { type: Number, required: true }
}, { _id: false });

const EstimativaSchema = new mongoose.Schema({

  dataCriacao: {
    type: Date,
    default: Date.now
  },

  modelo: {
    diasEstimados: { type: Number, required: true },
    coeficienteA: { type: Number, required: true },
    confiabilidade: { type: String, required: true },
    cor: { type: String },
    quantidadeRegistros: { type: Number }
  },

  previsao: {
    consumoLitros: { type: Number, required: true },
    consumoM3: { type: Number, required: true }
  },

  custo: {
    agua: { type: Number, required: true },
    esgoto: { type: Number, required: true },
    total: { type: Number, required: true },

    detalhamento: {
      type: [DetalhamentoSchema],
      default: []
    }
  },

  snapshotDados: {
    type: [SnapshotSchema],
    default: []
  },
  dataReferencia: {
  type: Date,
  required: true
}
}, {
  timestamps: true // createdAt, updatedAt automático
});

module.exports = mongoose.model("Estimativa", EstimativaSchema);