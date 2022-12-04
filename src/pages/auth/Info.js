import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { FormCheck, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { setIsAuthenticated } from '../../redux/actions/AuthAction';
import ApiService from '../../services/ApiService';
import { getCollages, getWorkingPosition } from '../../services/ReuseableFun';
import DatePickerField from '../../Shared-Component-formik/date-picker/DatePickerField ';
import SchemaList from '../../Shared-Component-formik/schema/SchemaList';
import FormSelectField from './../../Shared-Component-formik/select/form-select-field';
import LeftBox from './components/LeftBox';

const Info = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [occ, setocc] = useState();
  const [collageList, setcollageList] = useState([]);
  const [workingPositionList, setworkingPositionList] = useState([]);

  useEffect(() => {
  }, []);

  const initialValues = {
    occupation: '',
    birthYear: '',
    referalCode: '',
    collegeName: '',
    graduationMonth: '',
    position: '',
    experience: '',
    organization: '',
    organizationCode: '',
  };
  let validationSchema = Yup.object({
    occupation: SchemaList[0].required('Please select an occupation.'),
    birthYear: SchemaList[0],
    // referalCode: SchemaList[0],
    ...(occ == 'STUDENT' && { collegeName: SchemaList[0] }),
    ...(occ == 'STUDENT' && { graduationMonth: SchemaList[0] }),
    ...(occ == 'PROFESSIONAL' && { position: SchemaList[0] }),
    ...(occ == 'PROFESSIONAL' && { experience: SchemaList[0] }),
    ...(occ == 'PROFESSIONAL' && { organization: SchemaList[0] }),
    ...(occ == 'PROFESSIONAL' && { organizational_code: SchemaList[0] }),
  });

  const onSubmit = async (values) => {
    let loginData = await JSON.parse(localStorage.getItem('user'));
    let data = {
      uid: loginData.uid,
      occupation: values.occupation,
      information_data: {
        referral_code: values.referalCode,
        birth_year: parseInt(values?.birthYear?.getFullYear()),
        ...(occ == 'STUDENT' && { college_name: values.collegeName }),
        ...(occ == 'STUDENT' && { month_year_of_graduation: values.graduationMonth }),
        ...(occ == 'PROFESSIONAL' && { position: values.position }),
        ...(occ == 'PROFESSIONAL' && { experience_in_years: values.experience }),
        ...(occ == 'PROFESSIONAL' && { organization_name: values.organization }),
        ...(occ == 'PROFESSIONAL' && { organizational_code: values.organizationCode }),
      },
    };

    let userData = {
      uid: loginData.uid,
      email: location.state?.email,
      phone: `+${location.state?.mobileNumber}`
    };

    let response = await ApiService(`/user/create`, `POST`, userData);
    if(response?.data?.code === 200) {
      let res = await ApiService(`on-boarding/update-information`, `PUT`, data);
      if (res?.data?.code === 200) {
        navigate('/dashboard');
        dispatch(setIsAuthenticated(true));
      }
    }
    
  };

  const getCollageList = async () => {
    setcollageList(await getCollages());
  };
  const getWorkingPositionList = async () => {
    setworkingPositionList(await getWorkingPosition());
  };

  useEffect(() => {
    getCollageList();
    getWorkingPositionList();
  }, []);

  return (
    <>
      <section className="auth_layout login_screen">
        <LeftBox />
        <div className="right_box">
          <div className="right_box_container right_box_infostudents">
            <div className="log-in-title login-head">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none">
                <g clip-path="url(#clip0_726_3575)">
                  <path
                    d="M19 10.9998H7.14L10.77 6.63979C10.9397 6.43557 11.0214 6.17229 10.997 5.90786C10.9726 5.64344 10.8442 5.39953 10.64 5.22979C10.4358 5.06005 10.1725 4.97839 9.90808 5.00277C9.64365 5.02715 9.39974 5.15557 9.23 5.35979L4.23 11.3598C4.19636 11.4075 4.16628 11.4576 4.14 11.5098C4.14 11.5598 4.14 11.5898 4.07 11.6398C4.02467 11.7544 4.00094 11.8765 4 11.9998C4.00094 12.1231 4.02467 12.2451 4.07 12.3598C4.07 12.4098 4.07 12.4398 4.14 12.4898C4.16628 12.5419 4.19636 12.5921 4.23 12.6398L9.23 18.6398C9.32402 18.7527 9.44176 18.8434 9.57485 18.9057C9.70793 18.9679 9.85309 19 10 18.9998C10.2337 19.0002 10.4601 18.9189 10.64 18.7698C10.7413 18.6858 10.825 18.5827 10.8863 18.4664C10.9477 18.35 10.9855 18.2227 10.9975 18.0918C11.0096 17.9608 10.9957 17.8287 10.9567 17.7031C10.9176 17.5775 10.8542 17.4608 10.77 17.3598L7.14 12.9998H19C19.2652 12.9998 19.5196 12.8944 19.7071 12.7069C19.8946 12.5194 20 12.265 20 11.9998C20 11.7346 19.8946 11.4802 19.7071 11.2927C19.5196 11.1051 19.2652 10.9998 19 10.9998Z"
                    fill="#8F8799"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_726_3575">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              We need a few more information about you
            </div>

            <div className="auth_form">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {(formik) => {
                  setocc(formik.values.occupation);
                  return (
                    <Form>
                      <Field
                        name="occupation"
                        render={({ field, formProps }) => (
                          <Row className="mb-0">
                            <FormGroup
                              className="form-group-1 mb-3"
                              as={Col}
                              controlId="occupation"
                              md="12">
                              <FormLabel>Your occupation*</FormLabel>
                              <div className="ms-4">
                                <FormCheck
                                  type="radio"
                                  name="occupation"
                                  value="STUDENT"
                                  onChange={(e) => {
                                    field.onChange(e);
                                    formik.setTouched({});
                                  }}
                                  label="I’m a student."
                                />
                                <FormCheck
                                  type="radio"
                                  name="occupation"
                                  onChange={(e) => {
                                    field.onChange(e);
                                    formik.setTouched({});
                                  }}
                                  value="PROFESSIONAL"
                                  label="I'm a working professional."
                                />
                                <FormCheck
                                  type="radio"
                                  name="occupation"
                                  value="UNEMPLOYED"
                                  onChange={(e) => {
                                    field.onChange(e);
                                    formik.setTouched({});
                                  }}
                                  label="Unemployed"
                                />
                              </div>
                            </FormGroup>
                          </Row>
                        )}
                      />
                      {formik?.errors?.occupation && formik?.touched?.occupation ? (
                        <div className="error-text">{formik?.errors?.occupation}</div>
                      ) : null}

                      {formik.values.occupation === 'STUDENT' ? (
                        <div className="college-student">
                          {/* formik + react-bootstrap + select  */}
                          <FormSelectField
                            name="collegeName"
                            controlId="collegeName"
                            as={Col}
                            className="form-group-1 mb-3 mt-3"
                            label="Enter your college name*"
                            type="text"
                            md="12"
                            error={formik?.errors?.collegeName}
                            touched={formik?.touched?.collegeName}>
                            <option value="">Select a Collage</option>
                            {collageList.map((col) => {
                              return <option value={col.value}>{col.label}</option>;
                            })}
                          </FormSelectField>
                          <Field
                            name="graduationMonth"
                            render={({ field, formProps }) => (
                              <Row className="mb-0">
                                {/* <FormLabel>Your month & year of graduation*</FormLabel> */}

                                <FormGroup
                                  controlId="graduationMonth"
                                  className="form-group-1 mb-3"
                                  as={Col}
                                  md="12">
                                  <FormLabel>Your month & year of graduation*</FormLabel>
                                  <DatePickerField
                                    name="graduationMonth"
                                    views={['year', 'month']}
                                    minDate={new Date('2012-03-01')}
                                    maxDate={new Date()}
                                  />
                                </FormGroup>
                              </Row>
                            )}
                          />
                          {/* <DatePickerField
                            name="birthYear"
                            views={['year', 'month']}
                            minDate={new Date('2012-03-01')}
                            maxDate={new Date('2023-06-01')}
                          /> */}
                          {formik?.errors?.graduationMonth && formik?.touched?.graduationMonth ? (
                            <div className="error-text">{formik?.errors?.graduationMonth}</div>
                          ) : null}
                        </div>
                      ) : null}

                      {formik.values.occupation === 'PROFESSIONAL' ? (
                        <div className="college-student">
                          {/* <Field
                            name="position"
                            render={({ field, formProps }) => (
                              <Row className="mb-0">
                                <FormGroup
                                  controlId="position"
                                  className="form-group-1 mb-3"
                                  as={Col}
                                  md="12">
                                  <FormLabel>Your current working position*</FormLabel>
                                  <FormControl
                                    placeholder="Eg. Software Engineer"
                                    type={'text'}
                                    value={field.value}
                                    onChange={field.onChange}
                                  />
                                </FormGroup>
                              </Row>
                            )}
                          /> */}
                          {/* formik + react-bootstrap + select  */}
                          <FormSelectField
                            name="position"
                            controlId="position"
                            as={Col}
                            className="form-group-1 mb-2"
                            label="Your current working position*"
                            type="text"
                            md="12">
                            <option value="">Select a Position</option>
                            {workingPositionList.map((col) => {
                              return <option value={col.value}>{col.label}</option>;
                            })}
                          </FormSelectField>
                          {formik?.errors?.position && formik?.touched?.position ? (
                            <div className="error-text">{formik?.errors?.position}</div>
                          ) : null}
                          <Field
                            name="experience"
                            render={({ field, formProps }) => (
                              <Row className="mb-0">
                                <FormGroup
                                  controlId="experience"
                                  className="form-group-1 mb-3"
                                  as={Col}
                                  md="12">
                                  <FormLabel>Total technical experience in years*</FormLabel>
                                  <FormControl
                                    placeholder="Eg, 2"
                                    type={'text'}
                                    value={field.value}
                                    onChange={field.onChange}
                                  />
                                </FormGroup>
                              </Row>
                            )}
                          />
                          {formik?.errors?.experience && formik?.touched?.experience ? (
                            <div className="error-text">{formik?.errors?.experience}</div>
                          ) : null}
                          <Field
                            name="organization"
                            render={({ field, formProps }) => (
                              <Row className="mb-0">
                                <FormGroup
                                  controlId="organization"
                                  className="form-group-1 mb-3"
                                  as={Col}
                                  md="12">
                                  <FormLabel>Ogranization you are working in</FormLabel>
                                  <FormControl
                                    placeholder="Eg, Amazon"
                                    type={'text'}
                                    value={field.value}
                                    onChange={field.onChange}
                                  />
                                </FormGroup>
                              </Row>
                            )}
                          />
                          {formik?.errors?.organization && formik?.touched?.organization ? (
                            <div className="error-text">{formik?.errors?.organization}</div>
                          ) : null}

                          <Field
                            name="organizationCode"
                            render={({ field, formProps }) => (
                              <Row className="mb-0">
                                <FormGroup
                                  controlId="organizationCode"
                                  className="form-group-1 mb-3"
                                  as={Col}
                                  md="12">
                                  <FormLabel>Do you have any Organization code?</FormLabel>
                                  <FormControl
                                    placeholder="Enter a organization code here"
                                    type={'text'}
                                    value={field.value}
                                    onChange={field.onChange}
                                  />
                                </FormGroup>
                              </Row>
                            )}
                          />
                          {formik?.errors?.organizationCode && formik?.touched?.organizationCode ? (
                            <div className="error-text">{formik?.errors?.organizationCode}</div>
                          ) : null}
                        </div>
                      ) : null}

                      <Field
                        name="birthYear"
                        render={({ field, formProps }) => (
                          <Row className="mb-0">
                            <FormGroup
                              controlId="birthYear"
                              className="form-group-1 mb-3"
                              as={Col}
                              md="12">
                              <FormLabel>Your birth year*</FormLabel>
                              <br />

                              <DatePickerField
                                name="birthYear"
                                className="form-group-1 mb-3"
                                maxDetail="decade"
                                maxDate={new Date()}
                              />
                            </FormGroup>
                          </Row>
                        )}
                      />

                      {formik?.errors?.birthYear && formik?.touched?.birthYear ? (
                        <div className="error-text">{formik?.errors?.birthYear}</div>
                      ) : null}
                      <Field
                        name="referalCode"
                        render={({ field, formProps }) => (
                          <Row className="mb-0">
                            <FormGroup
                              controlId="referalCode"
                              className="form-group-1 mb-3"
                              as={Col}
                              md="12">
                              <FormLabel>Do you have any referral code?</FormLabel>
                              <FormControl
                                placeholder="Enter a referral code here"
                                type={'text'}
                                value={field.value}
                                onChange={field.onChange}
                              />
                            </FormGroup>
                          </Row>
                        )}
                      />
                      {formik?.errors?.referalCode && formik?.touched?.referalCode ? (
                        <div className="error-text">{formik?.errors?.referalCode}</div>
                      ) : null}

                      <div className="d-grid gap-2 my-3">
                        <Button type="submit" variant="secondary">
                          Get Started
                        </Button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Info;
