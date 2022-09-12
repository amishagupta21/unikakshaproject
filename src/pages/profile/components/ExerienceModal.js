import { Form, Formik } from 'formik'
import React from 'react'
import { Modal } from 'react-bootstrap'
import FormikController from '../../../Shared-Component-formik/FormikController'
import SchemaList from '../../../Shared-Component-formik/schema/SchemaList'
import * as Yup from "yup"
import { useDispatch } from 'react-redux'
import { addUserExperience } from '../../../redux/actions/UserActions'
import { toast } from 'react-toastify'

const ExerienceModal = ({ isShowExperienceModal, setIsShowExperienceModal }) => {
    const userId = JSON.parse(localStorage.getItem("user"))?.uid
    const dispatch = useDispatch()
    const yearsOptions = [
        { value: "2000", label: "2000" },
        { value: "2001", label: "2001" },
        { value: "2002", label: "2002" },
        { value: "2003", label: "2003" },
        { value: "2004", label: "2004" },
        { value: "2005", label: "2005" },
        { value: "2006", label: "2006" },
        { value: "2007", label: "2007" },
        { value: "2008", label: "2008" },
        { value: "2009", label: "2009" },
        { value: "2010", label: "2010" },
        { value: "2011", label: "2011" },
        { value: "2012", label: "2012" },
        { value: "2013", label: "2013" },
        { value: "2014", label: "2014" },
        { value: "2015", label: "2015" },
        { value: "2016", label: "2016" },
        { value: "2017", label: "2017" },
        { value: "2018", label: "2018" },
        { value: "2019", label: "2019" },
        { value: "2020", label: "2020" },
        { value: "2021", label: "2021" },
        { value: "2022", label: "2022" },

    ]
    const optionsmonth = [
        { value: "May", label: "May" },
        { value: "June", label: "June" },
        { value: "July", label: "July" },
        { value: "August", label: "August" },
        { value: "September", label: "September" },
        { value: "October", label: "October" },
        { value: "November", label: "November" },
        { value: "December", label: "December" },
        { value: "January", label: "January" },
        { value: "February", label: "February" },
        { value: "March", label: "March" },
        { value: "April", label: "April" },
    ]
    const options = [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
    ]
    const options1 = [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
    ]

    const addExperience = async (values) => {
        console.log("experience : ", values);
        let data = {
            uid: userId,
            workExperience: values
        }
        let res = await dispatch(addUserExperience(data));
        if (res.status === 201) {
            toast.success("User Experience Created Successfully", {
                theme: "colored"
            })
        } else {
            toast.error("Something is Wrong", {
                theme: "colored"
            })
        }
        console.log("aaa", res)
    }

    return (
        <Modal
            size="lg"
            className="add-popup add-exp-modal"
            show={isShowExperienceModal}
            onHide={() => setIsShowExperienceModal(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">Add Experience</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        title: "",
                        employmentType: "",
                        companyName: "",
                        location: "",
                        startMonth: "",
                        startYear: "",
                        endMonth: "",
                        endYear: "",
                        description: ""
                    }}
                    validationSchema={Yup.object({
                        title: SchemaList[0].required(" title is a required field"),
                        employmentType: SchemaList[0].required(" employmentType is a required field"),
                        companyName: SchemaList[0].required("companyName is a required field"),
                    })}
                    onSubmit={(val) => addExperience(val)}
                >
                    {(formik) => {
                        return (
                            <Form onSubmit={formik.handleSubmit} className="form" autoComplete="false">
                                <div
                                    className="d-flex row me-n7 pe-7"
                                    id="kt_modal_add_user_scroll"
                                    data-kt-scroll="true"
                                    data-kt-scroll-activate="{default: false, lg: true}"
                                    data-kt-scroll-dependencies="#kt_modal_add_user_header"
                                    data-kt-scroll-wrappers="#kt_modal_add_user_scroll"
                                >
                                    <div className="col-12">
                                        <div className="form-group">
                                            <FormikController
                                                control="input"
                                                type="text"
                                                label="Title"
                                                labelClassName="required fs-6 mb-2"
                                                name="title"
                                                className="form-control form-control-solid mb-lg-0"
                                                maxLength="25"
                                                formik={formik}
                                                value={formik.values.title}
                                                onChange={formik.handleChange}
                                                error={formik.errors.title}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <FormikController
                                                control="react_select"
                                                labelClassName="required fw-bold fs-6 mb-2"
                                                name="employmentType"
                                                label="Employee Type"
                                                isMulti={false}
                                                className="form-control-solid mb-lg-0"
                                                formik={formik}
                                                options={options}
                                                value={formik.values.employmentType}
                                                onChange={formik.handleChange}
                                                error={formik.errors.employmentType}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <FormikController
                                                control="react_select"
                                                labelClassName="required fw-bold fs-6 mb-2"
                                                name="companyName"
                                                label="Company Name"
                                                isMulti={false}
                                                className="form-control-solid mb-lg-0"
                                                formik={formik}
                                                options={options1}
                                                value={formik.values.companyName}
                                                onChange={formik.handleChange}
                                                error={formik.errors.companyName}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <FormikController
                                                control="input"
                                                type="text"
                                                label="Location"
                                                labelClassName="required fs-6 mb-2"
                                                name="location"
                                                className="form-control form-control-solid mb-lg-0"
                                                maxLength="25"
                                                formik={formik}
                                                value={formik.values.location}
                                                onChange={formik.handleChange}
                                                error={formik.errors.location}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <div className="form-group-main">
                                                <div className="form-group-left">
                                                    <div className="form-group-startdate">
                                                        <label>Start date</label>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <FormikController
                                                                    control="react_select"
                                                                    labelClassName="required fw-bold fs-6 mb-2"
                                                                    name="startMonth"
                                                                    isMulti={false}
                                                                    className="form-control-solid mb-lg-0"
                                                                    formik={formik}
                                                                    options={optionsmonth}
                                                                    value={formik.values.startMonth}
                                                                    onChange={formik.handleChange}
                                                                    error={formik.errors.startMonth}
                                                                />
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <FormikController
                                                                    control="react_select"
                                                                    labelClassName="required fw-bold fs-6 mb-2"
                                                                    name="startYear"
                                                                    isMulti={false}
                                                                    className="form-control-solid mb-lg-0"
                                                                    formik={formik}
                                                                    options={yearsOptions}
                                                                    value={formik.values.startYear}
                                                                    onChange={formik.handleChange}
                                                                    error={formik.errors.startYear}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group-startdate form-group-endtdate">
                                                        <label>End date</label>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <FormikController
                                                                    control="react_select"
                                                                    labelClassName="required fw-bold fs-6 mb-2"
                                                                    name="endMonth"
                                                                    isMulti={false}
                                                                    className="form-control-solid mb-lg-0"
                                                                    formik={formik}
                                                                    options={optionsmonth}
                                                                    value={formik.values.endMonth}
                                                                    onChange={formik.handleChange}
                                                                    error={formik.errors.endMonth}
                                                                />
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <FormikController
                                                                    control="react_select"
                                                                    labelClassName="required fw-bold fs-6 mb-2"
                                                                    name="endYear"
                                                                    isMulti={false}
                                                                    className="form-control-solid mb-lg-0"
                                                                    formik={formik}
                                                                    options={yearsOptions}
                                                                    value={formik.values.endYear}
                                                                    onChange={formik.handleChange}
                                                                    error={formik.errors.endYear}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group-right">
                                                    <div className="form-group">
                                                        <FormikController
                                                            control="input"
                                                            type="text"
                                                            label="Description"
                                                            placeholder="Enter Description "
                                                            labelClassName="required fs-6 mb-2"
                                                            name="description"
                                                            className="form-control form-control-solid mb-lg-4 pb-5 form-about-textarea"
                                                            maxLength="25"
                                                            formik={formik}
                                                            value={formik.values.description}
                                                            onChange={formik.handleChange}
                                                            error={formik.errors.description}
                                                        />
                                                        <div className="info-help">0/1,000<br />
                                                            1000 maximum characters allowed.</div></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Modal.Footer>
                                    <div className="row">
                                        <div className="col-sm-6 col-padding-left">
                                            <button
                                                onClick={() => setIsShowExperienceModal(false)}
                                                className="btn btn-primary btn-secondary">
                                                Cancel
                                            </button>
                                        </div>
                                        <div className="col-sm-6 col-padding-right">
                                            <button type="submit" className="btn btn-primary">SAVE</button>
                                        </div>
                                    </div>
                                </Modal.Footer>
                            </Form>
                        )
                    }}
                </Formik>
            </Modal.Body >
        </Modal >
    )
}

export default ExerienceModal