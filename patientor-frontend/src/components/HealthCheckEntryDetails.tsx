import React from 'react';
import { HealthCheckRating, HealthCheckEntry } from '../types';
import { Header, Icon, Container } from 'semantic-ui-react';
import DiagnosesList from './DiagnosesList';

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {

  const getHeartColor = (rating: HealthCheckRating): string => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return "green";
      case HealthCheckRating.LowRisk:
        return "yellow";
      case HealthCheckRating.HighRisk:
        return "orange";
      case HealthCheckRating.CriticalRisk:
        return "red";
    }
  };

  return (
  <Container>
    <Header as="h3">{entry.date} <Icon name="user doctor" /></Header>
    {entry.description}
    <Icon className={getHeartColor(entry.healthCheckRating)} name="heart" />
    <DiagnosesList codes={entry.diagnosisCodes} />
  </Container>
  );
};

export default HealthCheckEntryDetails;