import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import { FiClock } from 'react-icons/fi';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import Image from '../../../assets/icons/person.png';
import { fetchResearchers } from '../../../redux/dash/dash.action';
import dashActionTypes from '../../../redux/dash/dash.actionTypes';
import 'react-table/react-table.css';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      researchers: [],
      hideNav: false,
    };
    this.researcherClicked = this.researcherClicked.bind(this);
    this.resize = this.resize.bind(this);
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
  }

  researcherClicked(researcher) {
    this.props.history.push(`/researcher/${researcher.uid}`);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize.bind(this));
    const { getResearchers } = this.props;
    getResearchers();
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
    const { researchers } = this.state;

    return (
      <section className="container Admin">
        <div className="row">
          <div className="col">
            <h3 className="researchers-title">Content providers</h3>
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
      </section>
    );
  }
}

const mapPropsToState = states => ({
  dash: states.dash,
});
const mapPropsToDispatch = dispatch => ({
  getResearchers: () => dispatch(fetchResearchers()),
});
export default connect(mapPropsToState, mapPropsToDispatch)(AdminDashboard);
