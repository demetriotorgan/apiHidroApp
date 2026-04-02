const {Router} = require('express');
const { salvarLavagem, exibirLavagens, deletarLavagem } = require('../controllers/lavagemController');

const router = Router();

router.post('/saveLavagem', salvarLavagem);
router.get('/listarLavagens', exibirLavagens);
router.delete('/deletarLavagem/:id', deletarLavagem);

module.exports = router;