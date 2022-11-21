import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { FormCheck } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import ApiService from '../../services/ApiService';
import { getCollages, getWorkingPosition } from '../../services/ReuseableFun';
import DatePickerField from '../../Shared-Component-formik/date-picker/DatePickerField ';
import SchemaList from '../../Shared-Component-formik/schema/SchemaList';
import FormSelectField from './../../Shared-Component-formik/select/form-select-field';
import AuthNavbar from './components/AuthNavbar';
import LeftBox from './components/LeftBox';

const Info = () => {
  const [occ, setocc] = useState();
  const [collageList, setcollageList] = useState([]);
  const [workingPositionList, setworkingPositionList] = useState([]);

  const navigate = useNavigate();
  const initialValues = {
    occupation: '',
    birthYear: '',
    referalCode: '',
    ...(occ == 'STUDENT' && { collegeName: '' }),
    ...(occ == 'STUDENT' && { graduationMonth: '' }),
    ...(occ == 'PROFESSIONAL' && { position: '' }),
    ...(occ == 'PROFESSIONAL' && { experience: '' }),
    ...(occ == 'PROFESSIONAL' && { organization: '' }),
    ...(occ == 'PROFESSIONAL' && { organizationCode: '' }),
  };
  let validationSchema = Yup.object({
    occupation: SchemaList[0].required('Please select an occupation.'),
    birthYear: SchemaList[0],
    referalCode: SchemaList[0],
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
        birth_year: values.birthYear,
        ...(occ == 'STUDENT' && { college_name: values.collegeName }),
        ...(occ == 'STUDENT' && { month_year_of_graduation: values.graduationMonth }),
        ...(occ == 'PROFESSIONAL' && { position: values.position }),
        ...(occ == 'PROFESSIONAL' && { experience_in_years: values.experience }),
        ...(occ == 'PROFESSIONAL' && { organization_name: values.organization }),
        ...(occ == 'PROFESSIONAL' && { organizational_code: values.organizationCode }),
      },
    };

    let res = await ApiService(`on-boarding/update-information`, `PUT`, data);
    if (res?.data?.code === 200) {
      navigate('/home');
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
      <AuthNavbar />
      <section className="auth_layout login_screen">
        <LeftBox />
        <div className="right_box">
          <div className="right_box_container">
            <div className="log-in-title">We need a few more information about you</div>

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
                                  onChange={field.onChange}
                                  label="I’m a student."
                                />
                                <FormCheck
                                  type="radio"
                                  name="occupation"
                                  onChange={field.onChange}
                                  value="PROFESSIONAL"
                                  label="I'm a working professional."
                                />
                                <FormCheck
                                  type="radio"
                                  name="occupation"
                                  value="UNEMPLOYED"
                                  onChange={field.onChange}
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
                        <div>
                          {/* formik + react-bootstrap + select  */}
                          <FormSelectField
                            name="collegeName"
                            controlId="collegeName"
                            as={Col}
                            className="form-group-1 mb-3"
                            label="Enter your college name*"
                            type="text"
                            md="12">
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
                                    maxDate={new Date('2023-06-01')}
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
                        <div>
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
                            className="form-group-1 mb-3"
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
                        <Button type="submit" variant="info">
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
