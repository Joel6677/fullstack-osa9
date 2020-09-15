import React from 'react';
import { useStateValue } from '../state';
import { Container, Header, Icon } from 'semantic-ui-react';

const DiagnosesList: React.FC<({ codes: string[] | undefined })> = ({ codes }) => {
  const [{ diagnoses }] = useStateValue();

  if (!codes) {
    return null;
  }

  return (
    <Container>
      <Header as="h4">Diagnoses <Icon name="clipboard" /></Header>
      {Object.values(codes).map((code: string) => (
        <div key={code}>
          <b>{code} </b>
          {diagnoses[code] ? diagnoses[code].name : null}
        </div>
      ))}
   </Container>
  );
};

export default DiagnosesList;