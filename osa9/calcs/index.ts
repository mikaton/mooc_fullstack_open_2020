import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
const PORT = 3003;

app.use(express.json());

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

app.post('/exercises', (req, res) => {
  if (!req.body.daily_exercises || !req.body.target)
    return res.status(400).json({ error: 'parameters missing' }).end();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const exercises: number[] = req.body.daily_exercises
    .map((ex: any) => Number(ex))
    .forEach((ex: any) => {
      if (isNaN(ex))
        return res.status(400).json({ error: 'malformatted parameters' }).end();
    });

  const result = calculateExercises(exercises, req.body.target);

  res.status(200).json(result);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
