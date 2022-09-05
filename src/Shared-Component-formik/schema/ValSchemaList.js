import * as Yup from "yup"
import {getLabel} from "../../language-provider/LanProvider"

export const ValSchemaList = (i, name, passRef, arrMin, proxyName) => {
  const SchemaList = [
    // TEXT => SchemaList[0]
    Yup.string()
      .nullable()
      .required(`${proxyName || getLabel(name)} ${getLabel("is_req")}`),
    // EMAIL =? SchemaList[1]
    Yup.string()
      .nullable()
      .required(`${proxyName || getLabel(name)} ${getLabel("is_req")}`)
      .email(`${getLabel("valid_mail")}`),
    // PASSWORD => SchemaList[2]
    Yup.string()
      .required(`${proxyName || getLabel(name)} ${getLabel("is_req")}`)
      .nullable()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        `${getLabel("pass_val")}`
      )
      .min(8),
    // CONFIRM PASSWORD => SchemaList[3]
    Yup.string()
      .nullable()
      .required(`${proxyName || getLabel(name)} ${getLabel("is_req")}`)
      .oneOf(
        [Yup.ref(passRef || "password"), null],
        `${getLabel("password")} ${getLabel("must_match")}`
      ),
    // PHONE NUMBER ==> SchemaList[4]
    Yup.string()
      // .matches(
      //   /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      //   "Contact No. is not valid"
      // )
      // .min(10, "Contact Number should be not less than 10 digits")
      // .max(10, "to long")
      .required(`${proxyName || getLabel(name)} ${getLabel("is_req")}`)
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
    Yup.date().required(`${proxyName || getLabel(name)} ${getLabel("is_req")}`),
    // .max(new Date(Date.now() - 567648000000), "You must be at least 18 years")
    // ARRAY ==> SchemaList[7]
    Yup.array()
      .nullable()
      .required(`${getLabel("select_atleast")} ${arrMin || 1} ${proxyName || getLabel(name)}`)
      .min(
        arrMin || 1,
        `${getLabel("select_atleast")} ${arrMin || 1} ${proxyName || getLabel(name)}`
      ),
  ]

  return SchemaList[i]
}
