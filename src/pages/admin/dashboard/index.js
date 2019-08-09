import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import { FiClock } from 'react-icons/fi';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import ReactTable from 'react-table';
import Image from '../../../assets/images/favicon.png';
import 'react-table/react-table.css';

class AdminDashboard extends Component {
  render() {
    const data = [{
      name: 'Tanner Linsley',
      age: 26,
      friend: {
        name: 'Jason Maurer',
        age: 23,
      },
    }];

    const columns = [{
      Header: 'Name',
      accessor: 'name', // String-based value accessors!
    }, {
      Header: 'Age',
      accessor: 'age',
      Cell: props => <span className="number">{props.value}</span>, // Custom cell components!
    }, {
      id: 'friendName', // Required because our accessor is not a string
      Header: 'Friend Name',
      accessor: d => d.friend.name, // Custom value accessors!
    }, {
      Header: props => <span>Friend Age</span>, // Custom header components!
      accessor: 'friend.age',
    }];
    return (
      <section className="container Admin">
        <div className="row btn-row">
          <button className="btn" type="button">United Kingdom</button>
          <button className="btn" type="button">Nigeria</button>
          <button className="btn" type="button">Kenya</button>
          <button className="btn" type="button">Malawi</button>
          <button className="btn" type="button">Ethiopia</button>
        </div>
        <div className="row">
          <h3 className="researchers-title">
            Researchers
          </h3>
        </div>
        <div className="row cards-row">
          <div className="researcher card">
            <div className="details-wrapper d-flex justify-content-between">
              <div className="details">
                <p className="name">Researchers name</p>
                <p className="uploads">4000 Uploads</p>
              </div>
              <div className="image">
                <img src={Image} alt="" width="100%" className="img" />
              </div>
            </div>
            <div className="stats d-flex">
              <p className="pending d-flex align-items-center">
                <FiClock size={18} className="pending-icon" />
                19 pending
              </p>
              <p className="approved">
                <IoMdCheckmarkCircle size={18} className="approved-icon" />
                11 approved
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <h3 className="teachers-title">
            Teachers
          </h3>
        </div>

        <div className="teachers-row">
          <ReactTable defaultPageSize={10} minRows={10} data={data} columns={columns} />
        </div>
      </section>
    );
  }
}


const mapPropsToState = state => ({});
const mapPropsToDispatch = dispatch => ({});
export default connect(mapPropsToState, mapPropsToDispatch)(AdminDashboard);
