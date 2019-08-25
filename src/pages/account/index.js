import React from 'react';
import { connect } from 'react-redux';
import { FiUser, FiCheck } from 'react-icons/fi';
import { IoMdCheckmarkCircle, IoMdCloseCircle } from 'react-icons/io';
import Loader from 'react-loader-spinner';
import * as storage from '../../helpers/token';
import { validator } from '../../helpers/utils';
import dashActionTypes from '../../redux/dash/dash.actionTypes';
import {
  updateUserDetails,
  fetchResearcherImages,
  fetchResearcherPdfs,
  fetchResearcherTexts,
  fetchResearcherVideos,
} from '../../redux/dash/dash.action';
import Dialog from '../../components/dialog';

import './index.scss';

class AccountComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        image: { value: '', valid: true },
        name: { value: '', valid: false },
        country: { value: '', valid: false },
        category: { value: '', valid: false },
        email: { value: '', valid: false },
      },
      user: { name: '', email: '', category: '' },
      toSubmit: {},
      imgSrc: '',
      accountInfo: { success: false, failed: false },
      activeContent: 'texts',
      resources: {
        images: [], pdfs: [], videos: [], texts: [],
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.imageRef = React.createRef();
    this.removePicture = this.removePicture.bind(this);
    this.handleResourceBtnClick = this.handleResourceBtnClick.bind(this);
    this.fetchResearcherImages = this.fetchResearcherImages.bind(this);
    this.fetchResearcherVideos = this.fetchResearcherVideos.bind(this);
    this.fetchResearcherPdfs = this.fetchResearcherPdfs.bind(this);
    this.fetchResearcherTexts = this.fetchResearcherTexts.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { toSubmit } = this.state;
    const { updateUser } = this.props;
    updateUser(toSubmit);
  }

  fetchResearcherImages(user) {
    const { fetchResearcherImages } = this.props;
    fetchResearcherImages(user);
  }

  fetchResearcherPdfs(user) {
    const { fetchResearcherPdfs } = this.props;
    fetchResearcherPdfs(user);
  }

  fetchResearcherTexts(user) {
    const { fetchResearcherTexts } = this.props;
    fetchResearcherTexts(user);
  }

  fetchResearcherVideos(user) {
    const { fetchResearcherVideos } = this.props;
    fetchResearcherVideos(user);
  }

  componentDidUpdate(prevProps, prevStates) {
    if (
      prevProps.dash.type !== this.props.dash.type
      && this.props.dash.type === dashActionTypes.UPDATE_DETAILS_SUCCESS
    ) {
      this.setState({ accountInfo: { ...this.state.accountInfo, success: true } });
    }
    if (
      prevProps.dash.type !== this.props.dash.type
      && this.props.dash.type === dashActionTypes.FETCH_RESEARCHER_IMAGES_SUCCESS
    ) {
      this.setState({ resources: { ...this.state.resources, images: this.props.dash.data } });
    }
    if (
      prevProps.dash.type !== this.props.dash.type
      && this.props.dash.type === dashActionTypes.FETCH_RESEARCHER_PDFS_SUCCESS
    ) {
      this.setState({ resources: { ...this.state.resources, pdfs: this.props.dash.data } });
    }
    if (
      prevProps.dash.type !== this.props.dash.type
      && this.props.dash.type === dashActionTypes.FETCH_RESEARCHER_TEXTS_SUCCESS
    ) {
      this.setState({ resources: { ...this.state.resources, texts: this.props.dash.data } });
    }
    if (
      prevProps.dash.type !== this.props.dash.type
      && this.props.dash.type === dashActionTypes.FETCH_RESEARCHER_VIDEOS_SUCCESS
    ) {
      this.setState({ resources: { ...this.state.resources, videos: this.props.dash.data } });
    }
    if (
      prevProps.dash.type !== this.props.dash.type
      && this.props.dash.type === dashActionTypes.UPDATE_DETAILS_LOADING
    ) {
      this.setState({ accountInfo: { success: true, failed: true } });
    }
    if (
      prevProps.dash.type !== this.props.dash.type
      && this.props.dash.type === dashActionTypes.UPDATE_DETAILS_LOADING
    ) {
      this.setState({ accountInfo: { ...this.state.accountInfo, failed: true } });
    }
    console.log(this.state);
  }

  handleResourceBtnClick(type) {
    const {user} = this.state;
    let showedResources = 'texts';
    let activeContent = 'texts';
    switch (type) {
      case 'image':
        activeContent = 'image';
        showedResources = 'image';
        this.fetchResearcherImages(user);
        break;
      case 'video':
        activeContent = 'video';
        showedResources = 'video';
        this.fetchResearcherVideos(user);
        break;
      case 'text':
        activeContent = 'texts';
        showedResources = 'texts';
        this.fetchResearcherTexts(user);
        break;
      default:
        activeContent = 'pdf';
        showedResources = 'pdf';
        this.fetchResearcherPdfs(user);
    }
    this.setState({ activeContent, showedResources });
  }

  removePicture(e) {
    this.setState(p => ({
      toSubmit: { ...p.toSubmit, image: '' },
      imgSrc: '',
      form: {
        ...p.form,
        image: {
          value: '',
          valid: true,
          file: [],
        },
      },
    }));
    this.onSubmit(e);
  }

  handleInputChange(e) {
    const {
      name, value, type, files,
    } = e.target;
    if (type === 'file') {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => this.setState({ imgSrc: reader.result });
      this.setState(p => ({
        toSubmit: { ...p.toSubmit, [name]: file },
        imgSrc: reader.result,
        form: {
          ...p.form,
          [name]: {
            value: '',
            valid: true,
            file,
          },
        },
      }));
    } else {
      this.setState(p => ({
        toSubmit: { ...p.toSubmit, [name]: value },
        form: {
          ...p.form,
          [name]: {
            value,
            valid: validator(value, type),
          },
        },
      }));
    }
  }

  componentDidMount() {
    const user = storage.getToken();
    const { form, toSubmit } = this.state;
    let { imgSrc } = this.state;
    if (user) {
      form.category.value = toSubmit.category = user.category;
      form.category.valid = true;
      form.name.value = toSubmit.name = user.name;
      form.name.valid = true;
      form.country.value = toSubmit.country = user.country;
      form.country.valid = true;
      form.email.value = toSubmit.email = user.email;
      form.email.valid = true;
      imgSrc = toSubmit.image = user.image || '';
      this.setState({ form, imgSrc, user });
      this.fetchResearcherTexts(user);
    }
  }

  render() {
    const {
      form, imgSrc, user, accountInfo, activeContent, resources,
    } = this.state;
    const { dash } = this.props;
    const formKeys = Object.keys(form);
    const validCount = formKeys.filter(k => form[k].valid === true).length;
    const formIsValid = validCount === formKeys.length;
    return (
      <section className="Account .container-fluid">
        <div className="row">
          <div className="col-md-4 col-12 card-column">
            <div className="card">
              <div className="card-body container-fluid">
                <div className="row name-container">
                  <div className="col-7 col-sm-3 col-md-7 name-wrapper">
                    <h3 className="name">{user.name}</h3>
                    <strong className="address">{user.country}</strong>
                    <br />
                    <small className="address">{user.category || 'researcher'}</small>
                    <br />
                    {user && 'verified' in user && (
                      <small className="is-pending">
                        verified &nbsp;
                        {user.verified ? (
                          <IoMdCheckmarkCircle color="green" size={16} />
                        ) : (
                          <IoMdCloseCircle color="#c36060" size={16} />
                        )}
                      </small>
                    )}
                  </div>
                  <div className="col-5 image-container">
                    <div className="user-icon-wrapper">
                      <div className="user-icon">
                        {imgSrc ? (
                          <img src={imgSrc} width="100%" alt="user" className="img" />
                        ) : (
                          <FiUser size={40} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer row">
                <p
                  className="upload-picture col-6 col-sm-3 col-md-6"
                  onClick={() => this.imageRef.current.click()}
                >
                  <input
                    name="image"
                    ref={this.imageRef}
                    onChange={this.handleInputChange}
                    className="image-input"
                    type="file"
                    value={form.image.value}
                    accept="image/*"
                  />
                  UPLOAD PICTURE
                </p>
                <p className="remove-picture col-6" onClick={this.removePicture}>
                  REMOVE PICTURE
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-8 col-sm-12 col-12 form-column">
            <div className="row header d-flex align-items-center">
              <p className="profile">Profile</p>
              <small className="notice">The information can be edited</small>
            </div>
            <form className="row form" onSubmit={this.onSubmit}>
              <div className="inputs-wrapper">
                <div className="row">
                  <div className="form-group col-12 col-md-6">
                    <div className="label">Name *</div>
                    <input
                      name="name"
                      onChange={this.handleInputChange}
                      type="text"
                      className="form-control"
                      value={form.name.value}
                    />
                  </div>
                  <div className="form-group col-md-6 col-12">
                    <div className="label">Email *</div>
                    <input
                      name="email"
                      type="text"
                      onChange={this.handleInputChange}
                      className="form-control"
                      value={form.email.value}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6 col-12">
                    <div className="label">Category *</div>
                    <input
                      onChange={this.handleInputChange}
                      name="category"
                      type="text"
                      className="form-control category"
                      value={form.category.value}
                      readOnly
                    />
                  </div>
                  <div className="form-group col-md-6 col-12">
                    <div className="label">Country *</div>
                    <input
                      name="country"
                      onChange={this.handleInputChange}
                      type="text"
                      className="form-control"
                      value={form.country.value}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group col-12 btn-wrapper">
                {dash.type === dashActionTypes.UPDATE_DETAILS_LOADING ? (
                  <button type="submit" className="btn upload-btn">
                    <Loader type="Circles" color="#00BFFF" height="20" width="100" />
                  </button>
                ) : (
                  <button type="submit" disabled={!formIsValid} className="btn save-details-btn">
                    SAVE DETAILS
                  </button>
                )}

                {accountInfo.success && <Dialog title="" message="User details updated! " />}
                {accountInfo.failed && <p className="error-feedback">{dash.error}</p>}
              </div>
            </form>
          </div>
        </div>
        <div className="row d-flex justify-content-center upload-resources-heading-row">
          <div className="offset-0 offset-md-3 col-12 col-md-9">
            <h3 className="upload-text">Resources</h3>
          </div>
        </div>
        <div className="row resources-row">
          <div className="row resources-btn-row">
            <div className="col-md-10 col-12 offset-0 d-flex btn-wrapper offset-md-1">
              <button
                type="button"
                className={`text-btn btn ${activeContent === 'texts' ? 'active' : ''}`}
                onClick={() => this.handleResourceBtnClick('text')}
              >
                {activeContent === 'texts' ? <FiCheck className="check" /> : ''}
                Texts
              </button>
              <button
                type="button"
                className={`pdf-btn btn ${activeContent === 'pdf' ? 'active' : ''}`}
                onClick={() => this.handleResourceBtnClick('pdf')}
              >
                {activeContent === 'pdf' ? <FiCheck className="check" /> : ''}
                Pdfs
              </button>
              <button
                type="button"
                className={`image-btn btn ${activeContent === 'image' ? 'active' : ''}`}
                onClick={() => this.handleResourceBtnClick('image')}
              >
                {activeContent === 'image' ? <FiCheck className="check" /> : ''}
                Images
              </button>
              <button
                type="button"
                className={`video-btn btn ${activeContent === 'video' ? 'active' : ''}`}
                onClick={() => this.handleResourceBtnClick('video')}
              >
                {activeContent === 'video' ? <FiCheck className="check" /> : ''}
                Videos
              </button>
            </div>
          </div>
          <div className="row content-row">
            <div
              className={`col-12 text-content content ${activeContent === 'texts' ? 'show' : ''}`}
            >
              <div className="row">
              {resources.texts.length > 0
                && resources.texts.map((resource,index) => (
                  <div key={index} className="col-md-3 col-12 col-sm-4">
                    <div className={`text-resource resource-card ${index%2 === 0 ? 'odd':'even'}`}>
                    <div className="card-title">
                      <h3> {resource.heading.slice(0, 22)}{resource.heading.length> 22 ? <small className="ellipse">...</small>: ''}</h3>
                    </div>
                    <div className="card-body">
                      <p className="p">
                        {resource.definition.slice(0, 70)}
                        <span className="span">...</span>
                      </p>
                    </div>
                    <div className="card-subject">
                      <h4>{resource.subject.slice(0, 27)}{resource.subject.length> 22 ? <small className="ellipse">...</small>: ''}</h4>
                    </div>
                    <div className="card-topic">
                      <h4>{resource.topic.slice(0, 27)}{resource.topic.length> 22 ? <small className="ellipse">...</small>: ''}</h4>
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
                && resources.pdfs.map((resource,index) => (
                  <div key={index} className="col-md-3 col-12 col-sm-4">
                    <div className={`text-resource resource-card ${index%2 === 0 ? 'odd':'even'}`}>
                    <div className="card-title">
                      <h3> {resource.title.slice(0, 22)}{resource.title.length> 22 ? <small className="ellipse">...</small>: ''}</h3>
                    </div>
                    <div className="card-body">
                    <div className="pdf-resource" key={index}>
                          <iframe
                            src={`https://docs.google.com/gview?url=${
                              resource.file_path
                            }&embedded=true`}
                            style={{ width: '100%' }}
                            frameBorder="0"
                          />
                        </div>
                    </div>
                    <div className="card-subject">
                      <h4>{resource.subject.slice(0, 27)}{resource.subject.length> 22 ? <small className="ellipse">...</small>: ''}</h4>
                    </div>
                    <div className="card-topic">
                      <h4>{resource.topic.slice(0, 27)}{resource.topic.length> 22 ? <small className="ellipse">...</small>: ''}</h4>
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
                && resources.images.map((resource,index) => (
                  <div key={index} className="col-md-3 col-12 col-sm-4">
                    <div className={`text-resource resource-card ${index%2 === 0 ? 'odd':'even'}`}>
                    <div className="card-title">
                      <h3> {resource.title.slice(0, 22)}{resource.title.length> 22 ? <small className="ellipse">...</small>: ''}</h3>
                    </div>
                    <div className="card-body">
                    <div className="image-resource" key={index}>
                          <img src={resource.file_path} alt="" width="100%" height="auto" />
                      </div>
                    </div>
                    <div className="card-subject">
                      <h4>{resource.subject.slice(0, 27)}{resource.subject.length> 22 ? <small className="ellipse">...</small>: ''}</h4>
                    </div>
                    <div className="card-topic">
                      <h4>{resource.topic.slice(0, 27)}{resource.topic.length> 22 ? <small className="ellipse">...</small>: ''}</h4>
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
                && resources.videos.map((resource,index) => (
                  <div key={index} className="col-md-3 col-12 col-sm-4">
                    <div className={`text-resource resource-card ${index%2 === 0 ? 'odd':'even'}`}>
                    <div className="card-title">
                      <h3> {resource.title.slice(0, 22)}{resource.title.length> 22 ? <small className="ellipse">...</small>: ''}</h3>
                    </div>
                    <div className="card-body">
                    <div className="video-resource" key={index}>
                          <iframe
                            width="100%"
                            height="auto"
                            className="iframe"
                            src={resource.file_path.replace('watch?v=', 'embed/')}
                          />
                        </div>
                    </div>
                    <div className="card-subject">
                      <h4>{resource.subject.slice(0, 27)}{resource.subject.length> 22 ? <small className="ellipse">...</small>: ''}</h4>
                    </div>
                    <div className="card-topic">
                      <h4>{resource.topic.slice(0, 27)}{resource.topic.length> 22 ? <small className="ellipse">...</small>: ''}</h4>
                    </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = states => ({
  dash: states.dash,
});
const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(updateUserDetails(user)),
  fetchResearcherImages: obj => dispatch(fetchResearcherImages(obj)),
  fetchResearcherVideos: obj => dispatch(fetchResearcherVideos(obj)),
  fetchResearcherTexts: obj => dispatch(fetchResearcherTexts(obj)),
  fetchResearcherPdfs: obj => dispatch(fetchResearcherPdfs(obj)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountComponent);
