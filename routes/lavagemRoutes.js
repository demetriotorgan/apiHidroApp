const {Router} = require('express');
const { salvarLavagem } = require('../controllers/lavagemController');

const router = Router();

router.post('/saveLavagem', salvarLavagem);

module.exports = router;