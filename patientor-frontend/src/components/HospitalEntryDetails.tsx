import React from 'react';
import { HospitalEntry } from '../types';
import { Container, Header, Icon} from 'semantic-ui-react';
import DiagnosesList from './DiagnosesList';

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {

  return (
    <Container>
      <Header as="h3">{entry.date} <Icon name="hospital" /></Header>
      {entry.description}
      <DiagnosesList codes={entry.diagnosisCodes} />
    </Container>
  );
};

export default HospitalEntryDetails;