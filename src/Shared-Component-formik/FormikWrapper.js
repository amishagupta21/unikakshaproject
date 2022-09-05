import {Formik, Form} from "formik"
import * as Yup from "yup"
import {getLabel} from "../language-provider/LanProvider"
import FormikController from "./FormikController"
import SchemaList from "./schema/SchemaList"

function FormikWrapper() {
  const choices = [
    {key: "choice a", value: "choicea"},
    {key: "choice b", value: "choiceb"},
  ]
  const initialValues = {
    email: "",
    selectChoice: "",
    radioChoice: "",
    checkBoxChoice: "",
  }
  let validationSchema = Yup.object({
    f_name: SchemaList[0].min(2),
    l_name: SchemaList[0],
    email: SchemaList[1],
    password: SchemaList[2].required(`${getLabel("password")} ${getLabel("is_req")}`),
    confirmPassword: SchemaList[3],
    selectChoice: SchemaList[0],
    radioChoice: SchemaList[0],
    checkBoxChoice: SchemaList[0],
  })
  // const validationSchema = Yup.object({
  //   text: Yup.string().required(),
  //   email: Yup.string().email().required(),
  //   password: Yup.string()
  //     .required()
  //     .matches(
  //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  //       "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  //     ),
  //   confirmPassword: Yup.string()
  //     .oneOf([Yup.ref("password"), null], "Passwords must match")
  //     .required(),
  //   selectChoice: Yup.string().required(),
  //   radioChoice: Yup.string().required(),
  //   checkBoxChoice: Yup.array().required(),
  // });
  const onSubmit = (values) => console.log("Form data", values)
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {(formik) => {
        return (
          <Form onSubmit={formik.handleSubmit}>
            <FormikController
              control="input"
              type="text"
              label="First Name"
              name="f_name"
              style={{color: "red"}}
              className="hello"
              formik={formik}
              value={formik.values.f_name}
              onChange={formik.handleChange}
              error={formik.errors.f_name}
            />
            <br />
            <FormikController
              control="input"
              type="text"
              label="Last Name"
              name="l_name"
              formik={formik}
              value={formik.values.l_name}
              onChange={formik.handleChange}
              error={formik.errors.l_name}
            />
            <br />
            <FormikController
              control="input"
              type="email"
              label={getLabel("email")}
              placeholder={`${getLabel("enter")} ${getLabel("email")}`}
              name="email"
              formik={formik}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.errors.email}
            />
            <br />
            <FormikController
              control="input"
              type="password"
              label={getLabel("password")}
              placeholder={`${getLabel("enter")} ${getLabel("password")}`}
              name="password"
              formik={formik}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.errors.password}
            />
            <br />
            <FormikController
              control="input"
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              formik={formik}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.errors.confirmPassword}
            />
            <br />
            <FormikController
              control="select"
              label="Select your choice"
              name="selectChoice"
              option={choices}
              value={formik.values.selectChoice}
              onChange={formik.handleChange}
              error={formik.errors.selectChoice}
            />
            <br />
            <FormikController
              control="react_select"
              label="Select Countries"
              labelClassName="required fw-bold fs-6 mb-2"
              name="Countries"
              className="form-control-solid mb-lg-0"
              options={choices}
              isMulti={true}
              value={formik.values.Countries}
              onChange={formik.handleChange}
              error={formik.errors.Countries}
            />
            <br />
            <FormikController
              control="radio"
              label="Click your choice"
              name="radioChoice"
              option={choices}
              value={formik.values.radioChoice}
              onChange={formik.handleChange}
              error={formik.errors.radioChoice}
            />
            <br />
            <FormikController
              control="checkbox"
              label="select your choices"
              name="checkBoxChoice"
              option={choices}
              value={formik.values.checkBoxChoice}
              onChange={formik.handleChange}
              error={formik.errors.checkBoxChoice}
            />
            <br />
            <FormikController
              control="datetime"
              label="Start Time"
              labelClassName="required fw-bold fs-6 mb-2"
              className="form-control form-control-solid mb-lg-0"
              name="qr_start_time"
              timeFormat="HH:mm"
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="Time"
              formik={formik}
              value={formik.values.qr_start_time}
              onChange={formik.handleChange}
              error={formik.errors.qr_start_time}
              touched={formik.touched.qr_start_time}
            />
            <br />

            <button type="submit">Submit</button>
          </Form>
        )
      }}
    </Formik>
  )
}
export default FormikWrapper
