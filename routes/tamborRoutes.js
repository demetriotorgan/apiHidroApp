const {Router} = require('express');
const { salvarTambor, exibirTambores, deletarTambor } = require('../controllers/tamborController');
const router = Router();

router.post('/saveTambor', salvarTambor);
router.get('/listarTambores', exibirTambores);
router.delete('/deletarTambor/:id', deletarTambor);

module.exports = router;