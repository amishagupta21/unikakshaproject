import { Form, Formik } from 'formik'
import React from 'react'
import { useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from "yup"
import { addUserEducation, getDegree, getFieldOfStudy } from '../../../../redux/actions/ProfileActions'
import FormikController from '../../../../Shared-Component-formik/FormikController'
import SchemaList from '../../../../Shared-Component-formik/schema/SchemaList'
import { optionsmonth, yearsOptions } from '../../../../utils-componets/static-content/DateMonthContent'

const EducationModal = ({ isShowEducationModal, setIsShowEducationModal, educationCurrentInfo, setEducationCurrentInfo }) => {
    const dispatch = useDispatch()
    const userId = JSON.parse(localStorage.getItem("user"))?.uid
    const ReduxProfileData = useSelector(state => state?.profile)

    const degreeList = ReduxProfileData?.degreeList
    const fieldOfStudyList = ReduxProfileData?.fieldOfStudyList

    useEffect(() => {
        dispatch(getDegree())
        dispatch(getFieldOfStudy())
    }, [])
    console.log("fieldOfStudyList:::", fieldOfStudyList);

    const addEducation = async (values) => {
        console.log("Edu values::", values);
        let res = await dispatch(addUserEducation({
            uid: userId,
            education: values
        }))
        console.log("res::", res)
    }
    // if (educationCurrentInfo) {
    //     console.log("ss0::", experienceCurrentInfo)
    // }

    return (
        <Modal
            size="lg"
            className="add-popup add-exp-modal"
            show={isShowEducationModal}
            onHide={() => setIsShowEducationModal(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">Add/Edit Education</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        school: "",
                        degree: "",
                        fieldOfStudy: "",
                        grade: "",
                        startMonth: "",
                        startYear: "",
                        endMonth: "",
                        endYear: "",
                        description: ""
                    }}
                    validationSchema={Yup.object({
                        school: SchemaList[0].required(" school is a required field"),
                        degree: SchemaList[0].required(" degree is a required field"),
                        fieldOfStudy: SchemaList[0].required("fieldOfStudy is a required field"),
                        grade: SchemaList[0].required("grade is a required field"),
                        startMonth: SchemaList[0].required("startMonth is a required field"),
                        startYear: SchemaList[0].required("startYear is a required field"),
                        endMonth: SchemaList[0].required("endMonth is a required field"),
                        endYear: SchemaList[0].required("endYear is a required field"),
                        description: SchemaList[0].required("description is a required field"),
                    })}
                    onSubmit={addEducation}
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
                                                label="School"
                                                labelClassName="required fs-6 mb-2"
                                                name="school"
                                                className="form-control form-control-solid mb-lg-0"
                                                maxLength="25"
                                                formik={formik}
                                                value={formik.values.school}
                                                onChange={formik.handleChange}
                                                error={formik.errors.school}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Degree</label>
                                            <FormikController
                                                control="react_select"
                                                labelClassName="required fw-bold fs-6 mb-2"
                                                name="degree"
                                                isMulti={false}
                                                className="form-control-solid mb-lg-0"
                                                formik={formik}
                                                options={degreeList}
                                                value={formik.values.degree}
                                                onChange={formik.handleChange}
                                                error={formik.errors.degree}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Field of Study</label>
                                            <FormikController
                                                control="react_select"
                                                labelClassName="required fw-bold fs-6 mb-2"
                                                name="fieldOfStudy"
                                                isMulti={false}
                                                className="form-control-solid mb-lg-0"
                                                formik={formik}
                                                options={fieldOfStudyList}
                                                value={formik.values.fieldOfStudy}
                                                onChange={formik.handleChange}
                                                error={formik.errors.fieldOfStudy}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <FormikController
                                                control="input"
                                                type="text"
                                                label="Grade"
                                                labelClassName="required fs-6 mb-2"
                                                name="grade"
                                                className="form-control form-control-solid mb-lg-0"
                                                maxLength="25"
                                                formik={formik}
                                                value={formik.values.grade}
                                                onChange={formik.handleChange}
                                                error={formik.errors.grade}
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
                                                            maxLength="200"
                                                            formik={formik}
                                                            value={formik.values.description}
                                                            onChange={formik.handleChange}
                                                            error={formik.errors.description}
                                                        />
                                                        <div className="info-help">0/1,000<br />
                                                            1000 maximum characters allowed.</div></div>
                                                </div>
                                            </div> </div>
                                    </div>
                                </div>
                                <Modal.Footer>
                                    <div className="row">
                                        <div className="col-sm-6 col-padding-left"> </div>
                                        <div className="col-sm-6 col-padding-right">  <button type="submit" className="btn btn-primary">SAVE</button></div>
                                    </div>
                                </Modal.Footer>
                            </Form>
                        )
                    }}
                </Formik>
            </Modal.Body>
        </Modal>
    )
}

export default EducationModal