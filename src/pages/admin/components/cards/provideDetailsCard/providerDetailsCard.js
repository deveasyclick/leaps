import React from 'react';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { FiClock } from 'react-icons/fi';
import Image from '../../../../../assets/icons/person.png';
import './providerDetailCard.scss';

export default ({ researcher }) => (
  <div className="researcher provide-details-card">
    <div className="details-wrapper d-flex">
      <span className="card-image">
        <img
          src={researcher.image ? researcher.image : Image}
          className="image"
          alt="Researcher"
        />
      </span>
      <div className="details">
        <p className="name">{researcher.name}</p>
        <p className="approved-pending">
          <span className="icon">
            {researcher.approved ? (
              <IoMdCheckmarkCircle className="approved-icon" />
            ) : (
              <FiClock className="pending-icon" />
            )}
          </span>
          <span className="pending">
            {researcher.approved ? 'approved' : 'not approved'}
          </span>
        </p>
      </div>
    </div>
  </div>
);
