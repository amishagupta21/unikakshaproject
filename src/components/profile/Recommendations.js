import React from 'react';
import editIcon from '../../assets/images/edit-gray.svg';
import ProfilePic from '../../assets/images/profile-picture.png';
import iconplus from '../../assets/images/icon-plus.svg';

const Recommendations = () => {
  return (
    <div className=" about-container py-3 mt-3 about-recommendations">
      <h5 className="mb-4">Recommendations</h5>
      <img src={iconplus} className="edit-add" />
      <div className="project-list">
        <ul>
          <li>
            <div className="top-recommendations-container">
              <div className="top-recommendations-media">
                <div className="left-media">
                  <img src={ProfilePic} alt="profile picture" />
                </div>
                <div className="right-content">
                  <h5>Rohini Mishra</h5>
                  <h6>Sr. Lead at ABC Tech</h6>
                  <small>Recommended at Jan 29, 2021</small>
                </div>
              </div>{' '}
            </div>
            <div className="top-discription-text">
              <p>
                It is a long established fact that a reader will be distracted by the readable
                content of a page when looking at its layout. The point of using Lorem Ipsum is that
                it has a more-or-less normal <a href="">Read more</a>{' '}
              </p>
            </div>
            <img src={editIcon} className="edit-icons" />
          </li>
          <li>
            <div className="top-recommendations-container">
              <div className="top-recommendations-media">
                <div className="left-media">
                  <img src={ProfilePic} alt="profile picture" />
                </div>
                <div className="right-content">
                  <h5>Manoj Patel</h5>
                  <h6>Teacher at Unikaksha</h6>
                  <small>Recommended at July 15, 2021</small>
                </div>
              </div>{' '}
            </div>
            <div className="top-discription-text">
              <p>
                distribution of letters, as opposed toIt is a long established fact that a reader
                will be distracted by the readable content of a page when looking at its layout. The
                point of using Lorem Ipsum is that it has a more-or-less normal distribution of
                letters, as opposed to <a href="">Read more</a>{' '}
              </p>
            </div>
            <img src={editIcon} className="edit-icons" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Recommendations;
