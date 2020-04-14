import diagnoses from '../data/diagnoses.json';
import { Diagnose } from '../interfaces/diagnose';

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

export default {
  getDiagnoses,
};
