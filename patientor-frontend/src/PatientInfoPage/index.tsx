import React from "react";
import axios from "axios";
import { Header, Container, Button, Icon} from "semantic-ui-react";
import { useParams } from 'react-router-dom';

import { Patient, Entry, Gender, EntryFormValues } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient, addEntry } from "../state";

import EntryDetails from "../components/EntryDetails";
import AddEntryModal from "../AddEntryModal";

const PatientInfo: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const { id } = useParams<{ id: string }>();
  const patient = patients[id];

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      const patientWithEntry = {
        ...patient,
        entries: [...patient.entries, newEntry]
      };
      dispatch(addEntry(patientWithEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

    React.useEffect(() => {
        const getInfo = async () => {
            try {
                const { data: patientInfoFromApi } = await axios.get<Patient>
                    (`${apiBaseUrl}/patients/${id}`);
                dispatch(updatePatient(patientInfoFromApi));
            } catch (e) {
                console.error(e);
            }
        };
        getInfo();
    }, [dispatch, id]);

    const icon = (gender: Gender) => {
        switch (gender) {
            case Gender.Male:
                return "mars";
            case Gender.Female:
                return "venus";
            default:
                return "genderless";
        }
    };

  if (!patient) {
    return null;
  }

  return (   
    <Container>
      <Header as="h1">{patient.name} <Icon name={icon(patient.gender)}/></Header>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <Header as="h3">entries</Header>
      { patient.entries && patient?.entries.map(entry => (
          <EntryDetails key={entry.id} entry={entry} />
          ))}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </Container>
  );
};

export default PatientInfo;