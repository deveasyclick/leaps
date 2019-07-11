import React from 'react';
import './button.scss';


export default function Button(props) {
  const { children } = props;
  return (
    <button type="button" {...props}>
      {children}
    </button>
  );
}
