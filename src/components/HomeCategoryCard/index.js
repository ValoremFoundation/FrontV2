import React from 'react';
import 'src/styles/components/HomeCategoryCard.scss';

const HomeCategoryCard = ({ image, description }) => {
  return (
    <div className="home-category-card">
      <div>
        <div className="d-flex justify-content-center align-items-center">
          <img alt="alt" src={image} />
        </div>
        <div className="home-category-text mt-4">{description}</div>
      </div>
    </div>
  );
};

export default HomeCategoryCard;
