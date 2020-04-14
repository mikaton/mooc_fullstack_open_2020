import express from 'express';
import cors from 'cors';
import diagnoseService from './services/diagnoseService';

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
  console.log('/ping was pinged');
  res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
  res.send(diagnoseService.getDiagnoses());
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
