import React from 'react';
import { Entry } from '../types';
import { Segment, Header, Icon } from 'semantic-ui-react';

const HospitalEntry: React.FC<{
  entry: Entry;
  discharge: { date: string; criteria: string } | undefined;
}> = ({ entry, discharge }) => {
  return (
    <Segment>
      <Header as="h3">
        {entry.date} <Icon fitted name="hospital outline" />
      </Header>
      <i>{entry.description}</i>
      <p>
        Discharge critearia: {discharge?.criteria} date: {discharge?.date}
      </p>
    </Segment>
  );
};

export default HospitalEntry;
