const {Router} = require('express');
const { salvarpH, exibirpH, deletarpH } = require('../controllers/phController');

const router = Router();

router.post('/salvarpH', salvarpH);
router.get('/listarpH', exibirpH);
router.delete('/deletarpH/:id', deletarpH);

module.exports = router;