const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');

const routesHidrometro = require('./routes/hidrometroRoutes');
const routesPluviometro = require('./routes/pluviometroRoutes');
const routesTambor = require('./routes/tamborRoutes');

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

// conecta no banco
connectDB();

app.use('/', routesHidrometro, routesPluviometro, routesTambor);

// rodar local
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = app;
