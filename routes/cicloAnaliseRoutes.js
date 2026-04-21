const {Router} = require('express');
const { salvarCicloAnalise, listarCiclosAnalise, ultimoCicloAnalise, ciclosPorPeriodo } = require('../controllers/cicloAnaliseController');
const router = Router();

router.post('/ciclos-analise', salvarCicloAnalise);
router.get('/ciclos-analise', listarCiclosAnalise);
router.get('/ciclos-analise/ultimo', ultimoCicloAnalise);
router.get('/ciclos-analise/periodo', ciclosPorPeriodo);

module.exports = router;