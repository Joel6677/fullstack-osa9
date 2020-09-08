import patientData from '../../data/patients.json';
import { Patient, NewPatient, NoSsnPatient } from '../types';
import { v4 as uuidv4 } from 'uuid';


let patients: Array<Patient> = patientData as Array<Patient>;

const getNoSsnPatients = (): Array<NoSsnPatient> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
      { id, name, dateOfBirth, gender, occupation }
    ));
  };

const getPatients = (): Array<Patient> => {
    return patients;
}

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
      id: uuidv4(),
      ...patient
    };
  
    patients.push(newPatient);
    return newPatient;
  };


export default { getPatients, getNoSsnPatients, addPatient };