const {Router} = require('express');
const { salvarIqa, listarIqa, deletarIqa, atualizarIqa } = require('../controllers/iqaController');
const router = Router();

router.post('/salvarIqa', salvarIqa);
router.get('/listarIqa', listarIqa);
router.delete('/deletarIqa/:id', deletarIqa);
router.patch('/atualizarIqa/:id', atualizarIqa);

module.exports = router;