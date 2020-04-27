/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewPatientEntry, Gender } from './types/patient';

const isString = (str: any): str is string => {
  return typeof str === 'string' || str instanceof String;
};

const isDate = (date: any): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }

  return name;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }

  return occupation;
};

const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing SSN: ' + ssn);
  }

  return ssn;
};

const parseDateOfBirth = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
  }

  return dateOfBirth;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

const toNewPatientEntry = (obj: any): NewPatientEntry => {
  const newPatient: NewPatientEntry = {
    name: parseName(obj.name),
    dateOfBirth: parseDateOfBirth(obj.dateOfBirth),
    ssn: parseSSN(obj.ssn),
    gender: parseGender(obj.gender),
    occupation: parseOccupation(obj.occupation),
    entries: [],
  };
  return newPatient;
};

export default toNewPatientEntry;
