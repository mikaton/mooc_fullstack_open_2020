import patientData from '../data/patients.json';
import { PublicPatient, Patient, NewPatientEntry } from '../types/patient';
import { uuid } from 'uuidv4';
import toNewPatientEntry from '../utils';

const patients: Patient[] = patientData.map((obj) => {
  const object = toNewPatientEntry(obj) as Patient;
  object.id = obj.id;
  return object;
});

const getPatient = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (obj: NewPatientEntry): Patient => {
  const newPatient = {
    id: uuid(),
    name: obj.name,
    dateOfBirth: obj.dateOfBirth,
    ssn: obj.ssn,
    gender: obj.gender,
    occupation: obj.occupation,
    entries: [],
  };

  patients.push(newPatient);

  return newPatient;
};

export default {
  getPatient,
  getPublicPatients,
  addPatient,
};
