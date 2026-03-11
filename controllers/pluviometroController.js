const pluviometroModel = require('../models/pluviometroSchema');

module.exports.salvarPluviometro = async(req,res)=>{
    try {
        const {data, coluna, mm, obs} = req.body;
        const novoPluviometro = await pluviometroModel.create({data, coluna, mm, obs});
        console.log('Registro de pluviometro salvo com sucesso');
        console.log(novoPluviometro);
        res.status(201).json(novoPluviometro);
    } catch (error) {
        console.error('Erro ao salvar registro do pluviometro: ', error.message);
        res.status(500).json({erro:'Erro ao salvar registro de pluviometro'});
    }
};

module.exports.exibirPluviometros = async(req,res)=>{
    try {
        const leituras = await pluviometroModel.find().sort({data:-1});
        res.status(200).json(leituras);
    } catch (error) {
        console.error('Erro ao buscar registros do pluviometro', error);
        res.status(500).json({erro:'Erro ao listar pluviometros'})
    }
};

module.exports.deletarPluviometro = async(req,res)=>{
const {id} = req.params;
try {
    const deletado = await pluviometroModel.findByIdAndDelete(id);
    if(!deletado){
        return res.status(404).json({erro:'Registro não encontrado'})
    }
    res.status(200).json({mensagem:'Leitura deletado com sucesso', deletado});
} catch (error) {
    console.error('Erro ao deletar leitura do pluviometro: ', error);
    res.status(500).json({erro:'Erro ao deletar leitura do pluviometro'});
}
};
