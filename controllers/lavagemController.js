const lavagemModel = require('../models/lavagemSchema');

module.exports.salvarLavagem = async(req,res)=>{
    try {
        const dados = {
            ...req.body,
            pesoRoupas: Number(req.body.pesoRoupas),
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