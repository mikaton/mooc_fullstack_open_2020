import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();
const PORT = 3003;

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (
    !req.query.height ||
    !req.query.weight ||
    isNaN(Number(req.query.height)) ||
    isNaN(Number(req.query.weight))
  )
    return res.status(400).json({ error: 'Malformatted parameters' }).end();

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  const bmi = calculateBmi(height, weight);

  res.json({
    height,
    weight,
    bmi,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
