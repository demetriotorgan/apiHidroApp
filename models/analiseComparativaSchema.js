const mongoose = require('mongoose');

const PeriodoSchema = new mongoose.Schema({
  dataInicial: { type: String, required: true },
  dataFinal: { type: String, required: true },
  quantidadeDias: { type: Number, required: true }
}, { _id: false });

const ConsumoRealSchema = new mongoose.Schema({
  litros: { type: Number, required: true },
  unidades: { type: Number, required: true },
  leituraInicial: { type: Number, required: true },
  leituraFinal: { type: Number, required: true }
}, { _id: false });

const ModeloSchema = new mongoose.Schema({
  consumoEstimado: { type: Number, required: true },
  coeficiente: { type: Number, required: true },
  confiabilidade: { type: String, required: true },
  custoEstimado: { type: Number, required: true }
}, { _id: false });

const ComparacaoSchema = new mongoose.Schema({
  diferenca: { type: Number, required: true },
  erroPercentual: { type: Number, required: true },
  acuracia: { type: Number, required: true },
  tendencia: { 
    type: String, 
    enum: ["superestimando", "subestimando", "preciso"],
    required: true 
  },
  classificacao: { 
    type: String, 
    enum: ["excelente", "boa", "regular", "ruim"],
    required: true 
  }
}, { _id: false });

const MetadataSchema = new mongoose.Schema({
  totalRegistros: { type: Number, required: true },
  versaoModelo: { type: String, required: true }
}, { _id: false });

const AnaliseComparativaSchema = new mongoose.Schema({
  dataCriacao: { 
    type: Date, 
    required: true, 
    default: Date.now 
  },

  periodo: { 
    type: PeriodoSchema, 
    required: true 
  },

  consumoReal: { 
    type: ConsumoRealSchema, 
    required: true 
  },

  modelo: { 
    type: ModeloSchema, 
    required: true 
  },

  comparacao: { 
    type: ComparacaoSchema, 
    required: true 
  },

  metadata: { 
    type: MetadataSchema, 
    required: true 
  }

}, {
  timestamps: true // cria createdAt e updatedAt automaticamente
});

// Busca por período
AnaliseComparativaSchema.index({ "periodo.dataInicial": 1 });
AnaliseComparativaSchema.index({ "periodo.dataFinal": 1 });

// Análise de qualidade do modelo
AnaliseComparativaSchema.index({ "comparacao.classificacao": 1 });
AnaliseComparativaSchema.index({ "comparacao.erroPercentual": 1 });

// Ordenação temporal
AnaliseComparativaSchema.index({ dataCriacao: -1 });


module.exports = mongoose.model("AnaliseComparativa", AnaliseComparativaSchema);