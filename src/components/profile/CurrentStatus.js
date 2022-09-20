import { Form, Formik } from 'formik';
import React from 'react';
import FormikController from '../../Shared-Component-formik/FormikController';
import * as Yup from 'yup';
import SchemaList from '../../Shared-Component-formik/schema/SchemaList';

const CurrentStatus = () => {
  const options = [
    { value: 'Actively Looking for Job', label: 'Actively Looking for Job' },
    { value: 'Available for collabration', label: 'Available for collabration' },
    { value: 'Casualy looking opportunity', label: 'Casualy looking opportunity' }
  ];

  return (
    <div className="current-status">
      <Formik
        initialValues={{
          currentStatus: ''
        }}
        validationSchema={Yup.object({
          currentStatus: SchemaList[0].required('title is a required field')
        })}
        onSubmit={(values) => {
          console.log('values:::', values);
        }}>
        {(formik) => {
          return (
            <Form onSubmit={formik.handleSubmit} className="form" autoComplete="false">
              <div
                className="d-flex row me-n7 pe-7"
                id="kt_modal_add_user_scroll"
                data-kt-scroll="true"
                data-kt-scroll-activate="{default: false, lg: true}"
                data-kt-scroll-dependencies="#kt_modal_add_user_header"
                data-kt-scroll-wrappers="#kt_modal_add_user_scroll">
                <div className="col-12">
                  <div className="form-group">
                    <FormikController
                      control="react_select"
                      labelClassName="required fw-bold fs-6 mb-2"
                      name="currentStatus"
                      label="currentStatus"
                      isMulti={false}
                      className="form-control-solid mb-lg-0"
                      formik={formik}
                      options={options}
                      value={formik.values.currentStatus}
                      onChange={formik.handleChange}
                      error={formik.errors.currentStatus}
                    />
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CurrentStatus;
