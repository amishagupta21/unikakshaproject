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
import { arrowBack } from '../../assets/images';
import { setIsAuthenticated } from '../../redux/actions/AuthAction';
import ApiService from '../../services/ApiService';
import { getColleges, getWorkingPosition } from '../../services/ReuseableFun';
import DatePickerField from '../../Shared-Component-formik/date-picker/DatePickerField ';
import SchemaList from '../../Shared-Component-formik/schema/SchemaList';
import FormSelectField from './../../Shared-Component-formik/select/form-select-field';
import LeftBox from './components/LeftBox';
import CreatableSelect from 'react-select/creatable';
import { setLoading } from './../../redux/actions/LoaderActions';

const MandatorySymbol = () => {
  return <span className="text-danger">*</span>;
};

const Info = () => {
  const [loading, setloading] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [occ, setocc] = useState();
  const [collegeList, setCollegeList] = useState([]);
  const [workingPositionList, setworkingPositionList] = useState([]);
  const [colVal, setcolVal] = useState();

  const initialValues = {
    occupation: 'UNEMPLOYED',
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
    occupation: SchemaList[0].required('Please select an occupation'),
    birthYear: SchemaList[0].required('Birth year is a required field'),
    // referalCode: SchemaList[0],
    ...(occ == 'STUDENT' && {
      collegeName: SchemaList[0].required('Collage name is a required field'),
    }),
    ...(occ == 'STUDENT' && {
      graduationMonth: SchemaList[0].required('Graduation month is a required field'),
    }),
    ...(occ == 'PROFESSIONAL' && {
      position: SchemaList[0].required('Position is a required field'),
    }),
    ...(occ == 'PROFESSIONAL' && {
      experience: SchemaList[0].required('Experience is a required field'),
    }),
    ...(occ == 'PROFESSIONAL' && {
      organization: SchemaList[0].required('Organization is a required field'),
    }),
    // ...(occ == 'PROFESSIONAL' && {
    //   organizational_code: SchemaList[0].required('Organizational code is a required field'),
    // }),
  });

  const onSubmit = async (values) => {
    setloading(true);
    dispatch(setLoading(true));

    let loginData = await JSON.parse(localStorage.getItem('user'));
    let data = {
      uid: loginData.uid,
      occupation: values.occupation,
      information_data: {
        ...(values.referalCode && { referral_code: values.referalCode }),
        birth_year: parseInt(values?.birthYear?.getFullYear()),
        ...(occ == 'STUDENT' && { college_name: values.collegeName }),
        ...(occ == 'STUDENT' && { month_year_of_graduation: values.graduationMonth }),
        ...(occ == 'PROFESSIONAL' && { position: values.position }),
        ...(occ == 'PROFESSIONAL' && { experience_in_years: values.experience }),
        ...(occ == 'PROFESSIONAL' && { organization_name: values.organization }),
        ...(occ == 'PROFESSIONAL' &&
          values.organizationCode && { organizational_code: values.organizationCode }),
      },
    };

    let res = await ApiService(`on-boarding/update-information`, `PUT`, data);
    if (res?.data?.code === 200) {
      dispatch(setLoading(false));
      navigate('/dashboard');
      setloading(false);
      dispatch(setIsAuthenticated(true));
    } else {
      setloading(false);
      dispatch(setLoading(false));
    }
  };

  const getCollegeList = async () => {
    setCollegeList(await getColleges());
  };

  const getWorkingPositionList = async () => {
    setworkingPositionList(await getWorkingPosition());
  };

  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem('user'));
    if (loginData?.uid) {
      getCollegeList();
      getWorkingPositionList();
    } else {
      navigate('/signup');
    }
  }, []);

  const createOption = (label, val) => ({
    label,
    value: val,
  });

  const handleCreate = async (inputValue, formik) => {
    let obj = {
      name: inputValue,
    };

    let res = await ApiService(`on-boarding/college/create`, `POST`, obj);
    if (res.data.code) {
      formik.setFieldValue('collegeName', res.data.data._id);

      const newOption = createOption(inputValue, res.data.data._id);
      setCollegeList((prev) => [...prev, newOption]);
      setcolVal(newOption);
      getCollegeList();
    }
  };

  return (
    <>
     <section className="auth_layout login_screen auth-unikaksha">
        <LeftBox />
        <div className="right_box">
          <div className="right_box_container right_box_infostudents">
            <div className="log-in-title login-head">
              {/* <img className="me-2" onClick={() => navigate(-1)} src={arrowBack} alt="back-arrow" /> */}
              Let's get to know you a little better!
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
                              <FormLabel>
                                Your occupation <MandatorySymbol />
                              </FormLabel>
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
                                  defaultChecked={formik.values.occupation}
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
                          {/* <FormSelectField
                            name="collegeName"
                            controlId="collegeName"
                            as={Col}
                            className="form-group-1 mb-3 mt-3"
                            label={
                              <>
                                <span>Enter college name</span>
                                <MandatorySymbol />
                              </>
                            }
                            type="text"
                            md="12"
                            error={formik?.errors?.collegeName}
                            touched={formik?.touched?.collegeName}>
                            <option value="">Select a college</option>
                            {collegeList.map((col) => {
                              return <option value={col.value}>{col.label}</option>;
                            })}
                          </FormSelectField> */}

                          <label className="form-label">
                            Enter college name <span class="text-danger">*</span>
                          </label>
                          <CreatableSelect
                            isClearable
                            name="collegeName"
                            onChange={(newValue) => {
                              formik.setFieldValue('collegeName', newValue?.value || null);
                              setcolVal(newValue);
                            }}
                            onCreateOption={(e) => handleCreate(e, formik)}
                            options={collegeList}
                            value={colVal}
                          />
                          <br />
                          {formik?.errors?.collegeName && formik?.touched?.collegeName ? (
                            <div className="error-text">{formik?.errors?.collegeName}</div>
                          ) : null}

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
                                  <FormLabel>
                                    Your month & year of graduation <MandatorySymbol />
                                  </FormLabel>
                                  <DatePickerField
                                    name="graduationMonth"
                                    maxDetail="year"
                                    minDate={new Date('2012-03')}
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
                            label={
                              <>
                                <span>Your current working position</span>
                                <MandatorySymbol />
                              </>
                            }
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
                                  <FormLabel>
                                    Total technical experience in years <MandatorySymbol />
                                  </FormLabel>
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
                                  <FormLabel>Ogranization you are working in <MandatorySymbol /></FormLabel>
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
                              <FormLabel>
                                Your birth year <MandatorySymbol />
                              </FormLabel>
                              <br />

                              <DatePickerField
                                name="birthYear"
                                className="form-group-1 mb-3"
                                maxDetail="decade"
                                minDate={new Date('01/01/1950')}
                                maxDate={new Date()}
                              />
                            </FormGroup>
                          </Row>
                        )}
                      />
                      {formik?.errors?.birthYear && formik?.touched?.birthYear ? (
                        <div className="error-text">{formik?.errors?.birthYear}</div>
                      ) : null}

                      {formik.values.occupation === 'STUDENT' || (
                        <>
                          <Field
                            name="referalCode"
                            render={({ field, formProps }) => (
                              <Row className="mb-0">
                                <FormGroup
                                  controlId="referalCode"
                                  className="form-group-1 mb-3"
                                  as={Col}
                                  md="12">
                                  <FormLabel style={{ marginBottom: 'unset' }}>
                                    Do you have any referral code?
                                  </FormLabel>
                                  <FormLabel className="formlabel-helper">
                                    Enter referral code recieved from your Friend.
                                  </FormLabel>
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
                        </>
                      )}

                      <Field
                        name="organizationCode"
                        render={({ field, formProps }) => (
                          <Row className="mb-0">
                            <FormGroup
                              controlId="organizationCode"
                              className="form-group-1 mb-3"
                              as={Col}
                              md="12">
                              <FormLabel style={{ marginBottom: 'unset' }}>
                                Do you have any Organization code?
                              </FormLabel>
                              {/* <FormLabel className="formlabel-helper">
                                Enter referral code recieved from your Institute.
                              </FormLabel> */}
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

                      <div className="d-grid gap-2 my-3">
                        <Button
                          type="submit"
                          variant="secondary"
                          disabled={!formik.isValid || loading}>
                          {loading ? 'Loading...' : 'Get Started'}
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
