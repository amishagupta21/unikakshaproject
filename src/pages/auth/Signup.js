import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import { Form, Field, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SocialLogin from '../../utils-componets/SocialLogin';
import LeftBox from './components/LeftBox';
import AuthNavbar from './components/AuthNavbar';
import PhoneInput from 'react-phone-input-2'

const Signup = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	return (
		<>
			<AuthNavbar />
			<section className="auth_layout login_screen">
				<LeftBox />
				<div className="right_box">
					<div className="right_box_container">
						<div className='log-in-title'>Sign Up</div>
						<div href="#" className="resetpassword create-account">
							Already have an account?
							<a href="">
								<Link to="/login"> Log in</Link>
							</a>
						</div>
						<div className="auth_form">
							<Formik
								initialValues={{
									fullName: "",
									email: "",
									mobileNumber: "",
									subscribe: false
								}}
								validationSchema={Yup.object().shape({
									fullName: Yup.string(),
									email: Yup.string(),
									mobileNumber: Yup.number()
								})}
								onSubmit={(values) => {
									const { fullName, email, mobileNumber } = values;
									console.log("values::", values);
								}}
								render={({
									handleChange,
									handleSubmit,
									handleBlur,
									values,
									errors,
									touched,
									validateForm,
									setFieldValue
								}) => (
									<Form>
										<Field
											name="fullName"
											render={({ field, formProps }) => (
												<Row className="mb-0">
													<FormGroup
														controlId="fullName"
														className="form-group-1 mb-3"
														as={Col}
														md="12">
														<FormLabel>Full Name (As per PAN)</FormLabel>
														<FormControl
															placeholder="Enter your name here"
															type={'text'}
															value={field.value}
															onChange={field.onChange}
														/>
													</FormGroup>
												</Row>
											)}
										/>
										{errors.fullName && touched.fullName ? (
											<div className="error-text">{errors.fullName}</div>
										) : null}
										<Field
											name="email"
											render={({ field, formProps }) => (
												<Row className="mb-0">
													<FormGroup
														controlId="email"
														className="form-group-1 mb-3"
														as={Col}
														md="12">
														<FormLabel>Email</FormLabel>
														<FormControl
															placeholder="Enter your email here"
															type={'text'}
															value={field.value}
															onChange={field.onChange}
														/>
													</FormGroup>
												</Row>
											)}
										/>
										{errors.email && touched.email ? (
											<div className="error-text">{errors.email}</div>
										) : null}
										<Field
											name="mobileNumber"
											render={({ field, formProps }) => (
												<Row className="mb-0">
													<FormLabel>Enter Number</FormLabel>
													<PhoneInput
														placeholder="Enter Number"
														country={'us'}
														value={field.value}
														onChange={(phone, data) => {
															setFieldValue('mobileNumber', phone)
															setFieldValue('mobileLength', data.dialCode.length)
														}}
													/>
												</Row>

											)}
										/>
										{errors.mobileNumber && touched.mobileNumber ? (
											<div className="error-text">{errors.mobileNumber}</div>
										) : null}
										<label className="mb-3">
											<Field className="me-2" type="checkbox" name="subscribe" />
											By sign up you subcribe to have WhatsApp updates.
										</label>
										<div className="d-grid gap-2">
											<Button
												type="submit"
												variant="info">
												Sign Up
											</Button>
										</div>
										<div>
											By clicking sign up you will be agree with our
										 <a> terms & conditions </a> and  <a> privacy policy. </a> 
										</div>
									</Form>
								)}
							/>
							<SocialLogin />
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Signup;
