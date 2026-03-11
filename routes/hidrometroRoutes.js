const {Router} = require('express');
const { salvarLeitura, exibirLeituras, deletarLeitura } = require('../controllers/hidrometroController');

const router = Router();

router.post('/save', salvarLeitura);
router.get('/listar', exibirLeituras);
router.delete('/deletar/:id', deletarLeitura);

module.exports = router;