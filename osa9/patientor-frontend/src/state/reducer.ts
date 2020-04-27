import { State } from './state';
import { Patient } from '../types';

interface SetPatientListAction {
  type: 'SET_PATIENT_LIST';
  payload: Patient[];
}

interface AddPatientAction {
  type: 'ADD_PATIENT';
  payload: Patient;
}

interface UpdateCurrentPatientAction {
  type: 'UPDATE_CURRENT_PATIENT';
  payload: Patient;
}

export type Action =
  | SetPatientListAction
  | AddPatientAction
  | UpdateCurrentPatientAction;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'UPDATE_CURRENT_PATIENT':
      return {
        ...state,
        currentPatient: action.payload,
      };
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patients,
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient,
  };
};

export const updateCurrentPatient = (patient: Patient): Action => {
  return {
    type: 'UPDATE_CURRENT_PATIENT',
    payload: patient,
  };
};
