const Estimativa = require('../models/estimativaSchema');

module.exports.salvarEstimativa = async (req, res) => {
  try {
    const dados = req.body;

    // 🔍 Validação básica
    if (!dados?.modelo || !dados?.previsao || !dados?.custo) {
      return res.status(400).json({
        erro: 'Dados incompletos para salvar estimativa'
      });
    };

     const datas = (dados.snapshotDados || [])
      .map(item => new Date(item.data));

    const dataReferencia = datas.length
      ? new Date(Math.max(...datas))
      : new Date();

    // 🧠 Tratamento de dados (ESSENCIAL)
    const estimativaTratada = {
      ...dados,

      modelo: {
        ...dados.modelo,
        diasEstimados: Number(dados.modelo.diasEstimados),
        coeficienteA: Number(dados.modelo.coeficienteA),
        quantidadeRegistros: Number(dados.modelo.quantidadeRegistros || 0)
      },

      previsao: {
        consumoLitros: Number(dados.previsao.consumoLitros),
        consumoM3: Number(dados.previsao.consumoM3)
      },

      custo: {
        ...dados.custo,
        agua: Number(dados.custo.agua),
        esgoto: Number(dados.custo.esgoto),
        total: Number(dados.custo.total),

        detalhamento: (dados.custo.detalhamento || []).map(item => ({
          faixa: item.faixa,
          volumeM3: Number(item.volumeM3),
          agua: Number(item.agua),
          esgoto: Number(item.esgoto),
          total: Number(item.total)
        }))
      },
      snapshotDados: (dados.snapshotDados || []).map(item => ({
        data: new Date(item.data),
        leitura: Number(item.leitura)
      })),
      dataReferencia      
    };

    const novaEstimativa = await Estimativa.create(estimativaTratada);

    res.status(201).json(novaEstimativa);

  } catch (error) {
    console.error('Erro ao registrar estimativa:', error);

    res.status(500).json({
      erro: 'Erro ao salvar estimativa',
      detalhe: error.message
    });
  }
};

module.exports.listarEstimativas = async(req,res)=>{
  try {
    const estimativas = await Estimativa
      .find()
      .sort({createdAt: -1 })
    res.status(200).json(estimativas);
  } catch (error) {
    console.error("Erro ao buscar estimativas", error);
    res.status(500).json({
      erro:"Erro ao listar leituras"
    });
  }
};

module.exports.deletarEstimativa = async(req,res)=>{
  const {id} = req.params;
  try {
    const deletado = await Estimativa.findByIdAndDelete(id);
    if(!deletado){
      return res.status(404).json({erro: 'Registro não encontrado'})
    }
    res.status(200).json({menssagem: 'Leitura deletada com sucesso', deletado});
  } catch (error) {
    console.error('Erro ao deletar leitura: ', error);
    res.status(500).json({erro:'Erro ao deletar leitura'});
  }
};
