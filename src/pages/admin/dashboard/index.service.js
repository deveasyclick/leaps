import React from 'react';
import { FiMoreVertical, FiClock } from 'react-icons/fi';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import styled from 'styled-components';

const Icon = styled.div`
  position: relative;
  .icon {
    cursor: pointer;
  }
  .caret {
    position: absolute;
    width: 0;
    height: 0;
    border-right: solid 10px transparent;
    border-left: solid 10px transparent;
    border-bottom: 10px solid white;
    top: -10px;
    left: 46px;
  }

  .approved-pending {
    position: absolute;
    list-style: none;
    background: white;
    padding: 0;
    border-radius: 10px;
    display: none;
    top: 2.2rem;
    left: 0;
    right: 0;
    width: 7rem;
    margin: auto;
    z-index: 100;

    .list {
      cursor: pointer;
      padding: 8px;

      &:hover {
        /*background: #e6e6e6;*/
        background: #6b59da;
        color: white;
      }
    }
  }
`;
export const columns = [
  {
    Header: 'Name',
    id: 'name',
    accessor: d => `${d.surname} ${d.firstname}`, // String-based value accessors!
    Cell: props => <span className="name cell">{props.value}</span>, // Custom cell components!
  },
  {
    Header: 'School',
    accessor: d => d.school_name,
    id: 'school',
    Cell: props => <span className="school cell">{props.value}</span>, // Custom cell components!
  },
  {
    Header: 'Status',
    accessor: d => d.isUserVerified,
    id: 'status',
    Cell: props => (
      <span className="status cell">
        {props.value ? (
          <IoMdCheckmarkCircle
            size={18}
            style={{ marginRight: '10px', color: '#1a581a' }}
          />
        ) : (
          <FiClock size={18} style={{ marginRight: '10px', color: 'red' }} />
        )}
        {props.value ? 'Approve' : 'Pending'}
      </span>
    ), // Custom cell components!
  },
  {
    Header: 'Actions',
    accessor: 'action',
    Cell: (props) => {
      console.log('props', props);
      const ref1 = React.createRef();
      const ref2 = React.createRef();
      return (
        <div className="actions cell">
          <Icon>
            <ul
              onMouseEnter={() => {
                ref1.current.style.display = 'block';
                ref2.current.style.display = 'block';
              }}
              onMouseLeave={() => {
                ref1.current.style.display = 'none';
                ref2.current.style.display = 'none';
              }}
              className="approved-pending"
              ref={ref2}
            >
              <div
                onMouseEnter={() => {
                  ref1.current.style.display = 'block';
                  ref2.current.style.display = 'block';
                }}
                onMouseLeave={() => {
                  // ref1.current.style.display = 'none';
                  // ref2.current.style.display = 'none';
                }}
                className="caret"
                ref={ref1}
              />
              <li className="list">Approve</li>
              <li className="list">Pending</li>
            </ul>
            <FiMoreVertical
              onMouseEnter={() => {
                ref1.current.style.display = 'block';
                ref2.current.style.display = 'block';
              }}
              onMouseLeave={() => {
                // ref1.current.style.display = 'none';
                // ref2.current.style.display = 'none';
              }}
              className="icon"
              size={28}
            />
          </Icon>
        </div>
      );
    }, // Custom cell components!
  },
];
