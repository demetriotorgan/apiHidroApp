const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const routesHidrometro = require('./routes/hidrometroRoutes');
const routesPluviometro = require('./routes/pluviometroRoutes');
const routesTambor = require('./routes/tamborRoutes');

const app = express();

app.use(express.json());

app.use(cors({
    origin: '*'
}));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE');
    next();
});

mongoose
.connect(process.env.DATABASE_URL)
.then(()=>console.log('Conectado ao MongoDB com sucesso!'))
.catch((err)=>console.log(err));

app.use('/', routesHidrometro, routesPluviometro, routesTambor);

// roda localmente
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = app;
