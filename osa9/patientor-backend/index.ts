import express from 'express';

const PORT = 3003;
const app = express();

app.use(express.json());

app.get('/ping', (_req, res) => {
  console.log('/ping was pinged');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
