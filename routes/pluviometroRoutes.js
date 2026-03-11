const {Router} = require('express');
const { salvarPluviometro, exibirPluviometros, deletarPluviometro } = require('../controllers/pluviometroController');

const router = Router();

router.post('/savePluviometro', salvarPluviometro);
router.get('/listarPluviometros', exibirPluviometros);
router.delete('/deletarPluviometro/:id', deletarPluviometro)

module.exports = router;