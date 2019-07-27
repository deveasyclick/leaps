import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FiPlus, FiCheck, FiEdit } from 'react-icons/fi';
import Loader from 'react-loader-spinner';
import { validator } from '../../helpers/utils';
import * as storage from '../../helpers/token';
import { uploadResources } from '../../redux/dash/dash.action';
import dashActionTypes from '../../redux/dash/dash.actionTypes';
import './index.scss';


export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        subject: { value: 'Health Education', valid: true },
        topic: { value: '', valid: false },
        heading: { value: '', valid: false },
        excerpt: { value: '', valid: false },
        definition: { value: '', valid: false },
        pdf: { value: '', files: [], valid: false },
        image: { value: '', files: [], valid: false },
        video: { value: '', files: [], valid: false },
      },
      toSubmit: {},
      showInvalid: false,
      activeContent: 'text',
      documents: {
        subject: '',
        topic: '',
        texts: [],
        pdf: [],
        image: [],
        video: [],
        tags: [],
      },
      showedResources: 'texts',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleResourceBtnClick = this.handleResourceBtnClick.bind(this);
    this.AddMore = this.AddMore.bind(this);
    this.setTags = this.setTags.bind(this);
    this.pdfFile = React.createRef();
    this.imageFile = React.createRef();
    this.videoFile = React.createRef();
  }

  handleInputChange(e) {
    const {
      name, value, type, files,
    } = e.target;
    const docFiles = files ? Array.from(files) : [];
    if (type === 'file') {
      this.setState(p => ({
        toSubmit: { ...p.toSubmit, [name]: value },
        form: {
          ...p.form,
          [name]: {
            value: '',
            files: docFiles,
            valid: docFiles.length > 0,
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
            valid: validator(value, type, name),
            files: [],
          },
        },
      }));
    }
  }

  setTags(ev, check = false) {
    const { form, documents } = this.state;
    const { value: topic } = form.topic;
    let { tags } = documents;
    if (check && tags.length < 10) {
      tags = topic.split(' ').filter((tag) => {
        if (tag.length > 2) {
          return tag;
        }
        return false;
      });
      documents.tags = tags;
      this.setState({ documents });
    } else if (ev.which === 32 && tags.length < 10) {
      tags = topic.split(' ').filter((tag) => {
        if (tag.length > 2) {
          return tag;
        }
        return false;
      });
      documents.tags = tags;
      this.setState({ documents });
    }
  }

  AddMore(name, isText = false) {
    const { documents, form } = this.state;
    let showedResources;
    if (isText) {
      const doc = {};
      doc.heading = form.heading;
      doc.excerpt = form.excerpt;
      doc.definition = form.definition;
      documents.texts.push(doc);
      showedResources = 'texts';
      form.heading.value = '';
      form.excerpt.value = '';
      form.definition.value = '';
    } else {
      documents[name].push(form[name].value ? form[name].value : form[name].files);
      showedResources = name;
      form[name].value = '';
      form[name].files = [];
    }
    documents.subject = form.subject;
    documents.topic = form.topic;
    this.setState({
      documents, showedResources, form,
    });
  }

  onSubmit(ev) {
    ev.preventDefault();
    const { form, documents } = this.state;
    const { uploadResources: upload } = this.props;
    const user = storage.getToken();

    documents.user_name = user.name;
    documents.user_email = user.email;
    documents.user_id = user.uid;
    documents.user_country = user.country;
    documents.subject = form.subject.value;
    documents.topic = form.topic.value;
    documents.texts.push({ heading: form.heading.value, excerpt: form.excerpt.value, definition: form.definition.value });
    documents.pdf.push(form.pdf.value ? form.pdf.value : form.pdf.files);
    documents.image.push(form.image.value ? form.image.value : form.image.files);
    documents.video.push(form.video.value ? form.video.value : form.video.files);
    console.log('documents:', documents);
    upload(documents);
  }

  handleResourceBtnClick(type) {
    let activeContent = 'text';
    switch (type) {
      case 'image': activeContent = 'image'; break;
      case 'video': activeContent = 'video'; break;
      case 'text': activeContent = 'text'; break;
      default: activeContent = 'pdf';
    }
    this.setState({ activeContent });
  }

  render() {
    const {
      form, showInvalid, activeContent, documents, showedResources,
    } = this.state;
    // const { type, error } = this.props;
    const formKeys = Object.keys(form);
    const validCount = formKeys.filter(k => form[k].valid === true).length;
    const allFieldsAreValid = validCount === formKeys.length;
    const { dash } = this.props;

    return (
      <div className="container-fluid Dashboard">
        <div className="row">
          <form onSubmit={this.onSubmit} className="content offset-0 offset-md-2 col-md-8 col-12 form">
            <div className="row">
              <div className="form-group col-12 col-md-6 subject-topic-row">
                <select value={form.subject.value} onChange={this.handleInputChange} className="form-control" name="subject" id="subject">
                  <option value="Health Education">Health Education</option>
                  <option value="Civic Studies">Civic Studies</option>
                  <option value="Integrated Science">Integrated Science</option>
                </select>
              </div>
              <div className="form-group col-md-6 col-12">
                <label htmlFor="topic" />
                <input
                  type="text"
                  className="form-control"
                  name="topic"
                  id="topic"
                  placeholder="Topic"
                  value={form.topic.value}
                  onChange={this.handleInputChange}
                  onKeyPress={this.setTags}
                  autoComplete="true"
                  onBlur={(e) => {
                    this.setTags(e, true);
                  }}
                />
              </div>
            </div>
            {
              documents.tags.length > 0 && (
              <div className="row tags-row">
                <div className="offset-0 col-12 selected-tags-wrapper">
                  <h3 className="selected-tags">Tags selected for you</h3>
                </div>
                <div className="col-12 tags-wrapper">
                  {documents.tags.map((tag, index) => (
                    <span className="tag" key={index}>
                      <span title="delete" className="delete-tag">x</span>
                      <span className="tag-text">
                        {tag}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
              )
            }

            <div className="row d-flex justify-content-center upload-resources-heading-row">
              <div className="offset-0 offset-md-3 col-12 col-md-9">
                <h3 className="upload-text">
                Upload Resource content!
                </h3>
              </div>
            </div>
            <div className="row d-flex justify-content-center upload-resources-heading-row">
              {documents[showedResources].map((resource) => {
                // console.log(resource);
              })}
            </div>
            <div className="row resources-btn-row">
              <div className="col-md-10 col-12 offset-0 d-flex btn-wrapper offset-md-1">
                <button type="button" className={`text-btn btn ${activeContent === 'text' ? 'active' : ''}`} onClick={() => this.handleResourceBtnClick('text')}>
                  {activeContent === 'text' ? <FiCheck className="check" /> : ''}
                  Texts
                </button>
                <button type="button" className={`pdf-btn btn ${activeContent === 'pdf' ? 'active' : ''}`} onClick={() => this.handleResourceBtnClick('pdf')}>
                  {activeContent === 'pdf' ? <FiCheck className="check" /> : ''}
                  Pdfs
                </button>
                <button type="button" className={`image-btn btn ${activeContent === 'image' ? 'active' : ''}`} onClick={() => this.handleResourceBtnClick('image')}>
                  {activeContent === 'image' ? <FiCheck className="check" /> : ''}
                  Images
                </button>
                <button type="button" className={`video-btn btn ${activeContent === 'video' ? 'active' : ''}`} onClick={() => this.handleResourceBtnClick('video')}>
                  {activeContent === 'video' ? <FiCheck className="check" /> : ''}
                  Videos
                </button>
              </div>
            </div>
            <div className="row content-row">
              <div className={`offset-md-2 offset-0 col-md-10 col-12 text-content content ${activeContent === 'text' ? 'show' : ''}`}>
                <div className="text-content-form-group form-group col-md-11 col-12">
                  <FiEdit className="edit-icon" />
                  <input
                    type="text"
                    value={form.heading.value}
                    onChange={this.handleInputChange}
                    placeholder="Heading"
                    name="heading"
                    autoComplete="true"
                    className="form-control text-form-control"
                  />
                </div>
                <div className="text-content-form-group form-group col-md-11 col-12">
                  <FiEdit className="edit-icon" />
                  <textarea className="form-control text-form-control" name="excerpt" id="excerpt" rows="3" onChange={this.handleInputChange} placeholder="Excerpt" value={form.excerpt.value} />
                </div>
                <div className="form-group text-content-form-group  col-md-11 col-12">
                  <FiEdit className="edit-icon" />
                  <textarea className="form-control text-form-control" name="definition" id="definition" rows="5" onChange={this.handleInputChange} placeholder="Definition" value={form.definition.value} />
                </div>
                <div className="form-group col-md-10 col-12 form-group-btn">
                  <button
                    type="button"
                    disabled={!(form.heading.valid && form.excerpt.valid && form.definition.valid)}
                    className="add-text-btn btn"
                    onClick={() => this.AddMore('', true)}
                  >
                          Add more
                  </button>
                </div>
              </div>
              <div className={`offset-1 col-10 pdf-content content ${activeContent === 'pdf' ? 'show' : ''}`}>
                <div className="row">
                  <div className="form-group offset-md-1 col-md-5 col-12">
                    <input
                      type="text"
                      id="proxy"
                      className="form-control"
                      name="pdf"
                      value={form.pdf.value}
                      autoComplete="true"
                      onChange={this.handleInputChange}
                      placeholder="http://"
                    />
                  </div>
                  <div className="col-md-1 col-12">
                    <p className="or">OR</p>
                  </div>
                  <div className="form-group col-md-5 col-12">
                    <div className="pdf-wrapper">
                      <input
                        type="text"
                        placeholder="Select pdfs "
                        id="proxy"
                        className="form-control pdf-input-control"
                        readOnly
                        onClick={() => {
                          this.pdfFile.current.click();
                        }}
                      />
                      <div className="add-icon-wrapper">
                        <FiPlus
                          size={14}
                          className="add-icon"
                          onClick={() => {
                            this.pdfFile.current.click();
                          }}
                        />
                      </div>
                      <ul className="list pdf-list">
                        {form.pdf.files.map((file, index) => <li key={index} className="list-item pdf-list-item">{file.name}</li>)}
                      </ul>
                      <input ref={this.pdfFile} type="file" name="pdf" className="file" onChange={this.handleInputChange} multiple accept="application/pdf,.doc" />
                    </div>

                  </div>
                </div>
                <div className="form-group col-10 form-group-btn btn-wrapper">
                  <button
                    type="button"
                    disabled={!form.pdf.valid}
                    onClick={() => this.AddMore('pdf')}
                    className="add-pdf-btn btn"
                  >
                      Add more
                  </button>
                </div>
              </div>
              <div className={`offset-1 col-10 image-content content ${activeContent === 'image' ? 'show' : ''}`}>
                <div className="row">
                  <div className="form-group offset-md-1 col-md-5 col-12">
                    <input
                      type="text"
                      id="proxy"
                      className="form-control"
                      name="image"
                      value={form.image.value}
                      onChange={this.handleInputChange}
                      placeholder="http://"
                      autoComplete="true"
                    />
                  </div>
                  <div className="col-md-1 col-12">
                    <p className="or">OR</p>
                  </div>
                  <div className="form-group col-md-5 col-12">
                    <div className="image-wrapper">
                      <input
                        type="text"
                        placeholder="Select images"
                        id="proxy"
                        className="form-control image-input-control"
                        readOnly
                        onClick={() => {
                          this.imageFile.current.click();
                        }}
                      />

                      <div className="add-icon-wrapper">
                        <FiPlus
                          size={14}
                          className="add-icon"
                          onClick={() => {
                            this.imageFile.current.click();
                          }}
                        />
                      </div>
                      <ul className="list pdf-list">
                        {form.image.files.map((file, index) => <li key={index} className="list-item pdf-list-item">{file.name}</li>)}
                      </ul>
                      <input ref={this.imageFile} type="file" name="image" className="file" onChange={this.handleInputChange} multiple accept="image/*" />
                    </div>
                  </div>
                </div>
                <div className="form-group col-10 form-group-btn btn-wrapper">
                  <button
                    type="button"
                    disabled={!form.image.valid}
                    onClick={() => this.AddMore('image')}
                    className="add-image-btn btn"
                  >
                    Add more
                  </button>
                </div>
              </div>
              <div className={`offset-1 col-10 video-content content ${activeContent === 'video' ? 'show' : ''}`}>
                <div className="row">
                  <div className="form-group offset-md-1 col-md-5 col-12">
                    <input
                      type="text"
                      placeholder="http://"
                      id="proxy"
                      className="form-control"
                      name="video"
                      value={form.video.value}
                      onChange={this.handleInputChange}
                      autoComplete="true"
                    />
                  </div>
                  <div className="col-md-1 col-12">
                    <p className="or">OR</p>
                  </div>
                  <div className="form-group col-md-5 col-12">
                    <div className="video-wrapper">
                      <input
                        type="text"
                        placeholder="Select Videos"
                        id="proxy"
                        className="form-control video-input-control"
                        readOnly
                        onClick={() => {
                          this.videoFile.current.click();
                        }}
                      />
                      <div className="add-icon-wrapper">
                        <FiPlus
                          size={14}
                          className="add-icon"
                          onClick={() => {
                            this.videoFile.current.click();
                          }}
                        />
                      </div>
                      <ul className="list pdf-list">
                        {form.video.files.map((file, index) => <li key={index} className="list-item pdf-list-item">{file.name}</li>)}
                      </ul>
                      <input ref={this.videoFile} type="file" name="video" className="file" onChange={this.handleInputChange} multiple accept="video/mp4,video/x-m4v,video/*" />
                    </div>
                  </div>
                </div>
                <div className="form-group col-10 form-group-btn btn-wrapper">
                  <button
                    type="button"
                    disabled={!form.video.valid}
                    onClick={() => this.AddMore('video')}
                    className="add-video-btn btn"
                  >
                      Add more
                  </button>
                </div>
              </div>
            </div>
            <div className="row upload-btn-row">
              <div className="form-group col-8 offset-3 btn-wrapper">
                {dash.type === dashActionTypes.UPLOAD_RESOURCES_LOADING
                  ? (
                    <button type="submit" className="btn upload-btn">
                      <Loader
                        type="Circles"
                        color="#00BFFF"
                        height="20"
                        width="100"
                      />
                    </button>
                  )
                  : <button type="submit" disabled={!allFieldsAreValid} className="btn upload-btn">Upload all</button>
                }
                {dash.type === dashActionTypes.UPLOAD_RESOURCES_SUCCESS && (
                <p className="upload-success">
                  Upload Successful!
                </p>
                )}
                {dash.type === dashActionTypes.UPLOAD_RESOURCES_FAILED && (
                <p className="upload-error">
                  {dash.error}
                </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


const mapStatesToProps = states => ({
  dash: states.dash,
});
const mapDispatchToProps = dispatch => ({
  uploadResources: document => dispatch(uploadResources(document)),
});
export default connect(mapStatesToProps, mapDispatchToProps)(Dashboard);
