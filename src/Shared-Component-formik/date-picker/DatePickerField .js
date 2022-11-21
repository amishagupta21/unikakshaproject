import React from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-date-picker';

function DatePickerField({ ...props }) {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      openTo="year"
      views={['year', 'month', 'day']}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    />
  );
}
export default DatePickerField;
