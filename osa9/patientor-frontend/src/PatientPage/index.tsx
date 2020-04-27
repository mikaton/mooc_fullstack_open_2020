import React from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { useParams } from 'react-router-dom';
import { Patient } from '../types';
import { Container, Header, Icon, Segment } from 'semantic-ui-react';

const PatientPage: React.FC = () => {
  const [{ currentPatient }, dispatch] = useStateValue();
  const id = useParams<{ id: string }>().id;

  React.useEffect(() => {
    const fetchPatient = async (id: string) => {
      try {
        const patient = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch({ type: 'UPDATE_CURRENT_PATIENT', payload: patient.data });
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
      <Segment>
        <Segment.Inline>ssn: {currentPatient?.ssn}</Segment.Inline>
        <Segment.Inline>
          occupation: {currentPatient?.occupation}
        </Segment.Inline>
      </Segment>
    </Container>
  );
};

export default PatientPage;
