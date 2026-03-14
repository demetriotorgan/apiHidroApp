const tamborModel = require('../models/tamborSchema');

module.exports.salvarTambor = async(req,res)=>{
    try { 
         const dadosTambor = {...req.body};
         const novoTambor = await tamborModel.create(dadosTambor);
        
        console.log(novoTambor);
        res.status(201).json(novoTambor)
    } catch (error) {
        console.error('Erro ao registrar leitura: ', error.message)
        res.status(500).json({erro:'Erro ao salvar leitura'});
    }
};

module.exports.exibirTambores = async(req,res)=>{
    try {
        const leiturasTambor = await tamborModel
            .find()
            .sort({data:-1});
        res.status(200).json(leiturasTambor);
    } catch (error) {
        console.error('Erro ao buscar registros', error);
        res.status(500).json({erro:'Erro ao listar leituras do tambor'});
    }
};

module.exports.deletarTambor = async(req,res)=>{
    const {id} = req.params;
    try {
        const deletado = await tamborModel.findByIdAndDelete(id);
        if(!deletado){
            return res.status(400).json({erro:'Registro não encontrado'});
        }
        res.status(200).json({mensagem:'Leitura deletado com sucesso', deletado});        
    } catch (error) {
        console.error('Erro ao deletar leitura: ', error);
        res.status(500).json({erro:'Erro ao deletar leitura do tambor'});
    }
}