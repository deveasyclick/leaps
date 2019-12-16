import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import { FiMoreVertical, FiXCircle } from 'react-icons/fi';
import Modal from 'react-modal';
import ProviderDetailsCard from '../components/cards/provideDetailsCard/providerDetailsCard';
import ProviderStatsCard from '../components/cards/providerStatCard/providerDetailsCard';

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
import 'react-table/react-table.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');
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
      selectedTextResource: null,
      open: false,
    };
    this.handleResourceBtnClick = this.handleResourceBtnClick.bind(this);
    this.handleCountryBtnClick = this.handleCountryBtnClick.bind(this);
    this.updateResearcherDetails = this.updateResearcherDetails.bind(this);
    this.updateResources = this.updateResources.bind(this);
    this.fetchResearchersImages = this.fetchResearchersImages.bind(this);
    this.fetchResearchersVideos = this.fetchResearchersVideos.bind(this);
    this.fetchResearchersPdfs = this.fetchResearchersPdfs.bind(this);
    this.fetchResearchersTexts = this.fetchResearchersTexts.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.ref = React.createRef();
  }

  closeModal() {
    this.setState({ open: false, selectedTextResource: null });
  }

  openModal() {
    this.setState({ open: true });
  }

  handleResourceBtnClick(type) {
    let activeContent = 'texts';
    const { researcher } = this.state;
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
      const researcher = this.props.dash.data;
      this.setState({
        researcher,
      });
      this.fetchResearchersTexts(researcher);
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
      && this.props.dash.type === dashActionTypes.FETCH_RESEARCHER_IMAGES_SUCCESS
    ) {
      this.setState({
        resources: { ...this.state.resources, images: this.props.dash.data },
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
    const researcherUid = this.props.match.params.uid;
    if (researcherUid) {
      const { getResearcher } = this.props;
      getResearcher(researcherUid);
    } else {
      this.props.history.replace('/admin');
    }
  }

  render() {
    const {
      activeContent,
      activeCountry,
      researcher,
      resources,
      open,
      selectedTextResource,
    } = this.state;
    return (
      <React.Fragment>
        {selectedTextResource && (
          <Modal
            isOpen={this.state.open}
            contentLabel="Minimal Modal Example"
            style={customStyles}
          >
            <div className="text-resource card">
              <div className="card-title">
                <h3 className="title">{selectedTextResource.heading}</h3>
              </div>
              <div className="card-body">
                <p className="p">{selectedTextResource.definition}</p>
              </div>
              <div className="card-subject">
                <h4 className="h4">{selectedTextResource.subject}</h4>
              </div>
              <div className="card-topic">
                <h4>{selectedTextResource.topic}</h4>
              </div>
              <div className="card-status">
                <h4 className="status-indicator">
                  {selectedTextResource.isPending ? 'pending' : 'approved'}
                </h4>
              </div>
            </div>
            <button
              type="button"
              className="close-button"
              onClick={this.closeModal}
            >
              <FiXCircle size={30} color="red" />
            </button>
          </Modal>
        )}
        <section className="container Researcher" id="root">
          <div className="row cards-row">
            <div className="col-md-6 col-12 d-flex btn-wrapper">
              {researcher && (
                <ProviderDetailsCard
                  researcher={researcher}
                  updateResearcherDetails={this.updateResearcherDetails}
                />
              )}
            </div>
            <div className="col-md-6 col-12 d-flex btn-wrapper">
              {researcher && (
                <ProviderStatsCard
                  researcher={researcher}
                  updateResearcherDetails={this.updateResearcherDetails}
                />
              )}
            </div>
          </div>
          <div className="row resources-btn-row">
            <div className="col-md-8 col-12 offset-0 d-flex btn-wrapper offset-md-1">
              <button
                type="button"
                className={`text-btn btn ${
                  activeContent === 'texts' ? 'active' : ''
                }`}
                onClick={() => this.handleResourceBtnClick('text')}
              >
                Texts
              </button>
              <button
                type="button"
                className={`pdf-btn btn ${
                  activeContent === 'pdf' ? 'active' : ''
                }`}
                onClick={() => this.handleResourceBtnClick('pdf')}
              >
                Pdfs
              </button>
              <button
                type="button"
                className={`image-btn btn ${
                  activeContent === 'image' ? 'active' : ''
                }`}
                onClick={() => this.handleResourceBtnClick('image')}
              >
                Images
              </button>
              <button
                type="button"
                className={`video-btn btn ${
                  activeContent === 'video' ? 'active' : ''
                }`}
                onClick={() => this.handleResourceBtnClick('video')}
              >
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
                      <div
                        key={index}
                        onClick={() => {
                          this.setState(
                            { selectedTextResource: resource },
                            () => {
                              this.openModal();
                            },
                          );
                        }}
                        className="col-md-4 col-12 col-sm-4"
                      >
                        <div className="text-resource resource-card">
                          <div className="card-title">
                            <h3 className="title">
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
                              {resource.definition.slice(0, 250)}
                              {resource.definition.length > 250 && (
                                <span className="span">...</span>
                              )}
                            </p>
                          </div>
                          <div className="card-subject">
                            <h4 className="h4">{resource.subject}</h4>
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
                          <div className="line" />
                          <div className="card-status">
                            <h4 className="status-indicator">
                              {resource.isPending ? 'pending' : 'approved'}
                            </h4>
                            <div className="logical-block">
                              <div className="approve-pending-popup">
                                <ul
                                  onMouseEnter={() => {
                                    resourcesRef.current.style.display =                                      'block';
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
                                      resourcesRef.current.style.display =                                        'none';
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
                                      resourcesRef.current.style.display =                                        'none';
                                    }}
                                  >
                                    Pending
                                  </li>
                                </ul>
                                <FiMoreVertical
                                  onMouseEnter={() => {
                                    resourcesRef.current.style.display =                                      'block';
                                  }}
                                  onMouseLeave={() => {
                                    resourcesRef.current.style.display = 'none';
                                  }}
                                  className="icon"
                                  size={28}
                                />
                              </div>
                            </div>
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
                      <div key={index} className="col-md-4 col-12 col-sm-4">
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
                            <h4 className="h4">
                              {resource.subject.slice(0, 15)}
                              {resource.subject.length > 15 ? (
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
                          <div className="line" />
                          <div className="card-status">
                            <h4 className="status-indicator">
                              {resource.isPending ? 'pending' : 'approved'}
                            </h4>
                            <div className="logical-block">
                              <div className="approve-pending-popup">
                                <ul
                                  onMouseEnter={() => {
                                    resourcesRef.current.style.display =                                      'block';
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
                                      resourcesRef.current.style.display =                                        'none';
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
                                      resourcesRef.current.style.display =                                        'none';
                                    }}
                                  >
                                    Pending
                                  </li>
                                </ul>
                                <FiMoreVertical
                                  onMouseEnter={() => {
                                    resourcesRef.current.style.display =                                      'block';
                                  }}
                                  onMouseLeave={() => {
                                    resourcesRef.current.style.display = 'none';
                                  }}
                                  className="icon"
                                  size={28}
                                />
                              </div>
                            </div>
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
                      <div key={index} className="col-md-4 col-12 col-sm-4">
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
                            <h4 className="h4">
                              {resource.subject.slice(0, 15)}
                              {resource.subject.length > 15 ? (
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
                          <div className="line" />
                          <div className="card-status">
                            <h4 className="status-indicator">
                              {resource.isPending ? 'pending' : 'approved'}
                            </h4>
                            <div className="logical-block">
                              <div className="approve-pending-popup">
                                <ul
                                  onMouseEnter={() => {
                                    resourcesRef.current.style.display =                                      'block';
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
                                      resourcesRef.current.style.display =                                        'none';
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
                                      resourcesRef.current.style.display =                                        'none';
                                    }}
                                  >
                                    Pending
                                  </li>
                                </ul>
                                <FiMoreVertical
                                  onMouseEnter={() => {
                                    resourcesRef.current.style.display =                                      'block';
                                  }}
                                  onMouseLeave={() => {
                                    resourcesRef.current.style.display = 'none';
                                  }}
                                  className="icon"
                                  size={28}
                                />
                              </div>
                            </div>
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
                      <div key={index} className="col-md-4 col-12 col-sm-4">
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
                                style={{ border: 'none' }}
                                src={resource.file_path.replace(
                                  'watch?v=',
                                  'embed/',
                                )}
                              />
                            </div>
                          </div>
                          <div className="card-subject">
                            <h4 className="h4">
                              {resource.subject.slice(0, 15)}
                              {resource.subject.length > 15 ? (
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
                          <div className="line" />
                          <div className="card-status">
                            <h4 className="status-indicator">
                              {resource.isPending ? 'pending' : 'approved'}
                            </h4>
                            <div className="logical-block">
                              <div className="approve-pending-popup">
                                <ul
                                  onMouseEnter={() => {
                                    resourcesRef.current.style.display =                                      'block';
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
                                      resourcesRef.current.style.display =                                        'none';
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
                                      resourcesRef.current.style.display =                                        'none';
                                    }}
                                  >
                                    Pending
                                  </li>
                                </ul>
                                <FiMoreVertical
                                  onMouseEnter={() => {
                                    resourcesRef.current.style.display =                                      'block';
                                  }}
                                  onMouseLeave={() => {
                                    resourcesRef.current.style.display = 'none';
                                  }}
                                  className="icon"
                                  size={28}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
  updateResearcherDetail: obj => dispatch(updateResearcherDetails(obj)),
  getResearchersImages: user => dispatch(fetchResearcherImages(user)),
  getResearchersTexts: user => dispatch(fetchResearcherTexts(user)),
  getResearchersVideos: user => dispatch(fetchResearcherVideos(user)),
  getResearchersPdfs: user => dispatch(fetchResearcherPdfs(user)),
  updateResource: resources => dispatch(updateResources(resources)),
});
export default connect(mapPropsToState, mapPropsToDispatch)(AdminDashboard);
