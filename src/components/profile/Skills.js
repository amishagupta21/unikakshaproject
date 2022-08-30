import React from 'react'
import editIcon from '../../assets/images/edit-gray.svg'
import iconplus from '../../assets/images/icon-plus.svg'
const Skills = () => {
    return (
        <div className='py-3  pe-4 about-container gray mt-3'>
           
                <h5>Skills</h5>
                <img src={iconplus}  className="edit-add"/>
                   
                <div className='project-list project-skill'>
                  <ul>
                      <li>
                          <div className="top-information">
                              <h4><span></span>Java Developer</h4>
                              </div>
                              <div className='top-skills'>
                                 <a href="">Java</a>
                                 <a href="">Git/Github</a>
                                 <a href="">CSS</a>
                                 <a href="">HTML</a>
                                 <a href="">Databases & Web Storage</a>
                                 <a href="">Spring Frameworks</a>
                              

                                 

                              </div>
                              <img src={editIcon}  className="edit-icons"/>
                      </li>
                    
                  </ul>
              </div>
               
        </div>
    )
}

export default Skills