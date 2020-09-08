import patientData from '../../data/patients.json';
import { Patient, NoSsnPatient } from '../types';

let patients: Array<Patient> = patientData as Array<Patient>;

const getNoSsnEntries = (): Array<NoSsnPatient> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => (
      { id, name, dateOfBirth, gender, occupation }
    ));
  };

const getEntries = (): Array<Patient> => {
    return patients;
}


export default { getEntries, getNoSsnEntries };