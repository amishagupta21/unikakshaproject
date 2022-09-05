import React from "react"
import Input from "./input/Input"
import Select from "./select/Select"
import CheckBoxes from "./checkboxes/Checkboxes"
import RadioButtons from "./radio-buttons/RadioButtons"
import ReactSelect from "./select/ReactSelect"
// import DateTimePicker from "./date-time-picker/DateTimePicker"
import FormikImage from "./image/FormikImage"

function FormikController(props) {
  const {control, ...rest} = props
  switch (control) {
    case "input":
      return <Input {...rest} />
    case "select":
      return <Select {...rest} />
    case "react_select":
      return <ReactSelect {...rest} />
    case "radio":
      return <RadioButtons {...rest} />
    case "checkbox":
      return <CheckBoxes {...rest} />
    // case "datetime":
    //   return <DateTimePicker {...rest} />
    case "image":
      return <FormikImage {...rest} />
    default:
      return null
  }
}
export default FormikController
