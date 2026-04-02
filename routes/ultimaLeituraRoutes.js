const {Router} = require('express');
const { salvarUltimaLeitura, exibirUltimasLeituras, deletarUltimaLeitura } = require('../controllers/ultimaLeituraController');

const router = Router();

router.post('/saveUltimaLeitura', salvarUltimaLeitura);
router.get('/listarUltimaLeitura', exibirUltimasLeituras);
router.delete('/deletarUltimaLeitura/:id', deletarUltimaLeitura);

module.exports = router;