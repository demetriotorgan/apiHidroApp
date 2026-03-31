const {Router} = require('express');
const { salvarAnaliseComparativa, listarAnalisesComparativas, deletarAnaliseComparativa } = require('../controllers/analiseComparativaController');

const router = Router();

router.post('/saveAnaliseComparativa', salvarAnaliseComparativa);
router.get('/listarAnalisesComparativas', listarAnalisesComparativas);
router.delete('/deletarAnaliseComparativa/:id', deletarAnaliseComparativa);

module.exports = router;