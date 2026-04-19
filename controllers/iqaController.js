const iqaModel = require('../models/iqaSchema');

module.exports.salvarIqa = async(req,res)=>{
    try { 
         const iqaDados = {...req.body};
         const novoIqa = await iqaModel.create(iqaDados);
        
        console.log(novoIqa);
        res.status(201).json(novoIqa)
    } catch (error) {
        console.error(error);
        res.status(500).json({erro:'Erro ao salvar leitura de IQA'});
    }
};

module.exports.listarIqa = async(req,res)=>{
    try {
        const leiturasIqa = await iqaModel
            .find()
            .sort({createdAt:-1});
        res.status(200).json(leiturasIqa);
    } catch (error) {
        console.error('Erro ao buscar registros de IQA', error);
        res.status(500).json({erro:'Erro ao listar leituras de IQA'});
    }
};

module.exports.deletarIqa = async(req,res)=>{
    const {id} = req.params;
    try {
        const deletado = await iqaModel.findByIdAndDelete(id);
        if(!deletado){
            return res.status(400).json({erro:'Registro não encontrado'});
        }
        res.status(200).json({mensagem:'IQA deletado com sucesso', deletado});        
    } catch (error) {
        console.error('Erro ao deletar leitura de IQA: ', error);
        res.status(500).json({erro:'Erro ao deletar leitura de IQA'});
    }
};

module.exports.atualizarIqa = async (req, res) => {
    const { id } = req.params;

    try {
        const dadosAtualizados = { ...req.body };

        const iqaAtualizado = await iqaModel.findByIdAndUpdate(
            id,
            dadosAtualizados,
            {
                new: true, // retorna o documento atualizado
                runValidators: true // garante validação do schema
            }
        );

        if (!iqaAtualizado) {
            return res.status(404).json({ erro: 'Registro não encontrado' });
        }

        res.status(200).json(iqaAtualizado);

    } catch (error) {
        console.error('Erro ao atualizar leitura de IQA: ', error);
        res.status(500).json({ erro: 'Erro ao atualizar leitura de IQA' });
    }
};