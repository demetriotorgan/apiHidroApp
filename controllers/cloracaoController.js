const cloracaoModel = require('../models/cloracaoSchema');

module.exports.salvarCloracao = async(req,res)=>{
    try {
        const dados = {
            ...req.body,
            reservatorio: Number(req.body.reservatorio),
            concentracao: Number(req.body.concentracao),
            produto: Number(req.body.produto),
            estoque: Number(req.body.estoque)
        };

        const novaCloracao = await cloracaoModel.create(dados);
        res.status(201).json(novaCloracao);
    } catch (error) {
        console.error('Erro ao salvar cloração: ', error);
        res.status(500).json({
            erro:'Erro ao salvar nova cloração',
            detalhe: error.message
        });
    }
};

module.exports.exibirCloracao = async(req,res)=>{
    try {
        const registros = await cloracaoModel
        .find()
        .sort({createdAt:-1});
        res.status(200).json(registros);
    } catch (error) {
        console.error('Erro ao listar registros de cloração');
        res.status(500).json({
            erro:'Erro ao listar registros de cloração',
            detalhes: error.message
        });
    }
};

module.exports.deletarCloracao = async(req,res)=>{
    const {id} = req.params;
    try {
        const deletado = await cloracaoModel.findByIdAndDelete(id);
        if(!deletado){
            return res.status(404).json({erro:'Registro não encontrado'})
        }
        res.status(200).json({menssagem:'Cloração deletada com sucesso', deletado});
    } catch (error) {
        console.error('Erro ao deletar cloração: ', error);
        res.status(500).json({erro:'Erro ao deletar cloração'});
    }
};