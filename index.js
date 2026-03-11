const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes/hidrometroRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin:'*',    
}));
app.use((req,res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    next();    
  });

  mongoose
    .connect(process.env.DATABASE_URL)
    .then(()=>console.log('Conectado ao MongoDB com sucesso!'))
    .catch((err)=>console.log(err));

app.use('/', routes);
app.listen(PORT, ()=>console.log(`Rodando na porta ${PORT}`));