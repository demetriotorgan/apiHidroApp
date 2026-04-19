const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');

const routesHidrometro = require('./routes/hidrometroRoutes');
const routesPluviometro = require('./routes/pluviometroRoutes');
const routesIqa = require('./routes/iqaRoutes');
const routesEstimativas = require('./routes/estimativaRoutes');
const routesAnaliseComparacao = require('./routes/analiseComparativaRoutes');
const routesLavagens = require('./routes/lavagemRoutes');
const routesUltimaLeitura = require('./routes/ultimaLeituraRoutes');
const routesCloracao = require('./routes/cloracaoRoutes');
const routespH = require('./routes/pHRoutes');

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

// conecta no banco
connectDB();
app.get('/', (req, res) => {
  res.json({ mensagem: 'HidroAPI funcionando' });
});

app.use('/', routesHidrometro, routesPluviometro, routesIqa, routesEstimativas, routesAnaliseComparacao, routesLavagens, routesUltimaLeitura,routesCloracao, routespH);

// rodar local
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = app;
