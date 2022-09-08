import { ErrorMessage } from "formik"
// import {toAbsoluteUrl, toProfileImgUrl} from "../../helpers"
import { toast } from "react-toastify"
import selectImg from "../.././assets/images/selectImg.png"

const FormikImage = ({
  label,
  labelClassName,
  name,
  img,
  setImg,
  editFlag,
  editPath,
  formik,
  imgIconClassName,
  imgIcon,
  ...rest
}) => {
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      if (!event.target.files[0].type.includes("image/") && event.target.files[0].size > 5100000) {
        toast.error("Only image is accepted which is leass than 5MB")
      } else if (!event.target.files[0].name.match(/\.(jpg|jpeg|png|bmp)$/)) {
        toast.error("Only images are accepted")
      } else if (event.target.files[0].size > 10485760) {
        toast.error("Images less than 10MB are accepted")
      } else if (
        event.target.files[0].type.includes("image/") &&
        event.target.files[0].size <= 5100000
      ) {
        setImg(URL.createObjectURL(event.target.files[0]))
        formik.setFieldTouched(name, false)
        return true
      }
    }
  }
  return (
    <>
      <label htmlFor={name} name={name}>
        <label className={labelClassName}>{label}</label>
        <br />
        <span className="form-control form-control-solid mb-lg-0">
          <input
            hidden
            id={name}
            type="file"
            accept="image/*"
            className="form-control form-control-solid mb-lg-0"
            onClick={() => formik.setFieldTouched(name, true)}
            // onChange={(e) => {
            //   formik.setFieldValue("Profile_Picture", e.target.files[0])
            //   var binaryData = []
            //   binaryData.push(e.target.files[0])
            //   setProfileImg(window.URL.createObjectURL(new Blob(binaryData)))
            //   // setProfileImg(URL.createObjectURL(e?.target?.files[0]))
            // }}
            onChange={(event) => {
              if (onImageChange(event)) {
                formik.setFieldValue(name, event.target.files[0])
              }
            }}
          />
          <img
            className={imgIconClassName}
            src={
              // img
              // ? img
              // : editFlag && editPath
              // ? toProfileImgUrl(editPath)
              // : toAbsoluteUrl("/media/avatars/blank.png")
              img ? img : imgIcon
            }
            alt=""
            width="70px"
            height="200px"
            {...rest}
          />
        </span>
      </label>
      <br />
      <ErrorMessage name={name} component="span" className="invalid-input" style={{ color: "red" }} />
    </>
  )
}

export default FormikImage
