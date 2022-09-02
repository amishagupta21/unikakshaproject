import {ErrorMessage, Field} from "formik"
import {useState} from "react"

function Input(props) {
  const {type, name, label, labelClassName, value, formik, ...rest} = props
  const [showPass, setShowPass] = useState(false)

  return (
    <>
      {label && (
        <label htmlFor={name} className={labelClassName}>
          {label}
        </label>
      )}
      <div style={{position: "relative"}}>
        <Field
          type={showPass ? "text" : type}
          name={name}
          value={value}
          onBlur={() => formik?.setFieldTouched(name, true)}
          {...rest}
        />
        {type === "password" && showPass ? (
          <span
            // style={{
            //   position: "absolute",
            //   top: "0.1rem",
            //   right: "1px",
            //   height: "95%",
            // }}
            // className="input-group-text"
            className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
            onClick={() => setShowPass(false)}
          >
            {/* <i className="bi bi-eye-fill"></i> */}
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
      <ErrorMessage name={name} component="span" className="invalid-input" style={{color: "red"}} />
    </>
  )
}
export default Input
