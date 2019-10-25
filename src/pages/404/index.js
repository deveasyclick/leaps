import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFoundImg from '../../assets/images/404.png';

import './index.scss';

export default function () {
  return (
    <div
      className="Pagenotfound"
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <img src={PageNotFoundImg} alt="Page not found" />
      <p style={{ textAlign: 'center' }}>
        <Link to="/">Go to Home </Link>
      </p>
    </div>
  );
}
