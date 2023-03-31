import { Button, ButtonGroup, Col, Container, Form, Row, ToggleButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { workingRemote } from '../../../../assets/images';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ApiService from '../../../../services/ApiService';
import React, { useEffect } from 'react';
import lodash from 'lodash';
import { studentYearsOptions, studentDiplomaYearsOptions } from '../../../../utils-componets/static-content/DateMonthContent';
import { getWorkingPosition } from '../../../../services/ReuseableFun';
import { useDispatch } from 'react-redux';
import { openToaster } from '../../../../redux/actions/ToastAction';

const highestQualificationOption = [
  { value: '', label: 'Please select' },
  {
    value: 'Diploma_or_12th',
    label: '12th / Diploma Graduate',
    yesNoLabel: '12th / Diploma graduated?',
  },
  {
    value: 'UG',
    label: 'UG / Bachelors degree Completed',
    yesNoLabel: 'UG / Bachelors degree completed?',
  },
  { value: 'PG', label: 'PG Graduated', yesNoLabel: 'PG Completed?' },
];

const yearOfStudyingOption = [
  { value: '', label: 'Please select' },
  {
    value: 'First_year',
    label: '1st Year',
    yesNoLabel: '1st Year?',
  },
  {
    value: 'Second_year',
    label: '2nd Year',
    yesNoLabel: '2nd Year?',
  },
  {
    value: 'Pre_Final',
    label: 'Pre Final Year',
    yesNoLabel: 'Pre Final Year?',
  },
  {
    value: 'Final_Year',
    label: 'Final Year',
    yesNoLabel: 'Final Year?',
  }
  

 
];

const staticContents = {
  notEligible: `Sorry, You're not eligible at the moment!`,
};

// eslint-disable-next-line react/prop-types
const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 2,
    }}
  />
);

const EducationDetails = ({
  nextPage,
  course,
  user,
  educationalDetails,
  setEducationalDetails,
}) => {
  const [graduatedYesOrNo, setGraduatedYesOrNo] = React.useState('nill');
  const [yesOrNoLabel, setYesOrNoLabel] = React.useState('');
  const [highestQualification, setHighestQualification] = React.useState('');
  const [is_enrolled_other_program, setis_enrolled_other_program] = React.useState('no');
  const [workingPositionList, setworkingPositionList] = React.useState('');
  const [isNextLoading, setIsNextLoading] = React.useState(false);

  // const [yearOfStudyingOption, setYearOfStudyingOption] = React.useState('');
  const [yearOfStudying, setyearOfStudying] = React.useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const yesNo = [
    { name: 'Yes', value: 'yes' },
    { name: 'No', value: 'no' },
  ];

  useEffect(() => {
    setInitialData();
  }, []);

  const returnToDashboard = () => {
    navigate('/dashboard');
  };

  const onQualificationChange = (value) => {
    const option = yearOfStudyingOption.filter((e) => e.value === value.target.value);
    setYesOrNoLabel(option[0].yesNoLabel);
    setyearOfStudying(option[0].value);
    setGraduatedYesOrNo('yes');
  };

  const onYearOfStudyingChange = (value) => {
    
    const option = yearOfStudyingOption.filter((e) => e.value === value.target.value);
    // setYesOrNoLabel(option[0].yesNoLabel);
    setyearOfStudying(option[0].value);
    
    setHighestQualification(option[0].value);
   
    setGraduatedYesOrNo('no');
  };
  
  const setInitialData = async () => {

    setworkingPositionList(await getWorkingPosition());

    let formData = {};

    let educationData = educationalDetails.education_details;


    if (educationData) {

      setyearOfStudying(educationData.highest_qualification);
      setHighestQualification(educationData.highest_qualification);
      if ( educationData.is_enrolled_other_program) {
        setis_enrolled_other_program('yes');
      }

      const option = highestQualificationOption.filter(
        (e) => e.value === educationData.highest_qualification
      );

      setYesOrNoLabel(option[0]?.yesNoLabel);
      
      setGraduatedYesOrNo(
        educationData.qualification[educationData.qualification.length - 1]?.passing_marks
          ? 'yes'
          : 'no'
      );
      formData.is_enrolled_other_program = educationData.is_enrolled_other_program;
      formData.other_program_name = educationData.other_program_name ?? '';
      formData.other_program_college_name = educationData.other_program_college_name ?? '';
      formData.other_program_course_duration = educationData.other_program_course_duration ?? '';
      lodash.forEach(educationData.qualification, (each) => {
        if (each.level === 'Diploma_or_12th') {
          formData.schoolDiplomaCollegeName = each.college_name;
          formData.schoolYearOfCompletion = each.year_of_completion;
          formData.schoolMarks = each.passing_marks;
        }
        if (each.level === 'UG') {
          formData.ugCollegeName = each.college_name;
          formData.ugYOC = each.year_of_completion;
          formData.ugMarks = each.passing_marks;
        }
        if (each.level === 'PG') {
          formData.pgCollegeName = each.college_name;
          formData.pgYOC = each.year_of_completion;
          formData.pgMarks = each.passing_marks;
        }
      });
    }
    if (educationalDetails.work_details.length) {
      formData.position = educationalDetails.work_details[0].position;
      formData.organization_name = educationalDetails.work_details[0].organization_name;
      formData.experience = educationalDetails.work_details[0].experience;
    }
    formik.setValues(formData);
  };

  const formik = useFormik({
    validationSchema: Yup.object().shape({
      schoolDiplomaCollegeName: Yup.string().required(),
      schoolYearOfCompletion: Yup.date().required(),
      schoolMarks: Yup.number().typeError('School marks should be numeric').required(),
      ugCollegeName: Yup.string(),
      ugYOC: Yup.date(),
      ugMarks: Yup.number().typeError('Marks should be numeric'),
      pgCollegeName: Yup.string(),
      pgYOC: Yup.date(),
      pgMarks: Yup.number().typeError('Marks should be numeric'),
      other_program_name: Yup.string(),
      other_program_college_name: Yup.string(),
      other_program_course_duration: Yup.string(),
      position: Yup.string(),
      experience: Yup.number(),
      organization_name: Yup.string(),
    }),
    validate: (values) => {
      let errors = {};
      if (!values.schoolDiplomaCollegeName) {
        errors.schoolDiplomaCollegeName = '*School Name is Required';
      }
      if (!values.schoolYearOfCompletion) {
        errors.schoolYearOfCompletion = '*12th/Diplomo completion year is required';
      }
      if (!values.schoolMarks) {
        errors.schoolMarks = '*12th/Diplomo Mark is required';
      }
      if (highestQualification === 'UG' || highestQualification === 'PG') {
        if (!values.ugCollegeName) {
          errors.ugCollegeName = '*College Name is Required';
        }
        if (!values.ugYOC) {
          errors.ugYOC = '*UG completion year is required';
        }
        if (
          (!values.ugMarks && highestQualification === 'PG') ||
          (!values.ugMarks && highestQualification === 'UG' && graduatedYesOrNo === 'yes')
        ) {
          errors.ugMarks = '*UG Mark is required';
        }
      }
      if (highestQualification === 'PG') {
        if (!values.pgCollegeName) {
          errors.pgCollegeName = '*College Name is Required';
        }
        if (!values.pgYOC) {
          errors.pgYOC = '*PG completion year is required';
        }
        if (!values.pgMarks && graduatedYesOrNo === 'yes') {
          errors.pgMarks = '*PG Mark is required';
        }
      }
     
      if (
        is_enrolled_other_program === 'yes' &&
        (highestQualification === 'First_year' || highestQualification === 'Second_year' || highestQualification === 'Pre_Final')
      ) {
        if (!values.other_program_name) {
          errors.other_program_name = '*School Name is Required';
        }
        if (!values.other_program_college_name) {
          errors.other_program_college_name = '*College Name is Required';
        }
        if (!values.other_program_course_duration) {
          errors.other_program_course_duration = 'Duration is required';
        }
      }
      return errors;
    },
    onSubmit: (values) => {
      let qualification = [
        {
          level: 'Diploma_or_12th',
          college_name: values.schoolDiplomaCollegeName,
          year_of_completion: values.schoolYearOfCompletion,
          passing_marks: values.schoolMarks,
        },
        {
          level: 'UG',
          college_name: 'Test',
          year_of_completion: '2023',
          passing_marks: 70,
        },
        {
          level: 'PG',
          college_name: values.pgCollegeName,
          year_of_completion: values.pgYOC,
          passing_marks: 0,
        },
      ];
      if (highestQualification === 'UG') {
        qualification = qualification.slice(0, 2);
      } else if (highestQualification === 'Diploma_or_12th') {
        qualification = qualification.slice(0, 1);
      }
      let workDetails = [
        {
          position: values.position,
          experience: values.experience,
          organization_name: values.organization_name,
        },
      ];
      const payload = {
        education_details: {
          highest_qualification: highestQualification,
          qualification: qualification,
          is_enrolled_other_program: is_enrolled_other_program === 'yes' ? true : false,
        },
        work_details: workDetails,
        uid: user?.uid,
        course_id: course?.id,
      };
      if (is_enrolled_other_program === 'yes') {
        payload.education_details.other_program_name = values.other_program_name;
        payload.education_details.other_program_college_name = values.other_program_college_name;
        payload.education_details.other_program_course_duration =
          values.other_program_course_duration;
      }
      setIsNextLoading(true);
      submitEducationalDetails(payload);
    },
  });

  const submitEducationalDetails = async (payload) => {
    const response = await ApiService('/student/educational-details', `PUT`, payload, true);
    setIsNextLoading(false);
    if (response?.data.code === 200) {
      dispatch(
        openToaster({
          show: true,
          header: 'Success!',
          variant: 'info',
          body: 'Educational details was saved successfully!',
        })
      );
      setEducationalDetails(payload);
      nextPage();
    }
  };

  return (
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <>
          <Row className="d-flex flex-column">
            <p className="stepper-sub-header">Educational Details</p>
          </Row>
          <Row className="mb-5">
            <Form.Group as={Col} md={4} controlId="qualification">
              <Form.Label>
              Year you are studying in?
                <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                className="form-control"
                aria-label="highest-qualification"
                onChange={(value) => onYearOfStudyingChange(value)}
                placeholder="Please select"
                name="qualification"
                value={yearOfStudying}>
                {yearOfStudyingOption.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
                ;
              </Form.Select>
            </Form.Group>
            
          </Row>
          {yearOfStudying === 'Final_Year' && (
            <>
               
                <Container className="d-flex flex-row justify-content-center">
                  <div>
                    <img style={{ maxWidth: 'max-content' }} src={workingRemote}></img>
                    <p className="not-eligible-msg">{staticContents.notEligible}</p>
                  </div>
                </Container>
              
            </>
          )}
          {yearOfStudying !== 'Final_Year' && yearOfStudying !== '' && (
            <>
              {graduatedYesOrNo === 'no' && highestQualification === 'Diploma_or_12th' && (
                <Container className="d-flex flex-row justify-content-center">
                  <div>
                    <img style={{ maxWidth: 'max-content' }} src={workingRemote}></img>
                    <p className="not-eligible-msg">{staticContents.notEligible}</p>
                  </div>
                </Container>
              )}
             
                
                  <Row className="d-flex mb-2 justify-content-center align-items-center">
                    <span className="sections">UG / Bachelors degree details</span>
                    <Col>
                      <ColoredLine color="grey" />
                    </Col>
                  </Row>

                  <Row className="mb-5">
                  <Col sm={4} >
                    <Form.Group as={Col} controlId="pgCollegeName">
                      <Form.Label>
                        UG / Bachelors College name*
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="PG college name"
                        name="pgCollegeName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                          formik.touched.pgCollegeName && formik.errors.pgCollegeName
                            ? 'is-invalid'
                            : null
                        }
                        value={formik.values?.pgCollegeName}
                      />
                      {formik.touched.pgCollegeName && formik.errors.pgCollegeName ? (
                        <div className="error-message">{formik.errors.pgCollegeName}</div>
                      ) : null}
                    </Form.Group>
</Col>
<Col sm={4} >
                    <Form.Group as={Col} controlId="pgYOC">
                      <Form.Label>
                      UG/Bachelors Year of completion*<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Select
                        name="pgYOC"
                        className={
                          formik.touched.pgYOC && formik.errors.pgYOC ? 'is-invalid' : null
                        }
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        defaultValue={formik.values?.pgYOC}>
                        <option value="">Select completion Year</option>
                        {studentYearsOptions.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                        ;
                      </Form.Select>
                      {formik.touched.pgYOC && formik.errors.pgYOC ? (
                        <div className="error-message">{formik.errors.pgYOC}</div>
                      ) : null}
                    </Form.Group>
                    </Col>
                    {highestQualification === 'PG' && graduatedYesOrNo === 'yes' && (
                      <>
                      <Col sm={4} >
                        <Form.Group as={Col} controlId="pgMarks">
                          <Form.Label>
                            PG passing marks
                            <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            name="pgMarks"
                            type="numeric"
                            placeholder="PG passing marks"
                            className={
                              formik.touched.pgMarks && formik.errors.pgMarks ? 'is-invalid' : null
                            }
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values?.pgMarks}
                          />
                          {formik.touched.pgMarks && formik.errors.pgMarks ? (
                            <div className="error-message">{formik.errors.pgMarks}</div>
                          ) : null}
                        </Form.Group> </Col>
                      </>
                    )}
                  </Row>
              
            
              
             
                  <Row className="d-flex mb-2 justify-content-center align-items-center">
                    <span className="sections">12th / Diploma Course Details</span>
                    <Col>
                      <ColoredLine color="grey" />
                    </Col>
                  </Row>

                  <Row className="mb-5 col-column-box">
                    <Form.Group as={Col} controlId="schoolDiplomaCollegeName">
                      <Form.Label>
                        12th / Diploma college name
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="schoolDiplomaCollegeName"
                        onChange={formik.handleChange}
                        className={
                          formik.touched.schoolDiplomaCollegeName &&
                          formik.errors.schoolDiplomaCollegeName
                            ? 'is-invalid'
                            : null
                        }
                        onBlur={formik.handleBlur}
                        value={formik.values?.schoolDiplomaCollegeName}
                        placeholder="12th school / diploma college name"
                      />
                      {formik.touched.schoolDiplomaCollegeName &&
                      formik.errors.schoolDiplomaCollegeName ? (
                        <div className="error-message">
                          {formik.errors.schoolDiplomaCollegeName}
                        </div>
                      ) : null}
                    </Form.Group>

                    <Form.Group as={Col} controlId="schoolYearOfCompletion">
                      <Form.Label>
                        12th / Diploma year of completion<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Select
                        name="schoolYearOfCompletion"
                        className={
                          formik.touched.schoolYearOfCompletion &&
                          formik.errors.schoolYearOfCompletion
                            ? 'is-invalid'
                            : null
                        }
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        defaultValue={formik.values?.schoolYearOfCompletion}>
                        <option value="">Select completion Year</option>
                        {studentDiplomaYearsOptions.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                        ;
                      </Form.Select>
                      {formik.touched.schoolYearOfCompletion &&
                      formik.errors.schoolYearOfCompletion ? (
                        <div className="error-message">{formik.errors.schoolYearOfCompletion}</div>
                      ) : null}
                    </Form.Group>

                    <Form.Group as={Col} controlId="schoolMarks">
                      <Form.Label>
                        12th / Diploma passing marks
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="12th or diploma marks"
                        name="schoolMarks"
                        onChange={formik.handleChange}
                        className={
                          formik.touched.schoolMarks && formik.errors.schoolMarks
                            ? 'is-invalid'
                            : null
                        }
                        onBlur={formik.handleBlur}
                        value={formik.values?.schoolMarks}
                      />
                      {formik.touched.schoolMarks && formik.errors.schoolMarks ? (
                        <div className="error-message">{formik.errors.schoolMarks}</div>
                      ) : null}
                    </Form.Group>
                  </Row>
                
              
                  <Row className="d-flex mb-2 justify-content-center align-items-center">
                    <span className="sections">Additional Course Details</span>
                    <Col>
                      <ColoredLine color="grey" />
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Form.Group as={Col} md={4} controlId="is_enrolled_other_program">
                      <Row>
                        <Form.Label>
                          Are you enrolled into any other program
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <ButtonGroup aria-label="select-button">
                          {yesNo.map((enrollOption, idx) => (
                            <ToggleButton
                              className="border border-secondary radio-buttons me-2"
                              key={idx}
                              style={{ maxWidth: '30%' }}
                              id={`enrollOption-${idx}`}
                              type="radio"
                              variant="outline-primary"
                              name="is_enrolled_other_program"
                              value={enrollOption.value}
                              checked={is_enrolled_other_program === enrollOption.value}
                              onChange={(e) => {
                                setis_enrolled_other_program(e.currentTarget.value);
                              }}>
                              <span className="options">{enrollOption.name}</span>
                            </ToggleButton>
                          ))}
                        </ButtonGroup>
                      </Row>
                    </Form.Group>
                  </Row>
                  {is_enrolled_other_program !== 'no' && (
                    <>
                      <Row className="mb-5">
                        <Form.Group as={Col} controlId="other_program_name">
                          <Form.Label>
                            Program Name
                            <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            name="other_program_name"
                            type="text"
                            placeholder="Program name"
                            onChange={formik.handleChange}
                            className={
                              formik.touched.other_program_name && formik.errors.other_program_name
                                ? 'is-invalid'
                                : null
                            }
                            onBlur={formik.handleBlur}
                            value={formik.values?.other_program_name}
                          />
                          {formik.touched.other_program_name && formik.errors.other_program_name ? (
                            <div className="error-message">{formik.errors.other_program_name}</div>
                          ) : null}
                        </Form.Group>

                        <Form.Group as={Col} controlId="other_program_college_name">
                          <Form.Label>
                            College/Insitute Name<span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="other_program_college_name"
                            placeholder="College name"
                            onChange={formik.handleChange}
                            className={
                              formik.touched.other_program_college_name &&
                              formik.errors.other_program_college_name
                                ? 'is-invalid'
                                : null
                            }
                            onBlur={formik.handleBlur}
                            value={formik.values?.other_program_college_name}
                          />
                          {formik.touched.other_program_college_name &&
                          formik.errors.other_program_college_name ? (
                            <div className="error-message">
                              {formik.errors.other_program_college_name}
                            </div>
                          ) : null}
                        </Form.Group>

                        <Form.Group as={Col} controlId="other_program_course_duration">
                          <Form.Label>
                            Duration in months
                            <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            name="other_program_course_duration"
                            type="text"
                            placeholder="Duration in months"
                            onChange={formik.handleChange}
                            className={
                              formik.touched.other_program_course_duration &&
                              formik.errors.other_program_course_duration
                                ? 'is-invalid'
                                : null
                            }
                            onBlur={formik.handleBlur}
                            value={formik.values?.other_program_course_duration}
                          />
                          {formik.touched.other_program_course_duration &&
                          formik.errors.other_program_course_duration ? (
                            <div className="error-message">
                              {formik.errors.other_program_course_duration}
                            </div>
                          ) : null}
                        </Form.Group>
                      </Row>
                    </>
                  )}
                  
               
            </>
          )}
           {yearOfStudying !== 'Final_Year' && yearOfStudying !== '' && (
            <Row className="d-flex justify-content-end my-btn-styles row">
            <Button
              className="btn btn-outline-secondary"
              variant="outline-secondary"
              type="button"
              onClick={returnToDashboard}>
              Cancel
            </Button>
            <Button
              className="btn"
              disabled={!(formik.isValid && formik.dirty) || isNextLoading}
              variant="secondary"
              type="submit">
              {isNextLoading ? 'Saving..' : 'Next'}
            </Button>
          </Row>
           )}
        </>
      </Form>
    </div>
  );
};

export default EducationDetails;
