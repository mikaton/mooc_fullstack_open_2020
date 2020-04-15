import express from 'express';
import cors from 'cors';
import diagnoseService from './services/diagnoseService';
import patientService from './services/patientService';

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

app.get('/api/patients', (_req, res) => {
  res.send(patientService.getPatientsNoSSN());
});

app.post('/api/patients', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatient = patientService.addPatient(
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  );

  res.json(newPatient);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
