import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import { FiClock, FiMoreVertical, FiCheck } from 'react-icons/fi';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import Image from '../../../assets/images/favicon.png';
import { fetchResearcher } from '../../../redux/dash/dash.action';
import dashActionTypes from '../../../redux/dash/dash.actionTypes';
import 'react-table/react-table.css';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeContent: 'texts',
      activeCountry: 'UK',
      researcher: null,
      resources: {
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
      },
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
      && this.props.dash.type === dashActionTypes.FETCH_RESEARCHER_SUCCESS
    ) {
      this.setState({
        researcher: this.props.dash.data,
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
    const { getResearcher } = this.props;
    const { id } = this.props.match.params;
    if (!id) {
      window.location.pathname = '/researcher';
    } else {
      getResearcher(id);
    }
  }

  render() {
    const {
 activeContent, activeCountry, researcher, resources 
} = this.state;
    return (
      <React.Fragment>
        <section className="container Researcher">
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
          <div className="row cards-row">
            <div className="col-md-12 col-12 d-flex btn-wrapper">
              {researcher && (
                <div className="researcher card">
                  <div className="details-wrapper d-flex justify-content-between">
                    <span className="card-image">
                      <img src={Image} className="image" alt="Researcher" />
                    </span>
                    <div className="details">
                      <p className="name">{researcher.name}</p>
                      <p className="uploads">{researcher.country}</p>
                    </div>
                    <div className="icon">
                      <div className="caret" />
                      <ul className="caret-grid">
                        <li>approve</li>
                        <li>pending</li>
                      </ul>
                      <span className="icon-wrapper">
                        <FiMoreVertical size={20} />
                      </span>
                    </div>
                  </div>
                  <p className="uploads">
                    <span className="uploads-count">{researcher.uploads}</span>
                    Uploads
                  </p>
                  <div className="stats d-flex">
                    <p className="pending d-flex align-items-center">
                      <FiClock size={18} className="pending-icon" />
                      {researcher.pending}
                      pending
                    </p>
                    <p className="approved">
                      <IoMdCheckmarkCircle
                        size={18}
                        className="approved-icon"
                      />
                      {researcher.approved}
                      approved
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="row resources-btn-row">
            <div className="col-md-10 col-12 offset-0 d-flex btn-wrapper offset-md-1">
              <button
                type="button"
                className={`text-btn btn ${
                  activeContent === 'texts' ? 'active' : ''
                }`}
                onClick={() => this.handleResourceBtnClick('text')}
              >
                {activeContent === 'texts' ? <FiCheck className="check" /> : ''}
              </button>
              <button
                type="button"
                className={`pdf-btn btn ${
                  activeContent === 'pdf' ? 'active' : ''
                }`}
                onClick={() => this.handleResourceBtnClick('pdf')}
              >
                {activeContent === 'pdf' ? <FiCheck className="check" /> : ''}
                Pdfs
              </button>
              <button
                type="button"
                className={`image-btn btn ${
                  activeContent === 'image' ? 'active' : ''
                }`}
                onClick={() => this.handleResourceBtnClick('image')}
              >
                {activeContent === 'image' ? <FiCheck className="check" /> : ''}
                Images
              </button>
              <button
                type="button"
                className={`video-btn btn ${
                  activeContent === 'video' ? 'active' : ''
                }`}
                onClick={() => this.handleResourceBtnClick('video')}
              >
                {activeContent === 'video' ? <FiCheck className="check" /> : ''}
                Videos
              </button>
            </div>
          </div>
          <div className="row content-row">
            <div
              className={`col-12 text-content content ${
                activeContent === 'texts' ? 'show' : ''
              }`}
            >
              <div className="row">
                {resources.texts.length > 0
                  && resources.texts.map((resource, index) => (
                    <div key={index} className="col-md-3 col-12 col-sm-4">
                      <div className="text-resource resource-card">
                        <div className="card-title">
                          <h3>
                            {' '}
                            {resource.heading.slice(0, 22)}
                            {resource.heading.length > 22 ? (
                              <small className="ellipse">...</small>
                            ) : (
                              ''
                            )}
                          </h3>
                        </div>
                        <div className="card-body">
                          <p className="p">
                            {resource.definition.slice(0, 70)}
                            <span className="span">...</span>
                          </p>
                        </div>
                        <div className="card-subject">
                          <h4>
                            {resource.subject.slice(0, 27)}
                            {resource.subject.length > 22 ? (
                              <small className="ellipse">...</small>
                            ) : (
                              ''
                            )}
                          </h4>
                        </div>
                        <div className="card-topic">
                          <h4>
                            {resource.topic.slice(0, 27)}
                            {resource.topic.length > 22 ? (
                              <small className="ellipse">...</small>
                            ) : (
                              ''
                            )}
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div
              className={`col-12 pdf-content content ${
                activeContent === 'pdf' ? 'show' : ''
              }`}
            >
              <div className="row">
                {resources.pdfs.length > 0
                  && resources.pdfs.map((resource, index) => (
                    <div key={index} className="col-md-3 col-12 col-sm-4">
                      <div className="text-resource resource-card">
                        <div className="card-title">
                          <h3>
                            {' '}
                            {resource.title.slice(0, 22)}
                            {resource.title.length > 22 ? (
                              <small className="ellipse">...</small>
                            ) : (
                              ''
                            )}
                          </h3>
                        </div>
                        <div className="card-body">
                          <div className="pdf-resource" key={index}>
                            <iframe
                              src={`https://docs.google.com/gview?url=${resource.file_path}&embedded=true`}
                              style={{ width: '100%' }}
                              frameBorder="0"
                            />
                          </div>
                        </div>
                        <div className="card-subject">
                          <h4>
                            {resource.subject.slice(0, 27)}
                            {resource.subject.length > 22 ? (
                              <small className="ellipse">...</small>
                            ) : (
                              ''
                            )}
                          </h4>
                        </div>
                        <div className="card-topic">
                          <h4>
                            {resource.topic.slice(0, 27)}
                            {resource.topic.length > 22 ? (
                              <small className="ellipse">...</small>
                            ) : (
                              ''
                            )}
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div
              className={`col-12 image-content content ${
                activeContent === 'image' ? 'show' : ''
              }`}
            >
              <div className="row">
                {resources.images.length > 0
                  && resources.images.map((resource, index) => (
                    <div key={index} className="col-md-3 col-12 col-sm-4">
                      <div className="text-resource resource-card">
                        <div className="card-title">
                          <h3>
                            {' '}
                            {resource.title.slice(0, 22)}
                            {resource.title.length > 22 ? (
                              <small className="ellipse">...</small>
                            ) : (
                              ''
                            )}
                          </h3>
                        </div>
                        <div className="card-body">
                          <div className="image-resource" key={index}>
                            <img
                              src={resource.file_path}
                              alt=""
                              width="100%"
                              height="auto"
                            />
                          </div>
                        </div>
                        <div className="card-subject">
                          <h4>
                            {resource.subject.slice(0, 27)}
                            {resource.subject.length > 22 ? (
                              <small className="ellipse">...</small>
                            ) : (
                              ''
                            )}
                          </h4>
                        </div>
                        <div className="card-topic">
                          <h4>
                            {resource.topic.slice(0, 27)}
                            {resource.topic.length > 22 ? (
                              <small className="ellipse">...</small>
                            ) : (
                              ''
                            )}
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div
              className={`col-12 video-content content ${
                activeContent === 'video' ? 'show' : ''
              }`}
            >
              <div className="row">
                {resources.videos.length > 0
                  && resources.videos.map((resource, index) => (
                    <div key={index} className="col-md-3 col-12 col-sm-4">
                      <div className="text-resource resource-card">
                        <div className="card-title">
                          <h3>
                            {' '}
                            {resource.title.slice(0, 22)}
                            {resource.title.length > 22 ? (
                              <small className="ellipse">...</small>
                            ) : (
                              ''
                            )}
                          </h3>
                        </div>
                        <div className="card-body">
                          <div className="video-resource" key={index}>
                            <iframe
                              width="100%"
                              height="auto"
                              className="iframe"
                              src={resource.file_path.replace(
                                'watch?v=',
                                'embed/',
                              )}
                            />
                          </div>
                        </div>
                        <div className="card-subject">
                          <h4>
                            {resource.subject.slice(0, 27)}
                            {resource.subject.length > 22 ? (
                              <small className="ellipse">...</small>
                            ) : (
                              ''
                            )}
                          </h4>
                        </div>
                        <div className="card-topic">
                          <h4>
                            {resource.topic.slice(0, 27)}
                            {resource.topic.length > 22 ? (
                              <small className="ellipse">...</small>
                            ) : (
                              ''
                            )}
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
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
  getResearcher: uid => dispatch(fetchResearcher(uid)),
});
export default connect(
  mapPropsToState,
  mapPropsToDispatch,
)(AdminDashboard);
