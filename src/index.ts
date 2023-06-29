import express from 'express';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  return res.send('Hello World');
});

app.listen(8080, () => console.log('Servidor Iniciado'));
