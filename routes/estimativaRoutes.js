const {Router} = require('express');
const { salvarEstimativa, listarEstimativas, deletarEstimativa } = require('../controllers/estimativaController');

const router = Router();

router.post('/saveEstimativa', salvarEstimativa);
router.get('/listarEstimativas', listarEstimativas);
router.delete('/deletarEstimativa/:id', deletarEstimativa);

module.exports = router;