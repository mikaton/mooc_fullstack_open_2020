import patients from '../data/patients.json';
import { PatientNoSSN, Patient } from '../types/patient';
import { uuid } from 'uuidv4';

const getPatientsNoSSN = (): PatientNoSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string
): Patient => {
  const newPatient = {
    id: uuid(),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  };

  patients.push(newPatient);

  return newPatient;
};

export default {
  getPatientsNoSSN,
  addPatient,
};
