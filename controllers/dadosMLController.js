// controllers/dadosMLController.js

const DadosML = require("../models/dadosML");

module.exports.salvarDadosML = async (req, res) => {
  try {
    const payload = req.body;

    // =====================================================
    // VALIDAÇÃO BÁSICA
    // =====================================================
    if (!payload || !payload.data) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Campo 'data' é obrigatório.",
      });
    }

    // =====================================================
    // UPSERT:
    // Se já existir um registro para a mesma data,
    // ele será atualizado.
    // Caso contrário, será criado.
    // =====================================================
    const dadosSalvos = await DadosML.findOneAndUpdate(
      { data: payload.data },
      payload,
      {
        new: true,           // retorna o documento atualizado
        upsert: true,        // cria se não existir
        runValidators: true, // aplica validações do schema
        setDefaultsOnInsert: true,
      }
    );

    // Verifica se foi criação ou atualização
    const statusCode = dadosSalvos.createdAt.getTime() === dadosSalvos.updatedAt.getTime()
      ? 201
      : 200;

    console.log("Snapshot de ML salvo com sucesso.");
    console.log(`Data: ${dadosSalvos.data}`);

    return res.status(statusCode).json({
      sucesso: true,
      mensagem:
        statusCode === 201
          ? "Snapshot criado com sucesso."
          : "Snapshot atualizado com sucesso.",
      dados: dadosSalvos,
    });
  } catch (error) {
    console.error("Erro ao salvar dados de ML:", error.message);

    // =====================================================
    // ERRO DE CHAVE DUPLICADA
    // (caso não esteja usando upsert em algum cenário)
    // =====================================================
    if (error.code === 11000) {
      return res.status(409).json({
        sucesso: false,
        mensagem: "Já existe um snapshot cadastrado para esta data.",
      });
    }

    // =====================================================
    // ERRO DE VALIDAÇÃO DO MONGOOSE
    // =====================================================
    if (error.name === "ValidationError") {
      const mensagens = Object.values(error.errors).map(
        (err) => err.message
      );

      return res.status(400).json({
        sucesso: false,
        mensagem: "Erro de validação.",
        erros: mensagens,
      });
    }

    // =====================================================
    // ERRO GENÉRICO
    // =====================================================
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro interno ao salvar os dados de ML.",
      erro: error.message,
    });
  }
};

/**
 * Lista todos os snapshots de dados de ML.
 * Ordena pela data mais recente primeiro.
 */
module.exports.listarDadosML = async (req, res) => {
  try {
    const registros = await DadosML.find()
      .sort({ data: -1 }) // mais recentes primeiro
      .lean();

    return res.status(200).json({
      sucesso: true,
      total: registros.length,
      dados: registros,
    });
  } catch (error) {
    console.error("Erro ao listar dados de ML:", error.message);

    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro ao listar os dados de ML.",
      erro: error.message,
    });
  }
};

//Deletar registro de ML
module.exports.deletarRegistroML = async(req,res)=>{
  const {id} = req.params;
  try {
    const deletado = await DadosML.findByIdAndDelete(id);
      if(!deletado){
        return res.status(404).json({erro:'Registro não encontrado'})
      }
      res.status(200).json({menssagem:'Registro de ML deletado com sucesso', deletado});
  } catch (error) {
    console.error('Erro ao deletar registro de ML: ', error);
    res.status(500).json({erro:'Erro ao deletar registro de ML'});
  }
};
