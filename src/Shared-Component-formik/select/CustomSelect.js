import {ErrorMessage} from "formik"
import Select from "react-select"
import "./reactSelect.css"

export const CustomSelect = ({field, form, options, className, isMulti, formik, ...rest}) => {
  const style = {
    control: (base) => ({
      ...base,
      border: "none",
      boxShadow: "none",
      backgroundColor: "#f5f8fa",
    }),
  }

  const onChange = (option) => {
    form.setFieldValue(field.name, isMulti ? option.map((item) => item.value) : option.value)
  }

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter((option) => field?.value?.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value)
    } else {
      return isMulti ? [] : ""
    }
  }

  return (
    <>
      <Select
        {...rest}
        name={field.name}
        value={getValue()}
        onChange={onChange}
        onBlur={() => formik?.setFieldTouched(field.name, true)}
        options={options}
        isMulti={isMulti}
        styles={style}
        className={`react-form-control ${className}`}
      />
      <ErrorMessage
        name={field.name}
        component="span"
        className="invalid-input"
        style={{color: "red"}}
      />
    </>
  )
}

export default CustomSelect
