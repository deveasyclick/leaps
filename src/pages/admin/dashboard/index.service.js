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
    top: 25px;
    left: 6.3rem;
    /*display: none;*/
  }

  .approved-pending {
    position: absolute;
    list-style: none;
    background: white;
    padding: 15px;
    border-radius: 10px;
    /*display: none;*/
    top: 2.2rem;
    left: 0;
    right: 0;
    width: 7rem;
    margin: auto;
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
      let visibility = false;
      return (
        <div className="actions cell">
          <Icon>
            <div
              className="caret"
              style={{ display: visibility ? 'block' : 'none' }}
            />
            <ul
              className="approved-pending"
              style={{ display: visibility ? 'block' : 'none' }}
            >
              <li>Approve</li>
              <li>Pending</li>
            </ul>
            <FiMoreVertical
              onMouseEnter={() => {
                visibility = true;
              }}
              className="icon"
              size={18}
            />
          </Icon>
        </div>
      );
    }, // Custom cell components!
  },
];
