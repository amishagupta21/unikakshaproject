import {ErrorMessage, Field} from "formik"
import {useState} from "react"

function QrUserDetailsInput(props) {
  const {type, name, label, labelClassName, value, formik, ...rest} = props
  const [showPass, setShowPass] = useState(false)

  return (
    <>
      <div className="ontline-input">
        <Field
          autoComplete="off"
          type={showPass ? "text" : type}
          name={name}
          value={value}
          onBlur={() => formik?.setFieldTouched(name, true)}
          {...rest}
        />
        {label && (
          <label htmlFor={name} className={labelClassName}>
            {label}
          </label>
        )}
        {type === "password" && showPass ? (
          <span
            className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
            onClick={() => setShowPass(false)}
          >
            <i className="bi bi-eye fs-2"></i>
          </span>
        ) : type === "password" && !showPass ? (
          <span
            className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
            onClick={() => setShowPass(true)}
          >
            <i className="bi bi-eye-slash fs-2"></i>
          </span>
        ) : null}
      </div>
      <ErrorMessage
        name={name}
        component="span"
        className="invalid-input"
        style={{color: "red", display: "flex"}}
      />
      <br />
    </>
  )
}
export default QrUserDetailsInput
