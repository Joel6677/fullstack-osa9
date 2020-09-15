import React from 'react';
import { OccupationalHealthcareEntry } from '../types';
import { Header, Icon, Container } from 'semantic-ui-react';

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {

  return (
    <Container>
      <Header as="h3">{entry.date} <Icon name="stethoscope" /> {entry.employerName}</Header>
      {entry.description}
    </Container>
  );
};

export default OccupationalHealthcareEntryDetails;