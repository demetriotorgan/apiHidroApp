const {Router} = require('express');
const { salvarDadosML } = require('../controllers/dadosMLController');

const router = Router();

router.post('/salvarDadosML', salvarDadosML);

module.exports = router;