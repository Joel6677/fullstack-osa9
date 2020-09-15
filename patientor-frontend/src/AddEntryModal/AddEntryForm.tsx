import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";
import { TextField, SelectField, TypeOption, DiagnosisSelection, NumberField } from "./FormField";
import { EntryFormValues } from "../types";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
    { value: "OccupationalHealthcare", label: "Occupational healthcare"},
    { value: "Hospital", label: "Hospital visit" },
    { value: "HealthCheck", label: "Health check"}
  ];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{diagnoses}] = useStateValue();
  
  return (
    <Formik
    initialValues={{
      type: "HealthCheck",
      description: "",
      date: "",
      specialist: "",
      diagnosisCodes: [],
      discharge: {
        date: "",
        criteria: ""
      },
      sickLeave: {
        startDate: "",
        endDate: ""
      },
      employerName: "",
      healthCheckRating: 0
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.name = requiredError;
        }
        if (!values.description) {
          errors.ssn = requiredError;
        }
        if (!values.date) {
          errors.dateOfBirth = requiredError;
        }
        if (!values.specialist) {
          errors.occupation = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values  }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Type"
              name="type"
              options={typeOptions}
            />
            <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
              />
            {values.type === "HealthCheck" && (
              <Field
                label="healthCheckRating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
            )}

            {values.type === "Hospital" && (
              <>
                <Field
                  label="Discharge date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Criteria"
                  placeholder="Criteria"
                  name="discharge.criteria"
                  component={TextField}
                />

              </>
            )
            }
            {values.type === "OccupationalHealthcare" && (
                <>
                  <Field
                    label="Employer"
                    placeholder="Name"
                    name="employerName"
                    component={TextField}
                  />
                  <h3>Sick Leave</h3>
                  <Field
                    label="Start Date"
                    placeholder="YYYY-MM-DD"
                    name="sickLeave.startDate"
                    component={TextField}
                  />
                  <Field
                    label="End Date"
                    placeholder="YYYY-MM-DD"
                    name="sickLeave.endDate"
                    component={TextField}
                  />

                </>
              )
            }
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
                  disabled={!dirty || !isValid}
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