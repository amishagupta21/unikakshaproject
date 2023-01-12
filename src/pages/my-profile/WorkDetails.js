import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, ButtonGroup, Col, Container, Form, Row, ToggleButton } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getWorkingPosition } from '../../services/ReuseableFun';
import ApiService from '../../services/ApiService';
import { setLoading } from '../../redux/actions/LoaderActions';
import { useDispatch } from 'react-redux';

const workDetails = ({educationalDetails}) => {

    const [workingPositionList, setworkingPositionList] = React.useState([]);
	const [isNextLoading, setIsNextLoading] = React.useState(false);
	const [workData, setWorkDetails] = React.useState({});
	const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));

    //  const educationalDetails = workInfo?.work_details;

	// console.log(educationalDetails);
 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
		dispatch(setLoading(true));
       
        setInitialData();

		dispatch(setLoading(false));
      }, [educationalDetails]);

    const setInitialData = async () => {

        // console.log(await getWorkingPosition());
        setworkingPositionList(await getWorkingPosition());
        // console.log(educationalDetails?.work_details);

        let formData = {};
       
        if (educationalDetails && educationalDetails?.work_details.length) {
			console.log(educationalDetails?.work_details[0]?.position);
			formData.position = educationalDetails.work_details[0]?.position;
			formData.organization_name = educationalDetails.work_details[0]?.organization_name;
			formData.experience = educationalDetails.work_details[0]?.experience;
        }
        console.log(formData);
        formik.setValues(formData);
		
      
    }

    const returnToDashboard = () => {
      navigate('/dashboard');
  };

    const formik = useFormik({
        initialValues: {
          position: '',
          experience: '',
          organization_name: '',
        },
        validationSchema: Yup.object().shape({
          
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
         
          
          const payload = {
			uid : user?.uid,
			"work_details": [{
				position: values.position,
              	experience: values.experience,
              	organization_name: values.organization_name,
				
			}]
		}
          
		dispatch(setLoading(true));
          setIsNextLoading(true);

          submitWorkDetails(payload);
        },
      });
    
    const submitWorkDetails = async (payload) => {
		console.log(payload);
        const response = await ApiService('student/update-work-details', `PATCH`, payload, true);
        setIsNextLoading(false);
		dispatch(setLoading(false));
        if (response?.data.code === 200) {
			setWorkDetails(payload);
         
        }
    };

	// console.log(formik.values)

    return (
        <>
            <div>
				
				<Form onSubmit={formik.handleSubmit}>
				
					
					<Row className="mb-5">
					<Form.Group as={Col} controlId="position">
                      <Form.Label>Your current working position</Form.Label>
                      <Form.Select
                        name="position"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
						value={formik.values?.position}
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
					<Row className="d-flex justify-content-end">
						<Button
						className="col-1 me-2 btn btn-outline-secondary"
						variant="outline-secondary"
						type="button"
            onClick={returnToDashboard}>
						Cancel
						</Button>
						<Button
						className="col-1"
						disabled={(!formik.isValid && !formik.dirty) || isNextLoading}
						variant="secondary"
						type="submit">
						{isNextLoading ? 'Saving..' : 'Save'}
						</Button>
					</Row>
				</Form>
            </div>
        </>
    )
}

export default workDetails;