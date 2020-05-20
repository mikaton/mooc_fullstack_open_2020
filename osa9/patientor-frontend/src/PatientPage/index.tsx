import React from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { useStateValue, updateCurrentPatient, addEntry } from '../state';
import { useParams } from 'react-router-dom';
import { Patient, Entry } from '../types';
import { Container, Header, Icon, Segment, Button } from 'semantic-ui-react';
import HealthCheckEntry from '../components/HealthCheckEntry';
import OccupationalHealthcareEntry from '../components/OccupationalHealthcareEntry';
import { assertNever } from '../utils';
import HospitalEntry from '../components/HospitalEntry';
import AddEntryModal from '../AddEntryModal';

const PatientPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [{ currentPatient }, dispatch] = useStateValue();
  const [{ diagnoses }] = useStateValue();
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
  }, [dispatch, id, diagnoses]);

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => setModalOpen(false);

  const submitNewEntry = async (values: Entry) => {
    try {
      console.log('in submitnewentry, data: ', values);
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${currentPatient.id}/entries`,
        values
      );
      dispatch(addEntry(newEntry));
      closeModal();
    } catch (e) {
      console.log(e.response.data);
      setError(e.response.data.error);
    }
  };

  return (
    <div className="App">
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
        <Segment.Inline>
          occupation: {currentPatient?.occupation}
        </Segment.Inline>
        <Header as="h3">
          entries{' '}
          <Button color="red" onClick={() => openModal()}>
            Add entry
          </Button>
        </Header>

        {currentPatient?.entries?.map(
          (entry) => {
            switch (entry.type) {
              case 'HealthCheck':
                return (
                  <HealthCheckEntry
                    key={entry.id}
                    entry={entry}
                    healthCheckRating={entry.healthCheckRating}
                  />
                );
              case 'OccupationalHealthcare':
                return (
                  <OccupationalHealthcareEntry
                    key={entry.id}
                    entry={entry}
                    employerName={entry.employerName}
                    sickLeave={entry.sickLeave}
                  />
                );
              case 'Hospital':
                return (
                  <HospitalEntry
                    key={entry.id}
                    entry={entry}
                    discharge={entry.discharge}
                  />
                );
              default:
                assertNever(entry);
            }
          }
          /*<div key={entry.id}>
          {entry.date}
          &nbsp;
          <i key={entry.id}>{entry.description}</i>
          <ul>
            {entry.diagnosisCodes?.map((code) =>
              Object.values(diagnoses).map((diagnosis: Diagnosis) =>
                diagnosis.code === code ? (
                  <li key={diagnosis.code}>
                    {diagnosis.code} {diagnosis.name}
                  </li>
                ) : undefined
              )
            )}
          </ul>
        </div> */
        )}
      </Container>
      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
        error={error}
      />
    </div>
  );
};

export default PatientPage;
