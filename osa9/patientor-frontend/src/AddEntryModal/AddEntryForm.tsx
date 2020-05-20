import React from 'react';
import { Entry, HealthCheckRating } from '../types';
import { Formik, Form, Field } from 'formik';
import { Grid, Button } from 'semantic-ui-react';
import {
  TextField,
  NumberField,
  DiagnosisSelection,
} from '../AddPatientModal/FormField';
import { useStateValue } from '../state';

interface Props {
  onSubmit: (values: Entry) => void;
  onCancel: () => void;
}

const initialValues: Entry = {
  id: '',
  type: 'HealthCheck',
  healthCheckRating: HealthCheckRating.Healthy,
  description: '',
  date: '',
  specialist: '',
  diagnosisCodes: undefined,
};

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }

        return errors;
      }}
    >
      {(props) => {
        return (
          <Form className="form ui">
            <Field
              label="Healthcheck Rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={props.setFieldValue}
              setFieldTouched={props.setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!props.dirty || !props.isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
