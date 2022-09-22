import {Form, Formik} from 'formik'
import React from 'react'
import {Badge} from 'react-bootstrap'
import * as Yup from 'yup'
import editIcon from '../../assets/images/edit-gray.svg'
import iconplus from '../../assets/images/icon-plus.svg'
import FormikController from '../../Shared-Component-formik/FormikController'

const Skills = ({skillList, isShowSkillsModal, setIsShowSkillsModal}) => {
	console.log("sss",skillList);
  return (
    <div className="py-3  pe-4 about-container gray mt-3">
      <h5>Skills</h5>
	{  skillList ?
      <img src={editIcon} className="edit-icons" onClick={() => setIsShowSkillsModal(true)} />
    : <img src={iconplus} className="edit-add"  onClick={() => setIsShowSkillsModal(true)} />
	}
	  <div className="project-list project-skill">
            <div className="top-information mb-2">
              <h4>Java Developer</h4>
            </div>
            <div>
              {skillList?.map((skill) => (
                <Badge className='p-2 m-1'  key={skill._id} bg="warning" text="dark">
                  {skill?.skill}
                </Badge>
              ))}
            </div>
      </div>
    </div>
  )
}

export default Skills
