import React from 'react';
import { Header } from './components/header/index';
import bouncingBall from '../assets/icons/Ball-1s-200px.svg';

export default function DefaultLayout() {
  return (
    <React.Fragment>
      <Header />
      <div style={{ height: '100vh' }} className="Loading d-flex align-items-center justify-content-center">
        <img src={bouncingBall} alt="Loading Icon" />
      </div>
    </React.Fragment>
  );
}
