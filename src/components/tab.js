import React, { useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 6rem !important;
  padding: 0.4rem;
  background: none;
  border-radius: 0 !important;
  background: none;
  color: gray;
  position: relative;
  top: 2px;

  &.active {
    color: #7b68ee;
    border-bottom: solid 2px;
  }
  &:hover {
    background: none !important;
  }
`;
export default ({ tabs }) => {
  const [active, setActive] = useState(0);
  return (
    <div>
      {tabs.map((tab, index) => (
        <Button
          type="button"
          onClick={() => {
            setActive(index);
            tab.action();
          }}
          className={active === index ? 'active' : ''}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};
