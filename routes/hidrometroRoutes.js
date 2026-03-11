const {Router} = require('express');
const { exibirHidrometros, salvarHidrometro, deletarHidrometro } = require('../controllers/hidrometroController');

const router = Router();

router.post('/saveHidrometro', salvarHidrometro);
router.get('/listarHidrometro', exibirHidrometros);
router.delete('/deletarHidrometro/:id', deletarHidrometro);

module.exports = router;