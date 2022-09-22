import { Form, Formik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getuserProfile } from '../../../../redux/actions/UserActions';
import { toast } from 'react-toastify';
import { setLoading } from '../../../../redux/actions/LoaderActions';
import CreatableSelect from 'react-select/creatable';
import { addUserSkills, createSkill, getSkills } from '../../../../redux/actions/ProfileActions';

const SkillsModal = ({
  currentSkill,
  isShowSkillsModal,
  setIsShowSkillsModal,
}) => {
  const skillList = useSelector((state) => state.profile.skills);
  console.log('🚀 ~ skillList', skillList);
  const userId = JSON.parse(localStorage.getItem('user'))?.uid;
  const dispatch = useDispatch();

  const [value, setValue] = useState(currentSkill && currentSkill);
  const handleChange = useCallback((inputValue) => setValue(inputValue), []);
  console.log("currentSkill 88888",currentSkill,value);

  const handleCreate = useCallback((inputValue) => {
    dispatch(createSkill({ name: inputValue }));
    const newValue = { value: inputValue.toLowerCase(), label: inputValue };
    setValue((prev) => {
      let arr = [...(prev || {}), newValue];
      return arr;
    });
    dispatch(getSkills());
  }, []);

  useEffect(() => {
    dispatch(getSkills());
  }, [value]);

    const addUserSkillData = async () => {
        console.log("valuep 00000000",value);
		let filterData = value.map(e=>e._id)
		let finalData = {uid:userId, skill:filterData}
		  
		console.log("inside Api");
		 let res = await dispatch(addUserSkills(finalData))
		 console.log("final res------::",res);
    }

  return (
    <Modal
      size="lg"
      className="add-popup add-exp-modal"
      show={isShowSkillsModal}
      onHide={() => {
        setProjectCurrentInfo('');
        setIsShowSkillsModal(false);
      }}
      aria-labelledby="example-modal-sizes-title-lg">
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">Add Skill</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            skill: value ? value : '',
          }}
          validationSchema={Yup.object({
            // git: SchemaList[0].required('Git is a required field')
          })}>
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
                      <CreatableSelect
                        isClearable
                        isMulti={true}
                        value={currentSkill}
                        options={skillList}
                        onChange={handleChange}
                        onCreateOption={handleCreate}
                      />
                    </div>
                  </div>
                </div>
                <Modal.Footer>
                  <div className="row">
                    <div className="col-sm-6 col-padding-left" />
                    <div className="col-sm-6 col-padding-right">
                      <button
					  	onClick={()=>addUserSkillData()}
                        // type="submit"
                        className="btn btn-primary"
                        // disabled={formik.initialValues !== formik.values ? false : true}
                      >
                        SAVE
                      </button>
                    </div>
                  </div>
                </Modal.Footer>
              </Form>
            );
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default SkillsModal;
