import React from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useStateValue, updateCurrentPatient } from '../state';
import { useParams } from 'react-router-dom';
import { Patient } from '../types';
import { Container, Header, Icon, Segment } from 'semantic-ui-react';

const PatientPage: React.FC = () => {
  const [{ currentPatient }, dispatch] = useStateValue();
  const id = useParams<{ id: string }>().id;

  React.useEffect(() => {
    const fetchPatient = async (id: string) => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updateCurrentPatient(patient));
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchPatient(id);
  }, [dispatch, id]);

  return (
    <Container>
      <Header as="h2">
        {currentPatient?.name}{' '}
        {currentPatient?.gender === 'other' ? (
          <Icon fitted name="genderless" />
        ) : currentPatient?.gender === 'male' ? (
          <Icon fitted name="mars" />
        ) : (
          <Icon fitted name="venus" />
        )}
      </Header>
      <Segment.Inline>ssn: {currentPatient?.ssn}</Segment.Inline>
      <Segment.Inline>occupation: {currentPatient?.occupation}</Segment.Inline>
      <Header as="h3">entries</Header>
      {currentPatient?.entries?.map((entry) => (
        <div key={entry.id}>
          {entry.date}
          &nbsp;
          <i key={entry.id}>{entry.description}</i>
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>{code}</li>
            ))}
          </ul>
        </div>
      ))}
    </Container>
  );
};

export default PatientPage;
