import { Form, Formik } from 'formik';
import React from 'react';
import { Badge } from 'react-bootstrap';
import * as Yup from 'yup';
import editIcon from '../../assets/images/edit-gray.svg';
import iconplus from '../../assets/images/icon-plus.svg';
import FormikController from '../../Shared-Component-formik/FormikController';

const Skills = ({ skillList }) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const initialValues = {
        skills: '',
    };
    const validationSchema = Yup.object({
        // firstName: SchemaList[0].required("First name is a required field"),
    });
    // const addSkills = values => {
    // 	console.log('values Skill=>>', values);
    // };

    return (
        <div className='py-3  pe-4 about-container gray mt-3'>
            <h5>Skills</h5>
            <img src={iconplus} className='edit-add' />

            <div className='project-list project-skill'>
                <ul>
                    <li>
                        <div className='top-information'>
                            <h4>
                                <span></span>Java Developer
                            </h4>
                        </div>

                        <div>
                            {skillList?.map(skill => (
                                <Badge key={skill._id} bg='warning' text='dark'>
                                    {skill.skill}
                                </Badge>
                            ))}
                        </div>
                        {/* <div className='top-skills'>
                            <a href="">Java</a>
                            <a href="">Git/Github</a>
                            <a href="">CSS</a>
                            <a href="">HTML</a>
                            <a href="">Databases & Web Storage</a>
                            <a href="">Spring Frameworks</a>
                        </div> */}
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            // onSubmit={addSkills}
                        >
                            {formik => (
                                <Form
                                    onSubmit={formik.handleSubmit}
                                    className='form my-3'
                                    autoComplete='false'
                                >
                                    <div
                                        className='d-flex row me-n7 pe-7'
                                        id='kt_modal_add_user_scroll'
                                        data-kt-scroll='true'
                                        data-kt-scroll-activate='{default: false, lg: true}'
                                        data-kt-scroll-dependencies='#kt_modal_add_user_header'
                                        data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
                                    >
                                        <FormikController
                                            control='react_select'
                                            labelClassName='required fw-bold fs-6 mb-2'
                                            name='skills'
                                            isMulti={true}
                                            className='form-control-solid mb-lg-0'
                                            formik={formik}
                                            options={options}
                                            value={formik.values.skills}
                                            onChange={formik.handleChange}
                                            error={formik.errors.skills}
                                        />
                                    </div>
                                    <button className='btn btn-info' type='submit'>
                                        Save
                                    </button>
                                </Form>
                            )}
                        </Formik>
                        <img src={editIcon} className='edit-icons' />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Skills;
