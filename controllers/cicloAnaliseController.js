const cicloAnaliseModel = require('../models/cicloAnaliseSchema');

module.exports.salvarCicloAnalise = async (req, res) => {
  try {
    const dados = {
      ciclo: {
        dataInicial: req.body.ciclo?.dataInicial,
        dataFinal: req.body.ciclo?.dataFinal
      },

      consumo: {
        real: Number(req.body.consumo?.real),
        previsto: Number(req.body.consumo?.previsto),
        erro: Number(req.body.consumo?.erro),
        erroPercentual: Number(req.body.consumo?.erroPercentual)
      },

      metricas: {
        MAE: Number(req.body.metricas?.MAE),
        RMSE: Number(req.body.metricas?.RMSE),
        MAPE: Number(req.body.metricas?.MAPE),
        BIAS: Number(req.body.metricas?.BIAS)
      },

      tendencia: req.body.tendencia,

      coeficiente: {
        anterior: Number(req.body.coeficiente?.anterior),
        sugerido: Number(req.body.coeficiente?.sugerido)
      },

      timestamp: req.body.timestamp || new Date()
    };

    const novoCiclo = await cicloAnaliseModel.create(dados);

    return res.status(201).json(novoCiclo);

  } catch (error) {
    console.error('Erro ao salvar ciclo de análise:', error);

    return res.status(500).json({
      erro: 'Erro ao salvar ciclo de análise',
      detalhe: error.message
    });
  }
};

module.exports.listarCiclosAnalise = async (req, res) => {
  try {
    const ciclos = await cicloAnaliseModel
      .find()
      .sort({ timestamp: -1 }); // mais recente primeiro

    return res.status(200).json(ciclos);

  } catch (error) {
    console.error('Erro ao buscar ciclos de análise:', error);

    return res.status(500).json({
      erro: 'Erro ao buscar ciclos de análise',
      detalhe: error.message
    });
  }
};

module.exports.ultimoCicloAnalise = async (req, res) => {
  try {
    const ultimo = await cicloAnaliseModel
      .findOne()
      .sort({ timestamp: -1 });

    if (!ultimo) {
      return res.status(404).json({
        erro: 'Nenhum ciclo encontrado'
      });
    }

    return res.status(200).json(ultimo);

  } catch (error) {
    console.error('Erro ao buscar último ciclo:', error);

    return res.status(500).json({
      erro: 'Erro ao buscar último ciclo',
      detalhe: error.message
    });
  }
};

module.exports.ciclosPorPeriodo = async (req, res) => {
  try {
    const { dataInicial, dataFinal } = req.query;

    if (!dataInicial || !dataFinal) {
      return res.status(400).json({
        erro: 'dataInicial e dataFinal são obrigatórias'
      });
    }

    const ciclos = await cicloAnaliseModel.find({
      "ciclo.dataFinal": {
        $gte: new Date(dataInicial),
        $lte: new Date(dataFinal)
      }
    }).sort({ timestamp: 1 });

    return res.status(200).json(ciclos);

  } catch (error) {
    console.error('Erro ao buscar ciclos por período:', error);

    return res.status(500).json({
      erro: 'Erro ao buscar ciclos por período',
      detalhe: error.message
    });
  }
};