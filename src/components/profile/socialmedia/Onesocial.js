import React from 'react';

const Onesocial = ({ link, img }) => {
  return (
    <li>
      <a target="_blank" href={link}>
        <img src={img} />
      </a>
    </li>
  );
};
export default Onesocial;
