const cicloAnaliseModel = require('../models/cicloAnaliseSchema');

function normalizarTendencia(tendencia) {
  if (tendencia === "superestimando") return "superestimando";
  if (tendencia === "subestimando") return "subestimando";
  return "neutra";
}

// 🔒 INSPEÇÃO DE QUALIDADE
function validarPayload(body) {
  const erros = [];

  if (!body?.ciclo?.dataInicial) erros.push("ciclo.dataInicial obrigatório");
  if (!body?.ciclo?.dataFinal) erros.push("ciclo.dataFinal obrigatório");

  if (body?.consumo?.real == null) erros.push("consumo.real obrigatório");
  if (body?.consumo?.previsto == null) erros.push("consumo.previsto obrigatório");
  if (body?.consumo?.erro == null) erros.push("consumo.erro obrigatório");
  if (body?.consumo?.erroPercentual == null) erros.push("consumo.erroPercentual obrigatório");

  if (body?.metricas?.MAE == null) erros.push("metricas.MAE obrigatório");
  if (body?.metricas?.RMSE == null) erros.push("metricas.RMSE obrigatório");
  if (body?.metricas?.MAPE == null) erros.push("metricas.MAPE obrigatório");
  if (body?.metricas?.BIAS == null) erros.push("metricas.BIAS obrigatório");

  if (!body?.tendencia) erros.push("tendencia obrigatória");

  if (body?.coeficiente?.anterior == null) erros.push("coeficiente.anterior obrigatório");
  if (body?.coeficiente?.sugerido == null) erros.push("coeficiente.sugerido obrigatório");

  return erros;
}

module.exports.salvarCicloAnalise = async (req, res) => {
  try {
    // 🔍 1. INSPEÇÃO DE QUALIDADE
    const erros = validarPayload(req.body);

    if (erros.length > 0) {
      return res.status(400).json({
        erro: "Payload inválido",
        detalhes: erros
      });
    }

    // 🔧 2. NORMALIZAÇÃO CONTROLADA
    const dados = {
      ciclo: {
        dataInicial: new Date(req.body.ciclo.dataInicial),
        dataFinal: new Date(req.body.ciclo.dataFinal)
      },

      consumo: {
        real: Number(req.body.consumo.real),
        previsto: Number(req.body.consumo.previsto),
        erro: Number(req.body.consumo.erro),
        erroPercentual: Number(req.body.consumo.erroPercentual)
      },

      metricas: {
        MAE: Number(req.body.metricas.MAE),
        RMSE: Number(req.body.metricas.RMSE),
        MAPE: Number(req.body.metricas.MAPE),
        BIAS: Number(req.body.metricas.BIAS)
      },

      tendencia: normalizarTendencia(req.body.tendencia),

      coeficiente: {
        anterior: Number(req.body.coeficiente.anterior),
        sugerido: Number(req.body.coeficiente.sugerido)
      },

      timestamp: new Date()
    };

    // 🔑 3. CHAVE ÚNICA (controle de duplicidade)
    const filtro = {
      "ciclo.dataInicial": dados.ciclo.dataInicial,
      "ciclo.dataFinal": dados.ciclo.dataFinal
    };

    // 💾 4. UPSERT CONTROLADO
    const resultado = await cicloAnaliseModel.findOneAndUpdate(
      filtro,
      dados,
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      }
    );

    return res.status(200).json({
      mensagem: "Ciclo salvo com sucesso",
      dados: resultado
    });

  } catch (error) {
    console.error("❌ Erro ao salvar ciclo de análise:", error);

    return res.status(500).json({
      erro: "Erro interno ao salvar ciclo de análise",
      detalhe: error.message
    });
  }
};

module.exports.listarCiclosAnalise = async (req, res) => {
  try {
    const ciclos = await cicloAnaliseModel
      .find()
      .sort({ "ciclo.dataFinal": -1 }); // ordenação lógica do ciclo

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

module.exports.deletarCicloAnalise = async (req, res) => {
  try {
    const { id } = req.params;

    // validação simples do ID
    if (!id) {
      return res.status(400).json({
        erro: 'ID do ciclo não informado'
      });
    }

    const cicloDeletado = await cicloAnaliseModel.findByIdAndDelete(id);

    if (!cicloDeletado) {
      return res.status(404).json({
        erro: 'Ciclo de análise não encontrado'
      });
    }

    return res.status(200).json({
      mensagem: 'Ciclo de análise deletado com sucesso',
      ciclo: cicloDeletado
    });

  } catch (error) {
    console.error('Erro ao deletar ciclo de análise:', error);

    return res.status(500).json({
      erro: 'Erro ao deletar ciclo de análise',
      detalhe: error.message
    });
  }
};

//deletar lista salva de ciclos (CUIDADO!!!!)
module.exports.limparCiclosAnalise = async (req, res) => {
  try {

    const resultado = await cicloAnaliseModel.deleteMany({});

    return res.status(200).json({
      mensagem: 'Todos os ciclos de análise foram deletados com sucesso',
      totalDeletados: resultado.deletedCount
    });

  } catch (error) {
    console.error('Erro ao limpar ciclos de análise:', error);

    return res.status(500).json({
      erro: 'Erro ao limpar ciclos de análise',
      detalhe: error.message
    });
  }
};