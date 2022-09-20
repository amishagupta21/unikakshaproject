import { Field, ErrorMessage } from 'formik';

function Checkboxes(props) {
  const { label, name, option, ...rest } = props;
  return (
    <div>
      <label>{label}</label>
      <Field name={name}>
        {formik => {
          const { field } = formik;
          return option.map(option => (
            <div key={option.label}>
              <input
                type='checkbox'
                id={option.value}
                {...field}
                {...rest}
                value={option.value}
              // checked={field.value.includes(option.value)}
              />
              <label style={{ marginLeft: '1rem' }}>{option.label}</label>
            </div>),
          );
        }}
      </Field>
      <ErrorMessage name={name} />
    </div>
  );
}

export default Checkboxes;
