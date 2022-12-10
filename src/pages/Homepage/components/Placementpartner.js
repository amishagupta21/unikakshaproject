import React from 'react';

const Placementpartner = ({ placementPartner }) => {
  return (
    <>
      <div className="d-flex justify-content-between">
        <h5>Our Placement Partners</h5>
        {/* <div>see all</div> */}
      </div>
      <div className="partner-list">
        <ul>
          {placementPartner?.items &&
            placementPartner?.items.map((partner, index) => (
              <li key={index + partner}>
                <img
                  className="placement-image"
                  src={partner}
                  alt={`placement partner image ${partner}`}
                />
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Placementpartner;
