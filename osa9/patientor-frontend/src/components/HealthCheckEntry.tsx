import React from 'react';
import { HealthCheckRating, Entry } from '../types';
import { Segment, Header, Icon } from 'semantic-ui-react';

const HealthCheckEntry: React.FC<{
  entry: Entry;
  healthCheckRating: HealthCheckRating;
}> = ({ entry, healthCheckRating }) => {
  const setHeartColor = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return 'green';
      case HealthCheckRating.LowRisk:
        return 'orange';
      case HealthCheckRating.HightRisk:
        return 'red';
      case HealthCheckRating.CriticalRisk:
        return 'black';
      default:
        break;
    }
  };
  return (
    <Segment>
      <Header as="h3">
        {entry.date}
        <Icon fitted name="stethoscope" />
      </Header>
      <p>
        <i>{entry.description}</i>
      </p>
      <Icon fitted name="heart" color={setHeartColor(healthCheckRating)} />
    </Segment>
  );
};

export default HealthCheckEntry;
