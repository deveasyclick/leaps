import React from 'react';
import { Header } from '../components/header';

export default function DefaultLayout() {
  return (
    <React.Fragment>
      <Header />
      <div style={{ height: '100vh' }} className="Loading d-flex align-items-center justify-content-center">Loading</div>
    </React.Fragment>
  );
}
