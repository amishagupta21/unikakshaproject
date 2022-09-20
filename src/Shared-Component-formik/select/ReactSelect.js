import { Field } from 'formik';
import CustomSelect from './CustomSelect';

const ReactSelect = props => {
  const { label, labelClassName, name, options, isMulti, ...rest } = props;
  return (
    <div>
      {label && (
        <label htmlFor={name} className={labelClassName}>
          {label}
        </label>
      )}
      <Field {...rest} name={name} options={options} isMulti={isMulti} component={CustomSelect} />
    </div>
  );
};

export default ReactSelect;