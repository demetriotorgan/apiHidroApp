const mongoose = require('mongoose');

const dadosMLSchema = new mongoose.Schema({
     // =====================================================
    // IDENTIFICAÇÃO DO SNAPSHOT
    // =====================================================

    // Data em que o snapshot foi gerado.
    // Formato esperado: "2026-05-17"
    data: {
      type: String,
      required: true,
      unique: true,   // Garante apenas um registro por data
      index: true,
    },
    // Dia do ciclo em relação à última leitura da SANEPAR
    diaDoCiclo: {
      type: Number,
      required: true,
      min: 0,
    },
      // =====================================================
    // VARIÁVEIS DE ENTRADA (FEATURES)
    // =====================================================
    entrada: {
      leituraPrevistaAtual: {
        type: Number,
        required: true,
      },

      leituraAtualReal: {
        type: Number,
        required: true,
      },

      consumoPrevistoAtual: {
        type: Number,
        required: true,
      },

      consumoRealAtual: {
        type: Number,
        required: true,
      },

      coeficienteA: {
        type: Number,
        required: true,
      },
    },
    // =====================================================
    // MÉTRICAS DE ERRO
    // =====================================================
    metricas: {
      erro: {
        type: Number,
        required: true,
      },

      erroPercentual: {
        type: Number,
        required: true,
      },

      erroPorDia: {
        type: Number,
        required: true,
      },

      erroProjetado: {
        type: Number,
        required: true,
      },
    },
     // =====================================================
    // PREVISÕES DA FATURA
    // =====================================================
    previsao: {
      consumoPrevistoFatura: {
        type: Number,
        default: null,
      },

      leituraPrevistaFatura: {
        type: Number,
        default: null,
      },

      leituraCorrigida: {
        type: Number,
        default: null,
      },
    },
    // =====================================================
    // TARGETS REAIS (PREENCHIDOS FUTURAMENTE)
    // =====================================================
    target: {
      leituraFinalReal: {
        type: Number,
        default: null,
      },

      consumoFinalReal: {
        type: Number,
        default: null,
      },

      ajusteIdeal: {
        type: Number,
        default: null,
      },

      erroFinal: {
        type: Number,
        default: null,
      },
    },  
},
{
    timestamps: true, // createdAt e updatedAt automáticos
    versionKey: false,
  }
);
module.exports = mongoose.model('dadosML', dadosMLSchema);
