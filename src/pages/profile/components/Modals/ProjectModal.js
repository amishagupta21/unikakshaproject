import { Form, Formik } from "formik";
import React from "react";
import { Modal } from "react-bootstrap";
import FormikController from "../../../../Shared-Component-formik/FormikController";
import SchemaList from "../../../../Shared-Component-formik/schema/SchemaList";
import linked from "../../../../assets/images/icon-linked-new.png";
import pintest from "../../../../assets/images/icon-printest-new.png";
import * as Yup from "yup";
import twit from "../../../../assets/images/icon-twitter-new.png";
import { useDispatch } from "react-redux";
import { getuserProfile } from "../../../../redux/actions/UserActions";
import { toast } from "react-toastify";
import { setLoading } from "../../../../redux/actions/LoaderActions";
import {
	optionsEmploymentType,
	optionsmonth,
	yearsOptions,
} from "../../../../utils-componets/static-content/DateMonthContent";
import {
	addProject,
	deleteProject,
	editProject,
} from "../../../../redux/actions/ProjectActions";

const ProjectModal = ({
	isShowProjectModal,
	setIsShowProjectModal,
	projectCurrentInfo,
	setProjectCurrentInfo,
}) => {
	const userId = JSON.parse(localStorage.getItem("user"))?.uid;
	const dispatch = useDispatch();

	console.log("projectCurrentInfo::", projectCurrentInfo);

	return (
		<Modal
			size="lg"
			className="add-popup add-exp-modal"
			show={isShowProjectModal}
			onHide={() => {
				setProjectCurrentInfo("");
				setIsShowProjectModal(false);
			}}
			aria-labelledby="example-modal-sizes-title-lg"
		>
			<Modal.Header closeButton>
				<Modal.Title id="example-modal-sizes-title-lg">Add Project</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Formik
					initialValues={{
						title: projectCurrentInfo ? projectCurrentInfo.title : "",
						organization: projectCurrentInfo
							? projectCurrentInfo.organisation
							: "",
						about: projectCurrentInfo ? projectCurrentInfo.about : "",
						members: projectCurrentInfo ? projectCurrentInfo.members : "",
						instructors: projectCurrentInfo
							? projectCurrentInfo.instructors
							: "",
						numberOfPersons: projectCurrentInfo
							? projectCurrentInfo.numberOfPersons
							: "",
						git: projectCurrentInfo ? projectCurrentInfo.git : "",
						instagram: projectCurrentInfo ? projectCurrentInfo.instagram : "",
						linkedin: projectCurrentInfo ? projectCurrentInfo.linkedin : "",

						startMonth: projectCurrentInfo ? projectCurrentInfo.startMonth : "",
						startYear: projectCurrentInfo ? projectCurrentInfo.startYear : "",
						endMonth: projectCurrentInfo ? projectCurrentInfo.endMonth : "",
						endYear: projectCurrentInfo ? projectCurrentInfo.endYear : "",
					}}
					validationSchema={Yup.object({
						title: SchemaList[0].required("Project Title is a required field"),
						organization: SchemaList[0].required(
							"Organization is a required field"
						),
						about: SchemaList[0].required(
							"Project Details is a required field"
						),
						members: SchemaList[0].required("Members is a required field"),
						instructors: SchemaList[0].required(
							"Instructors is a required field"
						),
						numberOfPersons: SchemaList[0].required(
							"Number Of Persons is a required field"
						),

						git: SchemaList[0].required("Git is a required field"),
						instagram: SchemaList[0].required("Instagram is a required field"),
						linkedin: SchemaList[0].required("Linkedin is a required field"),
						startMonth: SchemaList[0].required(
							"StartMonth is a required field"
						),
						startYear: SchemaList[0].required("StartYear is a required field"),
						endMonth: SchemaList[0].required("EndMonth is a required field"),
						endYear: SchemaList[0].required("EndYear is a required field"),
					})}
					onSubmit={async (values) => {
						let data = {};
						let res = {};
						values = {
							title: values.title,
							about: values.about,
							organisation: values.organization,
							instructors: values.instructors,
							members: values.members,
							numberOfPersons: values.numberOfPersons,
							startMonth: values.startMonth,
							startYear: values.startYear,
							endMonth: values.endMonth,
							endYear: values.endYear,
							projectLinks: [values.git, values.instagram, values.linkedin],
						};

						if (projectCurrentInfo) {
							data = {
								uid: userId,
								p_id: projectCurrentInfo?._id,
								project: values,
							};
							//edit
							res = await dispatch(editProject(data));
						} else {
							data = {
								uid: userId,
								project: values,
							};
							//add
							res = await dispatch(addProject(data));
						}

						if (res.status === 201 || res.status === 200) {
							let title = "Created";
							if (res.status === 200) {
								let title = "Edited";
							}
							setIsShowProjectModal(false);
							setProjectCurrentInfo("");
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
												label="Project Title"
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
												control="input"
												type="text"
												label="About Project"
												labelClassName="required fs-6 mb-2"
												name="about"
												className="form-control form-control-solid mb-lg-0"
												maxLength="25"
												formik={formik}
												value={formik.values.about}
												onChange={formik.handleChange}
												error={formik.errors.about}
											/>
										</div>
										<div className="form-group row">
											<div className="form-group col-6">
												<div className="form-group">
													<FormikController
														control="input"
														type="text"
														label="Organization"
														labelClassName="required fs-6 mb-2"
														name="organization"
														className="form-control form-control-solid mb-lg-0"
														maxLength="25"
														formik={formik}
														value={formik.values.organization}
														onChange={formik.handleChange}
														error={formik.errors.organization}
													/>
												</div>
												<div className="form-group">
													<FormikController
														control="react_select"
														labelClassName="required fw-bold fs-6 mb-2"
														name="members"
														label="Members"
														isMulti={false}
														className="form-control-solid mb-lg-0"
														formik={formik}
														options={optionsEmploymentType}
														value={formik.values.members}
														onChange={formik.handleChange}
														error={formik.errors.members}
													/>
												</div>
											</div>
											<div className="form-group col-6">
												<div className="form-group">
													<FormikController
														control="input"
														type="text"
														label="Instructors"
														labelClassName="required fs-6 mb-2"
														name="instructors"
														className="form-control form-control-solid mb-lg-0"
														maxLength="25"
														formik={formik}
														value={formik.values.instructors}
														onChange={formik.handleChange}
														error={formik.errors.instructors}
													/>
												</div>
												<div className="form-group">
													<FormikController
														control="input"
														type="text"
														label="Number of persons"
														labelClassName="required fs-6 mb-2"
														name="numberOfPersons"
														className="form-control form-control-solid mb-lg-0"
														maxLength="25"
														formik={formik}
														value={formik.values.numberOfPersons}
														onChange={formik.handleChange}
														error={formik.errors.numberOfPersons}
													/>
												</div>
											</div>
										</div>
										<div className="form-group">
											<div className="form-group-main">
												<div className="form-group-left">
													<div className="form-group-startdate">
														<label>Period Duration date</label>
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
													<div className="form-froup form-social">
														<FormikController
															control="input"
															type="text"
															label="Project Links"
															placeholder="Enter git id"
															labelClassName="required fs-6 mb-2"
															name="git"
															className="form-control form-control-solid mb-lg-0"
															maxLength="25"
															formik={formik}
															value={formik.values.git}
															onChange={formik.handleChange}
															error={formik.errors.git}
														/>
														<img src={linked} className="icons-assets" />
													</div>
													<div className="form-froup form-social form-social-linked">
														<FormikController
															control="input"
															type="text"
															placeholder="Enter Instagram id"
															labelClassName="required fs-6 mb-2"
															name="instagram"
															className="form-control form-control-solid mb-lg-0 my-2"
															maxLength="25"
															formik={formik}
															value={formik.values.instagram}
															onChange={formik.handleChange}
															error={formik.errors.instagram}
														/>
														<img src={pintest} className="icons-assets" />
													</div>
													<div className="form-froup form-social form-social-linked">
														<FormikController
															control="input"
															type="text"
															placeholder="Enter Linkedin id"
															labelClassName="required fs-6 mb-2"
															name="linkedin"
															className="form-control form-control-solid mb-lg-0 my-2"
															maxLength="25"
															formik={formik}
															value={formik.values.linkedin}
															onChange={formik.handleChange}
															error={formik.errors.linkedin}
														/>
														<img src={twit} className="icons-assets" />
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<Modal.Footer>
									<div className="row">
										<div className="col-sm-6 col-padding-left">
											{projectCurrentInfo ? (
												<button
													onClick={async () => {
														dispatch(setLoading(true));
														setProjectCurrentInfo("");
														let res = await dispatch(
															deleteProject({
																uid: userId,
																id: projectCurrentInfo?._id,
															})
														);
														if (res.status === 200) {
															dispatch(setLoading(false));
															setIsShowProjectModal(false);
															toast.success(`Project is Deleted Successfully`, {
																theme: "colored",
															});
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

export default ProjectModal;
