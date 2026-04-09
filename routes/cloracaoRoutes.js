const {Router} = require('express');
const { salvarCloracao, exibirCloracao, deletarCloracao } = require('../controllers/cloracaoController');

const router = Router();

router.post('/saveCloracao', salvarCloracao);
router.get('/listarCloracao', exibirCloracao);
router.delete('/deletarCloracao/:id', deletarCloracao);

module.exports = router;