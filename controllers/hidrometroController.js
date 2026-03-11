const hidrometroModel = require('../models/hidrometroSchema')

module.exports.salvarLeitura = async(req,res)=>{
    try {
        const {data, horario, leitura, obs} = req.body
        const novaLeitura = await hidrometroModel.create({data, horario, leitura, obs});
        console.log('Leitura salva com sucesso');
        console.log(novaLeitura);
        res.status(201).json(novaLeitura);
    } catch (error) {
        console.error('Erro ao registrar leitura: ', error.message);
        res.status(500).json({erro: 'Erro ao salvar leitura'});
    }
};

module.exports.exibirLeituras = async(req,res)=>{
    try {
        const leituras = await hidrometroModel.find().sort({data:-1}); //Ordem para os mais recentes
        res.status(200).json(leituras);
    } catch (error) {
        console.error('Erro ao buscar registros', error);
        res.status(500).json({erro:'Erro ao listar leituras'})
    }
};

module.exports.deletarLeitura = async(req,res)=>{
    const {id} = req.params;
    try {
        const deletado = await hidrometroModel.findByIdAndDelete(id);
        if(!deletado){
            return res.status(404).json({erro:'Registro não encontrado'})
        }
        res.status(200).json({messagem: 'Leitura deletada com sucesso', deletado});
    } catch (error) {
        console.error('Erro ao deletar leitura: ', error);
        res.status(500).json({erro:'Erro ao deletar leitura'});
    }
};

