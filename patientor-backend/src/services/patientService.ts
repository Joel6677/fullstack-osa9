import patientData from '../../data/patients';
import { Patient, NewPatient, PublicPatient, NewEntry, Entry } from '../types';
import { v4 as uuidv4 } from 'uuid';


let patients: Array<Patient> = patientData as Array<Patient>;

const getPublicPatients = (): Array<PublicPatient> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
      { id, name, dateOfBirth, gender, occupation }
    ));
  };

const getPatients = (): Array<Patient> => {
    return patients;
}

const findById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
      id: uuidv4(),
      ...patient
    };
  
    patients.push(newPatient);
    return newPatient;
  };

const addNewEntry = (patient: Patient, newEntry: NewEntry): Entry => {
  const entry = {
    id: uuidv4(),
    ...newEntry
  };
  patient.entries.push(entry);
  return entry;
};


export default { getPatients, getPublicPatients, addPatient, addNewEntry, findById };