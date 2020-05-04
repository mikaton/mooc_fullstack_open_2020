import React from 'react';
import { Entry } from '../types';
import { Segment, Icon, Header } from 'semantic-ui-react';

const OccupationalHealthcareEntry: React.FC<{
  entry: Entry;
  employerName: string;
  sickLeave: { startDate: string; endDate: string } | undefined;
}> = ({ entry, employerName, sickLeave }) => {
  return (
    <Segment>
      <Header as="h3">
        {entry.date}
        <Icon fitted name="user md" /> {employerName}
      </Header>
      <p>
        <i>{entry.description}</i>
        {sickLeave ? (
          <i>
            Sick leave from {sickLeave.startDate} to {sickLeave.endDate}
          </i>
        ) : undefined}
      </p>
    </Segment>
  );
};

export default OccupationalHealthcareEntry;
