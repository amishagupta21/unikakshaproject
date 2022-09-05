import * as Yup from "yup"

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"]
// value?.type?.includes("image/")

const SchemaList = [
  // TEXT => SchemaList[0]
  Yup.string().nullable().required(),
  // EMAIL =? SchemaList[1]
  Yup.string().required().nullable().email("Wrong email format").min(3, "Minimum 3 symbols"),
  // PASSWORD => SchemaList[2]
  Yup.string()
    .required("Password is a required field")
    .nullable()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      // "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
      "Use 8 or more characters with a mix of letters, numbers & symbols."
    )
    .min(8),
  // CONFIRM PASSWORD => SchemaList[3]
  Yup.string()
    .nullable()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required()
    .min(8),
  // PHONE NUMBER ==> SchemaList[4]
  Yup.string()
    // .matches(
    //   /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
    //   "Contact No. is not valid"
    // )
    // .min(10, "Contact Number should be not less than 10 digits")
    // .max(10, "to long")
    .required()
    .nullable(),
  // IMAGE ==> SchemaList[5]
  Yup.mixed().nullable(),
  // .test("fileType", "Unsupported File Format", (value) => SUPPORTED_FORMATS.includes(value?.type))
  // .test(
  //   "fileSize",
  //   "File Size is too large, select file upto 5MB",
  //   (value) => value?.size <= 10500000
  // ),
  // DATE ==> SchemaList[6]
  Yup.date().required("Required").typeError("Please enter a valid date"),
  // .max(new Date(Date.now() - 567648000000), "You must be at least 18 years")
  // ARRAY ==> SchemaList[7]
  Yup.array().required().nullable().min(1),
]

export default SchemaList
