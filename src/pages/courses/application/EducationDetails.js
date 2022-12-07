import { Button, ButtonGroup, Col, Container, Form, Row, ToggleButton } from 'react-bootstrap';
import { workingRemote } from '../../../assets/images';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';

const highestQualificationOption = [
  { value: '', label: 'Please select' },
  {
    value: '12th/diploma',
    label: '12th / Diploma Graduate',
    yesNoLabel: '12th / Diploma graduated?',
  },
  {
    value: 'ug',
    label: 'UG / Bachelors degree Completed',
    yesNoLabel: 'UG / Bachelors degree completed?',
  },
  { value: 'pg', label: 'PG Graduated', yesNoLabel: 'PG Completed?' },
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

const EducationDetails = ({ nextPage }) => {
  const [graduatedYesOrNo, setGraduatedYesOrNo] = React.useState('nill');
  const [yesOrNoLabel, setYesOrNoLabel] = React.useState('');
  const [highestQualification, setHighestQualification] = React.useState('');
  const [enrolledInProgram, setEnrolledInProgram] = React.useState('');
  const [formClear, setformClear] = React.useState(false)

  const onQualificationChange = (value) => {
    const option = highestQualificationOption.filter((e) => e.value === value.target.value);
    setYesOrNoLabel(option[0].yesNoLabel);
    setHighestQualification(option[0].value);
    setGraduatedYesOrNo('yes');
  };

  const formik = useFormik({
    initialValues: {schoolDiplomaCollegeName: '', schoolYearOfCompletion: '', schoolMarks: '' },
    validationSchema: Yup.object().shape({
    //   position: Yup.string().required('Name is required'),
    //   experience: Yup.string().required(),
    //   organization_name: Yup.string().required(),    
    //   is_enrolled_other_program: Yup.string().required(),
    //   other_program_name: Yup.string().required(),
    //   other_program_college_name: Yup.string().required(),
    //   other_program_course_duration: Yup.string().required(),
      schoolDiplomaCollegeName: Yup.string().required(),
      schoolYearOfCompletion: Yup.date().required(),
      schoolMarks: Yup.string().required(),
      ugCollegeName : Yup.string(),
      ugYOC: Yup.date(),
      ugMarks: Yup.string(),

    }),
    validate: (values) => {
        let errors = {};      
        if(highestQualification === '12th/diploma' ) {
            if (!values.schoolDiplomaCollegeName) {
                errors.schoolDiplomaCollegeName = '*School Name is Required';
            } else if (!values.schoolYearOfCompletion) {
                errors.schoolYearOfCompletion = '*12th/Diplomo completion year is required';
            } else if (!values.schoolMarks) {
                errors.schoolMarks = '*12th/Diplomo Mark is required';
            } else {
                setformClear(true)
            }
        }        
        if(highestQualification === 'ug') {        
            if (!values.ugCollegeName) {                
                errors.ugCollegeName = '*School Name is Required';
            } else if (!values.ugYOC) {
                errors.ugYOC = '*12th/Diplomo completion year is required';
            } else if (!values.ugMarks) {
                errors.ugMarks = '*12th/Diplomo Mark is required';
            } else {
                setformClear(true)
            }
        }
        return errors;
    },
    onSubmit: (values) => {
      console.log('Payload', values);
    },
  });

  const yesNo = [
    { name: 'Yes', value: 'yes' },
    { name: 'No', value: 'no' },
  ];

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
                What is your highest qualification?
                <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                className="form-control"
                aria-label="highest-qualification"
                onChange={(value) => onQualificationChange(value)}
                placeholder="Please select"
                name="qualification"
                onBlur={formik.handleBlur}
                value={formik.values.qualification}>                    
                {highestQualificationOption.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
                ;
              </Form.Select>
            </Form.Group>
            {highestQualification && (
              <Form.Group as={Col} md={3} controlId="yesOrNo">
                <Form.Label>
                  {yesOrNoLabel}
                  <span className="text-danger">*</span>
                </Form.Label>
                <Row>
                  <ButtonGroup aria-label="select-button">
                    {yesNo.map((option, idx) => (
                      <ToggleButton
                        className="border border-secondary radio-buttons me-2"
                        key={idx}
                        style={{ maxWidth: '30%' }}
                        id={`option-${idx}`}
                        type="radio"
                        variant="outline-primary"
                        name="yesOrNo"
                        value={option.value}
                        checked={graduatedYesOrNo === option.value}
                        onChange={(e) => {
                          setGraduatedYesOrNo(e.currentTarget.value);
                        }}>
                        <span className="options">{option.name}</span>
                      </ToggleButton>
                    ))}
                  </ButtonGroup>
                </Row>
              </Form.Group>
            )}
          </Row>
          {highestQualification && (
            <>
              {graduatedYesOrNo === 'no' && highestQualification === '12th/diploma' && (
                <Container className="d-flex flex-row justify-content-center">
                  <div>
                    <img style={{ maxWidth: 'max-content' }} src={workingRemote}></img>
                    <p className="not-eligible-msg">{staticContents.notEligible}</p>
                  </div>
                </Container>
              )}
              {highestQualification === 'pg' && (
                <>
                  <Row className="d-flex mb-2 justify-content-center align-items-center">
                    <span className="sections">PG Degree Details</span>
                    <Col>
                      <ColoredLine color="grey" />
                    </Col>
                  </Row>

                  <Row className="mb-5">
                    <Form.Group as={Col} controlId="pgCollegeName">
                      <Form.Label>
                        PG college name
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control type="text" placeholder="UG college name" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="pgYOC">
                      <Form.Label>
                        PG year of completion<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control type="date" name="pgYOC"></Form.Control>
                    </Form.Group>
                    {highestQualification === 'pg' && graduatedYesOrNo === 'yes' && (
                      <>
                        <Form.Group as={Col} controlId="pgMarks">
                          <Form.Label>
                            PG passing marks
                            <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control type="text" placeholder="PG passing marks" />
                        </Form.Group>
                      </>
                    )}
                  </Row>
                </>
              )}
              {(highestQualification === 'ug' || highestQualification === 'pg') && (
                <>
                  <Row className="d-flex mb-2 justify-content-center align-items-center">
                    <span className="sections">UG / Bachelors Degree Details</span>
                    <Col>
                      <ColoredLine color="grey" />
                    </Col>
                  </Row>

                  <Row className="mb-5">
                    <Form.Group as={Col} controlId="ugCollegeName">
                      <Form.Label>
                        UG college name
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control 
                      type="text" 
                      placeholder="UG college name"
                      name="ugCollegeName"
                      onChange={formik.handleChange}
                        className={
                            formik.touched.ugCollegeName &&
                            formik.errors.ugCollegeName
                            ? 'is-invalid'
                            : null
                        }
                        onBlur={formik.handleBlur}
                        value={formik.values.ugCollegeName}/>
                        {formik.touched.ugCollegeName && formik.errors.ugCollegeName ? (
                        <div className="error-message">{formik.errors.ugCollegeName}</div>
                      ) : null}
                    </Form.Group>

                    <Form.Group as={Col} controlId="ugYOC">
                      <Form.Label>
                        UG year of completion<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control 
                      type="date" 
                      name="ugYOC"
                      onChange={formik.handleChange}
                      className={
                          formik.touched.ugYOC &&
                          formik.errors.ugYOC
                          ? 'is-invalid'
                          : null
                      }
                      onBlur={formik.handleBlur}
                      value={formik.values.ugYOC}/>
                      {formik.touched.ugYOC && formik.errors.ugYOC ? (
                      <div className="error-message">{formik.errors.ugYOC}</div>
                    ) : null}
                    </Form.Group>
                    {(highestQualification === 'pg' ||
                      (highestQualification === 'ug' && graduatedYesOrNo === 'yes')) && (
                      <>
                        <Form.Group as={Col} controlId="ugMarks">
                          <Form.Label>
                            UG passing marks
                            <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control 
                            type="text" 
                            placeholder="UG passing marks" 
                            name="ugMarks"
                            onChange={formik.handleChange}
                            className={
                                formik.touched.ugMarks &&
                                formik.errors.ugMarks
                                ? 'is-invalid'
                                : null
                            }
                            onBlur={formik.handleBlur}
                            value={formik.values.ugMarks}/>
                            {formik.touched.ugMarks && formik.errors.ugMarks ? (
                            <div className="error-message">{formik.errors.ugMarks}</div>
                          ) : null}
                        </Form.Group>
                      </>
                    )}
                  </Row>
                </>
              )}
              {(highestQualification === 'ug' ||
                highestQualification === 'pg' ||
                (graduatedYesOrNo === 'yes' && highestQualification === '12th/diploma')) && (
                <>
                  <Row className="d-flex mb-2 justify-content-center align-items-center">
                    <span className="sections">12th / Diploma Course Details</span>
                    <Col>
                      <ColoredLine color="grey" />
                    </Col>
                  </Row>

                  <Row className="mb-5">
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
                        value={formik.values.schoolDiplomaCollegeName}
                        placeholder="12th school / diploma college name"
                      />
                      {formik.touched.schoolDiplomaCollegeName && formik.errors.schoolDiplomaCollegeName ? (
                        <div className="error-message">{formik.errors.schoolDiplomaCollegeName}</div>
                      ) : null}
                    </Form.Group>

                    <Form.Group as={Col} controlId="schoolYearOfCompletion">
                      <Form.Label>
                        12th / Diploma year of completion<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="schoolYearOfCompletion"
                        onChange={formik.handleChange}
                        className={
                          formik.touched.schoolYearOfCompletion &&
                          formik.errors.schoolYearOfCompletion
                            ? 'is-invalid'
                            : null
                        }
                        onBlur={formik.handleBlur}
                        value={formik.values.schoolYearOfCompletion}></Form.Control>
                        {formik.touched.schoolYearOfCompletion && formik.errors.schoolYearOfCompletion ? (
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
                        value={formik.values.schoolMarks}
                      />
                      {formik.touched.schoolMarks && formik.errors.schoolMarks ? (
                        <div className="error-message">{formik.errors.schoolMarks}</div>
                      ) : null}
                    </Form.Group>
                  </Row>
                </>
              )}
              {(highestQualification === 'ug' || highestQualification === 'pg') && (
                <>
                  <Row className="d-flex mb-2 justify-content-center align-items-center">
                    <span className="sections">Additional Course Details</span>
                    <Col>
                      <ColoredLine color="grey" />
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Form.Group as={Col} md={4} controlId="enrolledInProgram">
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
                              name="enrolledInProgram"
                              value={enrollOption.value}
                              checked={enrolledInProgram === enrollOption.value}
                              onChange={(e) => {
                                setEnrolledInProgram(e.currentTarget.value);
                              }}>
                              <span className="options">{enrollOption.name}</span>
                            </ToggleButton>
                          ))}
                        </ButtonGroup>
                      </Row>
                    </Form.Group>
                  </Row>
                  {enrolledInProgram !== 'no' && (
                    <>
                      <Row className="mb-5">
                        <Form.Group as={Col} controlId="programName">
                          <Form.Label>
                            Program Name
                            <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control name="programName" type="text" placeholder="Program name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="collegeName">
                          <Form.Label>
                            College/Insitute Name<span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control type="date" name="collegeName"></Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="programDuration">
                          <Form.Label>
                            Duration in months
                            <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            name="programDuration"
                            type="text"
                            placeholder="Duration in months"
                          />
                        </Form.Group>
                      </Row>
                    </>
                  )}
                  <Row className="d-flex flex-column">
                    <p className="stepper-sub-header">Work Details</p>
                  </Row>
                  <Row className="mb-5">
                    <Form.Group as={Col} controlId="currentPosition">
                      <Form.Label>
                        Your current working position
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Select
                        className="form-control"
                        aria-label="current-position"
                        onChange={(value) => onQualificationChange(value)}
                        placeholder="Please select">
                        <option>Please select</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="experience">
                      <Form.Label>
                        Total technical experience in years
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control type="text" placeholder="Total technical experience" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="currentOrganization">
                      <Form.Label>
                        Organization you are working in
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control type="text" placeholder="Current organization" />
                    </Form.Group>
                  </Row>
                </>
              )}
            </>
          )}
          <Row className="d-flex justify-content-end">
            <Button
              className="col-1 me-2 btn btn-outline-secondary"
              variant="outline-secondary"
              type="button">
              Cancel
            </Button>
            <Button className="col-1" disabled={(!formik.isValid && !formik.dirty) && !formClear} variant="secondary" type="submit">
              Next
            </Button>
          </Row>
        </>
      </Form>
    </div>
  );
};

export default EducationDetails;
