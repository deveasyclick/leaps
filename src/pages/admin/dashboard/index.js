import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import { FiClock, FiCheck } from 'react-icons/fi';
import { IoMdCheckmarkCircle, IoMdArrowDropdown } from 'react-icons/io';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import Image from '../../../assets/images/favicon.png';
import {
  fetchResearchers,
  fetchTeachers,
} from '../../../redux/dash/dash.action';
import dashActionTypes from '../../../redux/dash/dash.actionTypes';
import 'react-table/react-table.css';
import { columns } from './index.service';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeContent: 'texts',
      activeCountry: 'UK',
      researchers: [],
      teachers: [],
    };
    this.handleResourceBtnClick = this.handleResourceBtnClick.bind(this);
    this.handleCountryBtnClick = this.handleCountryBtnClick.bind(this);
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

  handleCountryBtnClick(type) {
    let activeCountry = 'UK';
    switch (type) {
      case 'UK':
        activeCountry = 'UK';
        break;
      case 'NG':
        activeCountry = 'NG';
        break;
      case 'KE':
        activeCountry = 'KE';
        break;
      case 'MA':
        activeCountry = 'MA';
        break;
      default:
        activeCountry = 'ET';
    }
    this.setState({ activeCountry });
  }

  componentDidMount() {
    const { getResearchers, getTeachers } = this.props;
    getResearchers();
    getTeachers();
  }

  render() {
    const resources = {
      texts: [
        {
          definition: 'ashuihuidh',
          excerpt: 'sauh usdjaiu',
          heading: 'jkahkha skj',
          isPending: false,
          path: 'texts/RWjGc4qQPnl6c2fURSlT',
          subject: 'health education',
          tags: [],
          topic: 'man was created ',
          user_country: 'Nigeria',
          user_email: 'easyclick05@gmail.com',
          user_id: 'fJhHZhsUyac28uQ5Ip2Qs2bSfaZ2',
          user_name: 'Adeniyi Yusuf Olasunkanmi',
        },
      ],
      pdfs: [],
      images: [],
      videos: [],
    };
    const data = [
      {
        name: 'Tanner Linsley',
        school: 'School of ..',
        status: 'approved',
        action: 'hello',
      },
    ];

    const {
 activeContent, activeCountry, researchers, teachers 
} = this.state;
    return (
      <React.Fragment>
        <section className="container Admin">
          <div className="row btn-row">
            <div className="col-md-10 col-12 offset-0 d-flex btn-wrapper offset-md-1">
              <button
                className={`text-btn btn ${
                  activeCountry === 'UK' ? 'active' : ''
                }`}
                onClick={() => this.handleCountryBtnClick('UK')}
                type="button"
              >
                {activeCountry === 'UK' ? <FiCheck className="check" /> : ''}
                United Kingdom
              </button>
              <button
                type="button"
                className={`text-btn btn ${
                  activeCountry === 'NG' ? 'active' : ''
                }`}
                onClick={() => this.handleCountryBtnClick('NG')}
              >
                {activeCountry === 'NG' ? <FiCheck className="check" /> : ''}
                Nigeria
              </button>
              <button
                type="button"
                className={`text-btn btn ${
                  activeCountry === 'KE' ? 'active' : ''
                }`}
                onClick={() => this.handleCountryBtnClick('KE')}
              >
                {activeCountry === 'KE' ? <FiCheck className="check" /> : ''}
                Kenya
              </button>
              <button
                className={`text-btn btn ${
                  activeCountry === 'MA' ? 'active' : ''
                }`}
                onClick={() => this.handleCountryBtnClick('MA')}
                type="button"
              >
                {activeCountry === 'MA' ? <FiCheck className="check" /> : ''}
                Malawi
              </button>
              <button
                type="button"
                className={`text-btn btn ${
                  activeCountry === 'ET' ? 'active' : ''
                }`}
                onClick={() => this.handleCountryBtnClick('ET')}
              >
                {activeContent === 'ET' ? <FiCheck className="check" /> : ''}
                Ethiopia
              </button>
            </div>
          </div>
          <div className="row">
            <h3 className="researchers-title">Researchers</h3>
          </div>
          <div className="row cards-row">
            {researchers.map(researcher => (
              <div className="col-4">
                <Link
                  style={{ color: 'inherit' }}
                  to={`/researchers/${researcher.uid}`}
                >
                  <div className="researcher card">
                    <div className="details-wrapper d-flex justify-content-between">
                      <div className="details">
                        <p className="name">{researcher.name}</p>
                        <p className="uploads">
                          <span className="uploads-count">
                            {researcher.uploads}
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
                          {researcher.pending}
                        </span>
                        pending
                      </p>
                      <p className="approved">
                        <IoMdCheckmarkCircle
                          size={18}
                          className="approved-icon"
                        />
                        <span className="pending-count">
                          {researcher.approved}
                        </span>
                        approved
                      </p>
                    </div>
                  </div>
                </Link>
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
                  <p>
                    <span>4000</span>
                    <span>total</span>
                  </p>
                </div>
                <div className="col-6 right-col">
                  <span>sort by:</span>
                  <span className="icon-wrapper">
                    <IoMdArrowDropdown size={25} />
                  </span>
                  <button type="button" className="btn">
                    Add new
                  </button>
                </div>
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
      </React.Fragment>
    );
  }
}

const mapPropsToState = states => ({
  dash: states.dash,
});
const mapPropsToDispatch = dispatch => ({
  getResearchers: () => dispatch(fetchResearchers()),
  getTeachers: () => dispatch(fetchTeachers()),
});
export default connect(
  mapPropsToState,
  mapPropsToDispatch,
)(AdminDashboard);
