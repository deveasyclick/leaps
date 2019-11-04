import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import { FiClock, FiMoreVertical } from 'react-icons/fi';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import ReactTable from 'react-table';
import styled from 'styled-components';
import Image from '../../../assets/images/favicon.png';
import * as storage from '../../../helpers/token';
import {
  fetchResearchers,
  fetchTeachers,
  updateTeacherDetails,
} from '../../../redux/dash/dash.action';
import dashActionTypes from '../../../redux/dash/dash.actionTypes';
import 'react-table/react-table.css';

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
class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      researchers: [],
      teachers: [],
      hideNav: false,
    };
    this.handleResourceBtnClick = this.handleResourceBtnClick.bind(this);
    this.updateTeacherDetails = this.updateTeacherDetails.bind(this);
    this.researcherClicked = this.researcherClicked.bind(this);
    this.resize = this.resize.bind(this);
  }

  handleResourceBtnClick(type) {
    let activeContent = 'texts';
    switch (type) {
      case 'image':
        activeContent = 'image';
        break;
      case 'video':
        activeContent = 'video';
        break;
      case 'text':
        activeContent = 'texts';
        break;
      default:
        activeContent = 'pdf';
    }
    this.setState({ activeContent });
  }

  updateTeacherDetails(obj) {
    const { updateTeacherDetail } = this.props;
    updateTeacherDetail(obj);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.dash.type !== this.props.dash.type
      && this.props.dash.type === dashActionTypes.FETCH_RESEARCHERS_SUCCESS
    ) {
      this.setState({
        researchers: [...this.props.dash.data],
      });
    }

    if (
      prevProps.dash.type !== this.props.dash.type
      && this.props.dash.type === dashActionTypes.FETCH_TEACHERS_SUCCESS
    ) {
      this.setState({
        teachers: [...this.props.dash.data],
      });
    }
  }

  researcherClicked(researcher) {
    storage.set('researcher', JSON.stringify(researcher));
    this.props.history.push('/researcher');
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize.bind(this));
    const { getResearchers, getTeachers } = this.props;
    getResearchers();
    getTeachers();
    this.resize();
  }

  resize() {
    const currentHideNav = window.innerWidth <= 760;
    if (currentHideNav !== this.state.hideNav) {
      this.setState({ hideNav: currentHideNav });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  render() {
    const { researchers, teachers, hideNav } = this.state;

    const columns = [
      {
        Header: 'Name',
        id: 'name',
        accessor: d => (hideNav ? d.surname : `${d.surname} ${d.firstname}`), // String-based value accessors!
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
            {!hideNav && props.value && (
              <IoMdCheckmarkCircle
                size={18}
                style={{ marginRight: '10px', color: '#1a581a' }}
              />
            )}
            {!hideNav && !props.value && (
              <FiClock
                size={18}
                style={{ marginRight: '10px', color: 'red' }}
              />
            )}
            {props.value ? 'Approve' : 'Pending'}
          </span>
        ),
      },
      {
        Header: 'Actions',
        accessor: 'action',
        Cell: (props) => {
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
                  <li
                    className="list"
                    onClick={() => {
                      const obj = props.original;
                      obj.isUserVerified = true;
                      this.updateTeacherDetails(obj);
                    }}
                  >
                    Approve
                  </li>
                  <li
                    className="list"
                    onClick={() => {
                      const obj = props.original;
                      obj.isUserVerified = false;
                      this.updateTeacherDetails(obj);
                    }}
                  >
                    Pending
                  </li>
                </ul>
                <FiMoreVertical
                  onMouseEnter={() => {
                    ref1.current.style.display = 'block';
                    ref2.current.style.display = 'block';
                  }}
                  onMouseLeave={() => {
                    ref1.current.style.display = 'none';
                    ref2.current.style.display = 'none';
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

    return (
      <section className="container Admin">
        <div className="row">
          <div className="col">
            <h3 className="researchers-title">Researchers</h3>
          </div>
        </div>
        <div className="row cards-row">
          {researchers.map((researcher, index) => (
            <div
              className="col-12 col-md-6 col-sm-3 col-lg-4"
              key={index}
              onClick={() => this.researcherClicked(researcher)}
            >
              <div className="researcher card">
                <div className="details-wrapper d-flex justify-content-between">
                  <div className="details">
                    <p className="name">{researcher.name}</p>
                    <p className="uploads">
                      <span className="uploads-count">
                        {researcher.file_uploads}
                      </span>
                      Uploads
                    </p>
                  </div>
                  <div className="image">
                    <img
                      src={researcher.image || Image}
                      alt=""
                      width="100%"
                      className="img"
                    />
                  </div>
                </div>
                <div className="stats d-flex">
                  <p className="pending d-flex align-items-center">
                    <FiClock size={18} className="pending-icon" />
                    <span className="pending-count">
                      {researcher.file_pending}
                    </span>
                    pending
                  </p>
                  <p className="approved">
                    <IoMdCheckmarkCircle size={18} className="approved-icon" />
                    <span className="pending-count">
                      {researcher.file_approved}
                    </span>
                    approved
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row teachers-heading-row">
          <h3 className="teachers-title">Teachers</h3>
        </div>

        <div className="teachers-row row">
          <div className="col-12 pl-0">
            <div className="row">
              <div className="col-6 left-col">
                <div>
                  <span>{teachers.length}</span>
                  <span> Teachers</span>
                </div>
              </div>
              <div className="col-6 right-col" />
            </div>
          </div>
          <div className="col-12 pl-0">
            <ReactTable
              defaultPageSize={10}
              minRows={10}
              data={teachers}
              columns={columns}
              className="teachers-table -striped -highlight"
            />
          </div>
        </div>
      </section>
    );
  }
}

const mapPropsToState = states => ({
  dash: states.dash,
});
const mapPropsToDispatch = dispatch => ({
  getResearchers: () => dispatch(fetchResearchers()),
  getTeachers: () => dispatch(fetchTeachers()),
  updateTeacherDetail: obj => dispatch(updateTeacherDetails(obj)),
});
export default connect(
  mapPropsToState,
  mapPropsToDispatch,
)(AdminDashboard);
