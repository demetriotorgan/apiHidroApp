const AnaliseComparativaModel = require('../models/analiseComparativaSchema');

module.exports.salvarAnaliseComparativa = async (req, res) => {
    try {
        const dados = req.body;

        //Validaçõa Básica
        if (
            !dados ||
            !dados.periodo ||
            !dados.consumoReal ||
            !dados.modelo ||
            !dados.comparacao
        ) {
            return res.status(400).json({
                erro: 'Dados incompletos para salvar análise'
            });
        }

        //Validação de campos essenciais
        const {
            periodo,
            consumoReal,
            modelo,
            comparacao
        } = dados;

        if (
            !periodo.dataInicial ||
            !periodo.dataFinal ||
            !periodo.quantidadeDias
        ) {
            return res.status(400).json({
                erro: 'Período inválido'
            });
        }

        if (
            consumoReal.litros == null ||
            consumoReal.leituraInicial == null ||
            consumoReal.leituraFinal == null
        ) {
            return res.status(400).json({
                erro: 'Dados de consumo real inválidos'
            });
        }

        if (
            modelo.consumoEstimado == null ||
            modelo.coeficiente == null
        ) {
            return res.status(400).json({
                erro: 'Dados do modelo inválidos'
            });
        }

        if (
            comparacao.erroPercentual == null ||
            comparacao.diferenca == null
        ) {
            return res.status(400).json({
                erro: 'Dados de comparação inválidos'
            });
        }

        // Tratamentos inteligentes (sanitização)
        dados.periodo.quantidadeDias = Number(periodo.quantidadeDias);

        dados.comparacao.erroPercentual = Number(
            comparacao.erroPercentual.toFixed(2)
        );

        dados.comparacao.acuracia = Number(
            comparacao.acuracia.toFixed(2)
        );

        //4. Criação do documento
        const novaAnalise = new AnaliseComparativaModel(dados);

        //Salvando no banco
        const resultado = await novaAnalise.save();

        //Resposta de sucesso
        res.status(201).json({
            mensagem: 'Análise comparativa salva com sucesso',
            id: resultado._id
        });
    } catch (error) {
        console.error('Erro ao registrar análise comparativa', error);
        res.status(500).json({
            erro: 'Erro ao salvar estimativa',
            detalhe: error.message
        });
    }
};

module.exports.listarAnalisesComparativas = async (req, res) => {
    try {
        const { dataInicial, dataFinal, limit } = req.query;

        const filtro = {};

        // 🔎 Filtro por eixo temporal real do dataset2: dataFinal
        if (dataInicial || dataFinal) {
            filtro["periodo.dataFinal"] = {};

            if (dataInicial) {
                filtro["periodo.dataFinal"].$gte = dataInicial;
            }

            if (dataFinal) {
                filtro["periodo.dataFinal"].$lte = dataFinal;
            }
        }

        let query = AnaliseComparativaModel
            .find(filtro)
            .sort({ dataCriacao: -1 });

        if (limit) {
            query = query.limit(Number(limit));
        }

        const analises = await query;

        if (!analises || analises.length === 0) {
            return res.status(404).json({
                mensagem: 'Nenhuma análise encontrada'
            });
        }

        res.status(200).json({
            total: analises.length,
            dados: analises
        });

    } catch (error) {
        console.error('Erro ao buscar análises comparativas', error);

        res.status(500).json({
            erro: 'Erro ao buscar análises',
            detalhe: error.message
        });
    }
};

module.exports.deletarAnaliseComparativa = async (req, res) => {
    const { id } = req.params;
    try {
        const deletado = await AnaliseComparativaModel.findByIdAndDelete(id);
        if (!deletado) {
            return res.status(404).json({ erro: 'Registro não encontrado' })
        }
        res.status(200).json({ menssagem: 'Analise Comparativa deletada com sucesso', deletado })
    } catch (error) {
        console.error('Erro ao deletar Analise Comparativa: ', error);
        res.status(500).json({ erro: 'Erro ao deletar Analise Comparativa' });
    }
}

