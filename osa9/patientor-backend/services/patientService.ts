import patientData from '../data/patients';
import { PublicPatient, Patient, NewPatient, Entry } from '../types';
import { uuid } from 'uuidv4';
import toNewPatientEntry, { assertNever } from '../utils';

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

const addPatient = (obj: NewPatient): Patient => {
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

const addEntry = (obj: Entry): Entry => {
  const newBaseEntry = {
    id: uuid(),
    description: obj.description,
    date: obj.date,
    specialist: obj.specialist,
    diagnosisCodes: obj.diagnosisCodes,
  };

  switch (obj.type) {
    case 'HealthCheck':
      if (!obj.healthCheckRating)
        throw new Error(
          'Missing required property healthCheckRating for entry type HealthCheck'
        );
      return {
        ...newBaseEntry,
        type: obj.type,
        healthCheckRating: obj.healthCheckRating,
      };

    case 'Hospital':
      if (!obj.discharge)
        throw new Error(
          'Missing required property discharge for entry type Hospital'
        );
      return {
        ...newBaseEntry,
        type: obj.type,
        discharge: obj.discharge,
      };
    case 'OccupationalHealthcare':
      if (!obj.employerName)
        throw new Error(
          'Missing required property employerName for entry type OccupationalHealthCare'
        );
      return {
        ...newBaseEntry,
        type: obj.type,
        employerName: obj.employerName,
        sickLeave: obj.sickLeave,
      };
    default:
      break;
  }

  return assertNever(obj);
};

export default {
  getPatient,
  getPublicPatients,
  addPatient,
  addEntry,
};
