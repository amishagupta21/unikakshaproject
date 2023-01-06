import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, ButtonGroup, Col, Container, Form, Row, ToggleButton } from 'react-bootstrap';

import { getWorkingPosition } from '../../services/ReuseableFun';

const workDetails = ({educationalDetails}) => {

    const [workingPositionList, setworkingPositionList] = React.useState([]);

    //  const educationalDetails = workInfo?.work_details;
 
    //  console.log(educationalDetails)

    useEffect(() => {
       
        setInitialData();
      }, []);

    const setInitialData = async () => {

        // console.log(await getWorkingPosition());
        setworkingPositionList(await getWorkingPosition());
        // console.log(workingPositionList);

        let formData = {};
       
        if (educationalDetails && educationalDetails?.work_details.length) {
          formData.position = educationalDetails.work_details[0].position;
          formData.organization_name = educationalDetails.work_details[0].organization_name;
          formData.experience = educationalDetails.work_details[0].experience;
        }
        formik.setValues(formData);
      
    }

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
          
        //   if (
        //     is_enrolled_other_program === 'yes' &&
        //     (highestQualification === 'UG' || highestQualification === 'PG')
        //   ) {
        //     if (!values.other_program_name) {
        //       errors.other_program_name = '*School Name is Required';
        //     }
        //     if (!values.other_program_college_name) {
        //       errors.other_program_college_name = '*College Name is Required';
        //     }
        //     if (!values.other_program_course_duration) {
        //       errors.other_program_course_duration = 'Duration is required';
        //     }
        //   }
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
              college_name: values.ugCollegeName,
              year_of_completion: values.ugYOC,
              passing_marks: values.ugMarks,
            },
            {
              level: 'PG',
              college_name: values.pgCollegeName,
              year_of_completion: values.pgYOC,
              passing_marks: values.pgMarks,
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
          setEducationalDetails(payload);
          nextPage();
        }
    };

    return (
        <>
            <div>
            <Row className="d-flex flex-column">
                    <p className="stepper-sub-header">Work Details</p>
                  </Row>
                  <Row className="mb-5">
                    <Form.Group as={Col} controlId="position">
                      <Form.Label>Your current working position</Form.Label>
                      <Form.Select
                        name="position"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        defaultValue={formik.values?.position}>
                        <option value="">Select your Position</option>
                        {workingPositionList.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                        ;
                      </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="experience">
                      <Form.Label>Total technical experience in years</Form.Label>
                      <Form.Control
                        name="experience"
                        type="text"
                        placeholder="Total technical experience"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values?.experience}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="currentOrganization">
                      <Form.Label>Organization you are working in</Form.Label>
                      <Form.Control
                        name="organization_name"
                        type="text"
                        placeholder="Current organization"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values?.organization_name}
                      />
                    </Form.Group>
                  </Row> 
                  
            </div>
        </>
    )
}

export default workDetails;