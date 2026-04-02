const ultimaLeituraModel = require('../models/ultimaLeituraSchema');

module.exports.salvarUltimaLeitura = async (req, res) => {
    try {
        const dadosUltimaLeitura = { ...req.body };
        const novaUltimaLeitura = await ultimaLeituraModel.create(dadosUltimaLeitura);
        res.status(201).json(novaUltimaLeitura);
    } catch (error) {
        console.error('Erro ao registrar ultima leitura: ', error)
        res.status(500).json({
            erro: 'Erro ao salvar leitura',
            detalhe: error.message,
            tipo: error.name
        });
    }
};

module.exports.exibirUltimasLeituras = async (req, res) => {
    try {
        const ultimasLeituras = await ultimaLeituraModel
            .find()
            .sort({ data: -1 });
        res.status(200).json(ultimasLeituras);
    } catch (error) {
        console.error('Erro ao buscar ultimas leituras: ', error);
        res.status(500).json({ erro: 'Erro ao listar ultimas leituras' });
    }
};

module.exports.deletarUltimaLeitura = async (req, res) => {
    const { id } = req.params;
    try {
        const deletado = await ultimaLeituraModel.findByIdAndDelete(id);
        if (!deletado) {
            return res.status(400).json({ erro: 'Registro não encontrado' });
        }
        res.status(200).json({ mensagem: 'Ultima Leitura excluida com sucesso', deletado });
    } catch (error) {
        console.error('Erro ao deletar leitura: ', error);
        res.status(500).json({ erro: 'Erro ao deletar leitura' });
    }
};