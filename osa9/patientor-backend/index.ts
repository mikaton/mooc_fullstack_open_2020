import express from 'express';
import cors from 'cors';
import diagnoseService from './services/diagnoseService';
import patientService from './services/patientService';
import toNewPatientEntry from './utils';

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
  res.send(patientService.getPublicPatients());
});

app.get('/api/patients/:id', (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});

app.post('/api/patients/:id/entries', (req, res) => {
  try {
    const patient = patientService.getPatient(req.params.id);
    if (!patient) return res.status(400).send('Patient not found').end();

    const newEntry = patientService.addEntry(req.body);
    patient.entries = patient.entries.concat(newEntry);

    res.json(newEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.post('/api/patients', (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatient);

    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
