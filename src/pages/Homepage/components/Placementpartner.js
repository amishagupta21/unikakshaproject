import React from 'react';

const Placementpartner = ({ placementPartner }) => {
  return (
    <>
      <div className="d-flex justify-content-between">
        <div>
          <h6>Our Placement Partners</h6>
        </div>
        <div>see all</div>
      </div>
      <div className="d-flex justify-content-start my-4 flex-wrap">
        {placementPartner?.items &&
          placementPartner?.items.map((e) => (
            <div key={e} className="placement-image-wrapper">
              <img className="placement-image" src={e} alt={`placement partner image ${e}`} />
            </div>
          ))}
        {placementPartner?.items &&
          placementPartner?.items.map((e) => (
            <div key={e} className="placement-image-wrapper">
              <img className="placement-image" src={e} alt={`placement partner image ${e}`} />
            </div>
          ))}
        {placementPartner?.items &&
          placementPartner?.items.map((e) => (
            <div key={e} className="placement-image-wrapper">
              <img className="placement-image" src={e} alt={`placement partner image ${e}`} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Placementpartner;
