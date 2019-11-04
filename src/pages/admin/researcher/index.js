import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import { FiClock, FiMoreVertical, FiCheck } from 'react-icons/fi';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import styled from 'styled-components';
import Image from '../../../assets/images/favicon.png';
import {
  fetchResearcher,
  updateResearcherDetails,
  fetchResearcherImages,
  fetchResearcherTexts,
  fetchResearcherVideos,
  fetchResearcherPdfs,
  updateResources,
} from '../../../redux/dash/dash.action';
import dashActionTypes from '../../../redux/dash/dash.actionTypes';
import * as storage from '../../../helpers/token';
import 'react-table/react-table.css';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeContent: 'texts',
      activeCountry: 'UK',
      researcher: null,
      resources: {
        images: [],
        pdfs: [],
        videos: [],
        texts: [],
      },
    };
    this.handleResourceBtnClick = this.handleResourceBtnClick.bind(this);
    this.handleCountryBtnClick = this.handleCountryBtnClick.bind(this);
    this.updateResearcherDetails = this.updateResearcherDetails.bind(this);
    this.updateResources = this.updateResources.bind(this);
    this.fetchResearchersImages = this.fetchResearchersImages.bind(this);
    this.fetchResearchersVideos = this.fetchResearchersVideos.bind(this);
    this.fetchResearchersPdfs = this.fetchResearchersPdfs.bind(this);
    this.fetchResearchersTexts = this.fetchResearchersTexts.bind(this);
    this.ref = React.createRef();
  }

  handleResourceBtnClick(type) {
    let activeContent = 'texts';
    const researcher = storage.get('researcher');
    switch (type) {
      case 'image':
        activeContent = 'image';
        this.fetchResearchersImages(researcher);
        break;
      case 'video':
        activeContent = 'video';
        this.fetchResearchersVideos(researcher);
        break;
      case 'text':
        activeContent = 'texts';
        this.fetchResearchersTexts(researcher);
        break;
      default:
        activeContent = 'pdf';
        this.fetchResearchersPdfs(researcher);
    }
    this.setState({ activeContent });
  }

  updateResearcherDetails(obj) {
    const { updateResearcherDetail } = this.props;
    updateResearcherDetail(obj);
  }
  // eslint-disable-next-line
  updateResources(resources) {
    const { updateResource } = this.props;
    updateResource(resources);
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

    if (
      prevProps.dash.type !== this.props.dash.type
      && this.props.dash.type === dashActionTypes.FETCH_RESEARCHER_IMAGES_SUCCESS
    ) {
      this.setState({
        resources: { ...this.state.resources, images: this.props.dash.data },
      });
    }
    if (
      prevProps.dash.type !== this.props.dash.type
      && this.props.dash.type === dashActionTypes.FETCH_RESEARCHER_PDFS_SUCCESS
    ) {
      this.setState({
        resources: { ...this.state.resources, pdfs: this.props.dash.data },
      });
    }
    if (
      prevProps.dash.type !== this.props.dash.type
      && this.props.dash.type === dashActionTypes.FETCH_RESEARCHER_TEXTS_SUCCESS
    ) {
      this.setState({
        resources: { ...this.state.resources, texts: this.props.dash.data },
      });
    }
    if (
      prevProps.dash.type !== this.props.dash.type
      && this.props.dash.type === dashActionTypes.FETCH_RESEARCHER_VIDEOS_SUCCESS
    ) {
      this.setState({
        resources: { ...this.state.resources, videos: this.props.dash.data },
      });
    }
    if (
      prevProps.dash.type !== this.props.dash.type
      && this.props.dash.type === dashActionTypes.UPDATE_RESEARCHER_DETAILS_SUCCESS
    ) {
      const researcher = localStorage.getItem('researcher');
      this.setState({
        researcher,
      });
    }
  }

  fetchResearchersImages(user) {
    const { getResearchersImages } = this.props;
    getResearchersImages(user);
  }

  fetchResearchersPdfs(user) {
    const { getResearchersPdfs } = this.props;
    getResearchersPdfs(user);
  }

  fetchResearchersTexts(user) {
    const { getResearchersTexts } = this.props;
    getResearchersTexts(user);
  }

  fetchResearchersVideos(user) {
    const { getResearchersVideos } = this.props;
    getResearchersVideos(user);
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
    const researcher = JSON.parse(localStorage.getItem('researcher'));
    if (researcher) {
      this.setState({ researcher });
      this.fetchResearchersTexts(researcher);
    } else {
      this.props.history.replace('/admin');
    }
  }

  componentWillUnmount() {
    localStorage.removeItem('researcher');
  }

  render() {
    const {
 activeContent, activeCountry, researcher, resources 
} = this.state;
    return (
      <section className="container Researcher">
        <div className="row cards-row">
          <div className="col-md-12 col-12 d-flex btn-wrapper">
            {researcher && (
              <div className="researcher card">
                <div className="details-wrapper d-flex justify-content-between">
                  <span className="card-image">
                    <img
                      src={researcher.image ? researcher.image : Image}
                      className="image"
                      alt="Researcher"
                    />
                  </span>
                  <div className="details">
                    <p className="name">{researcher.name}</p>
                    <p className="uploads">{researcher.country}</p>
                    <p className="approved-pending">
                      <span className="icon">
                        {researcher.approved ? (
                          <IoMdCheckmarkCircle className="approved-icon" />
                        ) : (
                          <FiClock className="pending-icon" />
                        )}
                      </span>
                      <span className="pending">
                        {researcher.approved ? 'approved' : 'not approved'}
                      </span>
                    </p>
                  </div>
                  <div className="actions cell">
                    <div className="approve-pending-popup">
                      <ul
                        onMouseEnter={() => {
                          this.ref.current.style.display = 'block';
                        }}
                        onMouseLeave={() => {
                          this.ref.current.style.display = 'none';
                        }}
                        className="approved-pending"
                        ref={this.ref}
                      >
                        <div className="caret" />
                        <li
                          className="list first-list"
                          onClick={() => {
                            researcher.approved = true;
                            this.updateResearcherDetails(researcher);
                            this.ref.current.style.display = 'none';
                          }}
                        >
                          Approve
                        </li>
                        <li
                          className="list"
                          onClick={() => {
                            researcher.approved = false;
                            this.updateResearcherDetails(researcher);
                            this.ref.current.style.display = 'none';
                          }}
                        >
                          Pending
                        </li>
                      </ul>
                      <FiMoreVertical
                        onMouseEnter={() => {
                          this.ref.current.style.display = 'block';
                        }}
                        onMouseLeave={() => {
                          this.ref.current.style.display = 'none';
                        }}
                        className="icon"
                        size={28}
                      />
                    </div>
                  </div>
                </div>
                <p className="uploads">
                  <span className="uploads-count">
                    {researcher.file_uploads}
                  </span>
                  &nbsp;
                  <span>Uploads</span>
                </p>
                <div className="stats d-flex">
                  <p className="pending d-flex align-items-center">
                    <FiClock size={18} className="pending-icon" />
                    <span>
                      {researcher.file_pending}
                      &nbsp;
                    </span>
                    <span>pending</span>
                  </p>
                  <p className="approved">
                    <IoMdCheckmarkCircle size={18} className="approved-icon" />
                    <span>{researcher.file_approved}</span>
                    &nbsp;
                    <span>approved</span>
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
              Texts
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
                && resources.texts.map((resource, index) => {
                  const resourcesRef = React.createRef();
                  return (
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
                            {resource.subject.slice(0, 15)}
                            {resource.subject.length > 15 ? (
                              <small className="ellipse">...</small>
                            ) : (
                              ''
                            )}
                          </h4>
                          <div className="approve-pending-popup">
                            <ul
                              onMouseEnter={() => {
                                resourcesRef.current.style.display = 'block';
                              }}
                              onMouseLeave={() => {
                                resourcesRef.current.style.display = 'none';
                              }}
                              className="approved-pending"
                              ref={resourcesRef}
                            >
                              <div className="caret" />
                              <li
                                className="list first-list"
                                onClick={() => {
                                  // eslint-disable-next-line
                                  resource.isPending = false;
                                  this.updateResources(resource);
                                  resourcesRef.current.style.display = 'none';
                                }}
                              >
                                Approve
                              </li>
                              <li
                                className="list"
                                onClick={() => {
                                  // eslint-disable-next-line
                                  resource.isPending = true;
                                  this.updateResources(resource);
                                  resourcesRef.current.style.display = 'none';
                                }}
                              >
                                Pending
                              </li>
                            </ul>
                            <FiMoreVertical
                              onMouseEnter={() => {
                                resourcesRef.current.style.display = 'block';
                              }}
                              onMouseLeave={() => {
                                resourcesRef.current.style.display = 'none';
                              }}
                              className="icon"
                              size={28}
                            />
                          </div>
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
                  );
                })}
            </div>
          </div>
          <div
            className={`col-12 pdf-content content ${
              activeContent === 'pdf' ? 'show' : ''
            }`}
          >
            <div className="row">
              {resources.pdfs.length > 0
                && resources.pdfs.map((resource, index) => {
                  const resourcesRef = React.createRef();
                  return (
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
                            {resource.subject.slice(0, 15)}
                            {resource.subject.length > 15 ? (
                              <small className="ellipse">...</small>
                            ) : (
                              ''
                            )}
                          </h4>
                          <div className="approve-pending-popup">
                            <ul
                              onMouseEnter={() => {
                                resourcesRef.current.style.display = 'block';
                              }}
                              onMouseLeave={() => {
                                resourcesRef.current.style.display = 'none';
                              }}
                              className="approved-pending"
                              ref={resourcesRef}
                            >
                              <div className="caret" />
                              <li
                                className="list first-list"
                                onClick={() => {
                                  // eslint-disable-next-line
                                  resource.isPending = false;
                                  this.updateResources(resource);
                                  resourcesRef.current.style.display = 'none';
                                }}
                              >
                                Approve
                              </li>
                              <li
                                className="list"
                                onClick={() => {
                                  // eslint-disable-next-line
                                  resource.isPending = true;
                                  this.updateResources(resource);
                                  resourcesRef.current.style.display = 'none';
                                }}
                              >
                                Pending
                              </li>
                            </ul>
                            <FiMoreVertical
                              onMouseEnter={() => {
                                resourcesRef.current.style.display = 'block';
                              }}
                              onMouseLeave={() => {
                                resourcesRef.current.style.display = 'none';
                              }}
                              className="icon"
                              size={28}
                            />
                          </div>
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
                  );
                })}
            </div>
          </div>
          <div
            className={`col-12 image-content content ${
              activeContent === 'image' ? 'show' : ''
            }`}
          >
            <div className="row">
              {resources.images.length > 0
                && resources.images.map((resource, index) => {
                  const resourcesRef = React.createRef();
                  return (
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
                            {resource.subject.slice(0, 15)}
                            {resource.subject.length > 15 ? (
                              <small className="ellipse">...</small>
                            ) : (
                              ''
                            )}
                          </h4>
                          <div className="approve-pending-popup">
                            <ul
                              onMouseEnter={() => {
                                resourcesRef.current.style.display = 'block';
                              }}
                              onMouseLeave={() => {
                                resourcesRef.current.style.display = 'none';
                              }}
                              className="approved-pending"
                              ref={resourcesRef}
                            >
                              <div className="caret" />
                              <li
                                className="list first-list"
                                onClick={() => {
                                  // eslint-disable-next-line
                                  resource.isPending = false;
                                  this.updateResources(resource);
                                  resourcesRef.current.style.display = 'none';
                                }}
                              >
                                Approve
                              </li>
                              <li
                                className="list"
                                onClick={() => {
                                  // eslint-disable-next-line
                                  resource.isPending = true;
                                  this.updateResources(resource);
                                  resourcesRef.current.style.display = 'none';
                                }}
                              >
                                Pending
                              </li>
                            </ul>
                            <FiMoreVertical
                              onMouseEnter={() => {
                                resourcesRef.current.style.display = 'block';
                              }}
                              onMouseLeave={() => {
                                resourcesRef.current.style.display = 'none';
                              }}
                              className="icon"
                              size={28}
                            />
                          </div>
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
                  );
                })}
            </div>
          </div>
          <div
            className={`col-12 video-content content ${
              activeContent === 'video' ? 'show' : ''
            }`}
          >
            <div className="row">
              {resources.videos.length > 0
                && resources.videos.map((resource, index) => {
                  const resourcesRef = React.createRef();
                  return (
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
                            {resource.subject.slice(0, 15)}
                            {resource.subject.length > 15 ? (
                              <small className="ellipse">...</small>
                            ) : (
                              ''
                            )}
                          </h4>
                          <div className="approve-pending-popup">
                            <ul
                              onMouseEnter={() => {
                                resourcesRef.current.style.display = 'block';
                              }}
                              onMouseLeave={() => {
                                resourcesRef.current.style.display = 'none';
                              }}
                              className="approved-pending"
                              ref={resourcesRef}
                            >
                              <div className="caret" />
                              <li
                                className="list first-list"
                                onClick={() => {
                                  // eslint-disable-next-line
                                  resource.isPending = false;
                                  this.updateResources(resource);
                                  resourcesRef.current.style.display = 'none';
                                }}
                              >
                                Approve
                              </li>
                              <li
                                className="list"
                                onClick={() => {
                                  // eslint-disable-next-line
                                  resource.isPending = true;
                                  this.updateResources(resource);
                                  resourcesRef.current.style.display = 'none';
                                }}
                              >
                                Pending
                              </li>
                            </ul>
                            <FiMoreVertical
                              onMouseEnter={() => {
                                resourcesRef.current.style.display = 'block';
                              }}
                              onMouseLeave={() => {
                                resourcesRef.current.style.display = 'none';
                              }}
                              className="icon"
                              size={28}
                            />
                          </div>
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
                  );
                })}
            </div>
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
  getResearcher: uid => dispatch(fetchResearcher(uid)),
  updateResearcherDetail: obj => dispatch(updateResearcherDetails(obj)),
  getResearchersImages: user => dispatch(fetchResearcherImages(user)),
  getResearchersTexts: user => dispatch(fetchResearcherTexts(user)),
  getResearchersVideos: user => dispatch(fetchResearcherVideos(user)),
  getResearchersPdfs: user => dispatch(fetchResearcherPdfs(user)),
  updateResource: resources => dispatch(updateResources(resources)),
});
export default connect(
  mapPropsToState,
  mapPropsToDispatch,
)(AdminDashboard);
