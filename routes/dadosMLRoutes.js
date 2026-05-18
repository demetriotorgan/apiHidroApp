const {Router} = require('express');
const { salvarDadosML, listarDadosML, deletarRegistroML } = require('../controllers/dadosMLController');

const router = Router();

router.post('/salvarDadosML', salvarDadosML);
router.get('/listarDadosML', listarDadosML);
router.delete('/deletarRegistroML/:id', deletarRegistroML);

module.exports = router;