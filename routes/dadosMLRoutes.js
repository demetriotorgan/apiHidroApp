const {Router} = require('express');
const { salvarDadosML, listarDadosML } = require('../controllers/dadosMLController');

const router = Router();

router.post('/salvarDadosML', salvarDadosML);
router.get('/listarDadosML', listarDadosML);

module.exports = router;