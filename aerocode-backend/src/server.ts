import express from 'express';
import cors from 'cors';


import aeronaveRoutes from './routes/aeronave.routes';
import pecaRoutes from './routes/peca.routes';
import funcionarioRoutes from './routes/funcionario.routes';
import etapaRoutes from './routes/etapa.routes';
import testeRoutes from './routes/teste.routes';

const app = express();

app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[METRICA] ${req.method} ${req.originalUrl} - Processamento: ${duration}ms`);
  });
  next();
});

app.get('/', (req, res) => {
  res.send('Servidor Aerocode está rodando! ✈️');
});


app.use('/aeronaves', aeronaveRoutes);
app.use('/pecas', pecaRoutes);
app.use('/funcionarios', funcionarioRoutes);
app.use('/etapas', etapaRoutes);
app.use('/testes', testeRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});