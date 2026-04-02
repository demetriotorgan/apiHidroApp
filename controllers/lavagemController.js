const lavagemModel = require('../models/lavagemSchema');

module.exports.salvarLavagem = async(req,res)=>{
    try {
        const dados = {
            ...req.body,
            pesoRoupas: Number(req.body.pesoRoupas),
            enchague: Number(req.body.enchague),
            litros: Number(req.body.litros),
            sabao: Number(req.body.sabao),
            amaciante:Number(req.body.amaciante)
        };

        // Validação básica
        if (!dados.data || !dados.pesoRoupas) {
            return res.status(400).json({
                erro: "Campos obrigatórios não preenchidos"
            });
        }

        const novaLavagem = await lavagemModel.create(dados);
        res.status(201).json(novaLavagem);
    } catch (error) {
        console.error('Erro ao salvar registro de lavagem: ', error);
        res.status(500).json({
            erro:'Erro ao salvar lavagem',
            detalhe: error.message
        });
    }
};

module.exports.exibirLavagens = async(req,res)=>{
    try {
        const registros = await lavagemModel
        .find()
        .sort({createdAt:-1});
        res.status(200).json(registros)
    } catch (error) {
        console.error('Erro ao buscar registros de lavagens', error);
        res.status(500).json({
            erro:'Erro ao listar registros de lavagens'
        });
    }
};

module.exports.deletarLavagem = async(req,res)=>{
    const {id} = req.params;
    try {
        const deletado = await lavagemModel.findByIdAndDelete(id);
        if(!deletado){
            return res.status(404).json({erro:'Registro não encontrado'})
        }
        res.status(200).json({menssagem:'Lavagem deletada com sucesso', deletado});
    } catch (error) {
        console.error('Erro ao deletar leitura: ', error);
        res.status(500).json({erro:'Erro ao deletar leitura'});
    }
};



