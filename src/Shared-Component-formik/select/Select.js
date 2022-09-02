import { ErrorMessage, Field } from "formik";
// import {getLabel} from "../../language-provider/LanProvider"

function Select(props) {
  const { label, labelClassName, name, options, error, formik, ...rest } =
    props;
  return (
    <div>
      {label && (
        <label htmlFor={name} className={labelClassName}>
          {label}
        </label>
      )}
      <Field
        as="select"
        id={name}
        name={name}
        onBlur={() => formik?.setFieldTouched(name, true)}
        {...rest}
      >
        <option value="null" label="label">
          {/* {`${getLabel("select")}...`} */}
        </option>
        {options?.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </Field>
      <ErrorMessage
        name={name}
        component="span"
        className="invalid-input"
        style={{ color: "red" }}
      />
    </div>
  );
}

export default Select;
