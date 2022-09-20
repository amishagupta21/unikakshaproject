import { Form, Formik } from "formik";
import React from "react";
import { Modal } from "react-bootstrap";
import FormikController from "../../../../Shared-Component-formik/FormikController";
import SchemaList from "../../../../Shared-Component-formik/schema/SchemaList";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { getuserProfile } from "../../../../redux/actions/UserActions";
import { toast } from "react-toastify";
import {
	addWorkExperience,
	deleteExperience,
	editWorkExperience,
} from "../../../../redux/actions/WorkExperienceAction";
import { setLoading } from "../../../../redux/actions/LoaderActions";
import {
	optionsEmploymentType,
	optionsmonth,
	yearsOptions,
} from "../../../../utils-componets/static-content/DateMonthContent";

const WorkExperienceModal = ({
	isShowExperienceModal,
	setIsShowExperienceModal,
	experienceCurrentInfo,
	setExperienceCurrentInfo,
}) => {
	const userId = JSON.parse(localStorage.getItem("user"))?.uid;
	const dispatch = useDispatch();

	// if (experienceCurrentInfo) {
	//     console.log("ss0::", experienceCurrentInfo)
	// }

	console.log("ss0::", experienceCurrentInfo.employmentType);

	return (
		<Modal
			size="lg"
			className="add-popup add-exp-modal"
			show={isShowExperienceModal}
			onHide={() => {
				setExperienceCurrentInfo("");
				setIsShowExperienceModal(false);
			}}
			aria-labelledby="example-modal-sizes-title-lg"
		>
			<Modal.Header closeButton>
				<Modal.Title id="example-modal-sizes-title-lg">
					Add Experience
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Formik
					initialValues={{
						title: experienceCurrentInfo ? experienceCurrentInfo.title : "",
						employmentType: experienceCurrentInfo
							? experienceCurrentInfo.employmentType
							: "",
						companyName: experienceCurrentInfo
							? experienceCurrentInfo.companyName
							: "",
						location: experienceCurrentInfo
							? experienceCurrentInfo.location
							: "",
						startMonth: experienceCurrentInfo
							? experienceCurrentInfo.startMonth
							: "",
						startYear: experienceCurrentInfo
							? experienceCurrentInfo.startYear
							: "",
						endMonth: experienceCurrentInfo
							? experienceCurrentInfo.endMonth
							: "",
						endYear: experienceCurrentInfo ? experienceCurrentInfo.endYear : "",
						description: experienceCurrentInfo
							? experienceCurrentInfo.description
							: "",
					}}
					validationSchema={Yup.object({
						title: SchemaList[0].required("title is a required field"),
						employmentType: SchemaList[0].required(
							"employmentType is a required field"
						),
						companyName: SchemaList[0].required(
							"companyName is a required field"
						),
						location: SchemaList[0].required("location is a required field"),
						startMonth: SchemaList[0].required(
							"startMonth is a required field"
						),
						startYear: SchemaList[0].required("startYear is a required field"),
						endMonth: SchemaList[0].required("endMonth is a required field"),
						endYear: SchemaList[0].required("endYear is a required field"),
						description: SchemaList[0].required(
							"description is a required field"
						),
					})}
					onSubmit={async (values) => {
						let data = {};
						let res = {};
						console.log("experienceCurrentInfo", experienceCurrentInfo);
						if (experienceCurrentInfo) {
							data = {
								uid: userId,
								we_id: experienceCurrentInfo?._id,
								workExperience: values,
							};
							//edit
							res = await dispatch(editWorkExperience(data));
						} else {
							data = {
								uid: userId,
								workExperience: values,
							};
							//add
							res = await dispatch(addWorkExperience(data));
						}

						if (res.status === 201 || res.status === 200) {
							let title = "Created";
							if (res.status === 200) {
								let title = "Edited";
							}
							setIsShowExperienceModal(false);
							setExperienceCurrentInfo("");
							toast.success(`${res?.data?.message}`, {
								theme: "colored",
							});
							dispatch(getuserProfile(userId));
						} else {
							toast.error("Something is Wrong", {
								theme: "colored",
							});
						}
					}}
				>
					{(formik) => {
						console.log("formik::", formik);
						return (
							<Form
								onSubmit={formik.handleSubmit}
								className="form"
								autoComplete="false"
							>
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
												options={optionsEmploymentType}
												value={formik.values.employmentType}
												onChange={formik.handleChange}
												error={formik.errors.employmentType}
											/>
										</div>
										<div className="form-group">
											<FormikController
												control="input"
												type="text"
												label="Company Name"
												labelClassName="required fs-6 mb-2"
												name="companyName"
												className="form-control form-control-solid mb-lg-0"
												maxLength="25"
												formik={formik}
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
															maxLength="200"
															formik={formik}
															value={formik.values.description}
															onChange={formik.handleChange}
															error={formik.errors.description}
														/>
														<div className="info-help">
															0/1,000
															<br />
															1000 maximum characters allowed.
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<Modal.Footer>
									<div className="row">
										<div className="col-sm-6 col-padding-left">
											{experienceCurrentInfo ? (
												<button
													onClick={async () => {
														console.log("ID:::", experienceCurrentInfo?._id);
														dispatch(setLoading(true));
														setExperienceCurrentInfo("");
														let res = await dispatch(
															deleteExperience({
																uid: userId,
																id: experienceCurrentInfo?._id,
															})
														);
														if (res.status === 200) {
															dispatch(setLoading(false));
															setIsShowExperienceModal(false);
															toast.success(
																`User Experience Deleted Successfully`,
																{
																	theme: "colored",
																}
															);
															dispatch(getuserProfile(userId));
														} else {
															dispatch(setLoading(false));
															toast.error(`something is wrong`, {
																theme: "colored",
															});
														}
													}}
													className="btn btn-primary btn-secondary mx-2"
												>
													Delete
												</button>
											) : null}
										</div>
										<div className="col-sm-6 col-padding-right">
											<button
												type="submit"
												className="btn btn-primary"
												// disabled={formik.initialValues !== formik.values ? false : true}
											>
												SAVE
											</button>
										</div>
									</div>
								</Modal.Footer>
							</Form>
						);
					}}
				</Formik>
			</Modal.Body>
		</Modal>
	);
};

export default WorkExperienceModal;
