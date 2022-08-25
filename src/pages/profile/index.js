import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import { Form, Field, Formik } from 'formik'

const Profile = () => {
  return (
    <div>
      <h2>Profile Page</h2>
      <Formik
        initialValues={{
          firstName: 'Marques',
        }}
        validate={(values) => {
          let errors = {};
          if (!values.firstName) {
            errors.firstName = 'First name is required';
          }
          return errors;
        }}
        onSubmit={(values) => {
          console.log(values)
          if (values.firstName) {
            console.log('form submission complete!!');
          }
        }}
        render={({ handleChange, handleSubmit, handleBlur, values, errors, validateForm }) => (
          <Form>
            <Field
              name="firstName"
              render={({ field, formProps }) => (
                <FormGroup controlId="firstName">
                  <FormLabel>First Name</FormLabel>
                  <FormControl type={'text'} value={field.value} onChange={field.onChange} />
                </FormGroup>
              )}
            />
            <button onClick={validateForm}>Validate Form</button>
          </Form>
        )}
      />
    </div>
  )
}

export default Profile