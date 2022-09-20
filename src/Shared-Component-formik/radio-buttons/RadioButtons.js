import React from 'react';
import { Field, ErrorMessage } from 'formik';

function RadioButtons(props) {
  const { label, name, option, error, ...rest } = props;
  return (
    <div>
      <label>{label}</label>
      <Field name={name}>
        {formik => {
          const { field } = formik;
          return option.map(option => {
            return (
              <div key={option.key}>
                <input
                  type='radio'
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <label htmlFor={option.value}>{option.key}</label>
              </div>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} />
    </div>
  );
}

export default RadioButtons;