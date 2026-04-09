const phModel = require('../models/phModel');

module.exports.salvarpH = async(req,res)=>{
    try {
        const dados = {
            ...req.body,
            reservatorio: Number(req.body.reservatorio),
            phAtual: Number(req.body.phAtual),
            phObjetivo: Number(req.body.phObjetivo),
            acido: Number(req.body.acido)
        };

        const novopH = await phModel.create(dados);
        res.status(201).json(novopH);
    } catch (error) {
        console.error('Erro ao salvar pH: ', error);
        res.status(500).json({
            erro:'Erro ao salvar novo pH',
            detalhe: error.message
        });
    }
};

module.exports.exibirpH = async(req,res)=>{
    try {
        const registros = await phModel
        .find()
        .sort({createdAt:-1});
        res.status(200).json(registros);
    } catch (error) {
        console.error('Erro ao listar regitros de pH');
        res.status(500).json({
            erro:'Erro ao listar registros de pH',
            detalhes: error.message
        });
    }
};

module.exports.deletarpH = async(req,res)=>{
    const {id} = req.params;
    try {
        const deletado = await phModel.findByIdAndDelete(id);
        if(!deletado){
            return res.status(404).json({erro:'Registro não encontrado'})
        }
        res.status(200).json({message:'pH deletado com sucesso', deletado});
    } catch (error) {
        console.error('Erro ao deletar ph: ', error);
        res.status(500).json({erro: 'Erro ao deletar pH'});
    }
};