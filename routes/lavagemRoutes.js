const {Router} = require('express');
const { salvarLavagem, exibirLavagens } = require('../controllers/lavagemController');

const router = Router();

router.post('/saveLavagem', salvarLavagem);
router.get('/listarLavagens', exibirLavagens);

module.exports = router;