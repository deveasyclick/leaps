import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FiPlus, FiCheck, FiEdit } from 'react-icons/fi';
import { validator } from '../../helpers/utils';
import './index.scss';


export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        subject: { value: '', valid: false },
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
      documents: [],
      tags: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.formIsValid = this.formIsValid.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleResourceBtnClick = this.handleResourceBtnClick.bind(this);
    this.onAddMore = this.onAddMore.bind(this);
    this.setTags = this.setTags.bind(this);
    this.pdfFile = React.createRef();
    this.imageFile = React.createRef();
    this.videoFile = React.createRef();
  }

  formIsValid() {
    const { form } = this.state;
    const formKeys = Object.keys(form);
    const validCount = formKeys.filter(k => form[k].valid === true).length;
    return validCount === formKeys.length;
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
            value,
            files: docFiles,
            valid: validator(value, type) && docFiles.length > 0,
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

  setTags(ev, check = false) {
    let { form, tags } = this.state;
    const { value: topic } = form.topic;
    if (check && tags.length < 10) {
      tags = topic.split(' ').filter((tag) => {
        if (tag.length > 2) {
          return tag;
        }
        return false;
      });
      this.setState({ tags });
    } else if (ev.which === 32 && tags.length < 10) {
      tags = topic.split(' ').filter((tag) => {
        if (tag.length > 2) {
          return tag;
        }
        return false;
      });
      this.setState({ tags });
    }
  }

  onAddMore() {}

  onSubmit(e) {}

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
      form, showInvalid, activeContent, tags,
    } = this.state;
    // const { type, error } = this.props;
    return (
      <div className="container-fluid Dashboard">
        <div className="row">
          <form className="content offset-0 offset-md-2 col-md-8 col-12 form">
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
                  onBlur={(e) => {
                    this.setTags(e, true);
                  }}
                />
              </div>
            </div>
            {
              tags.length > 0 && (
              <div className="row tags-row">
                <div className="offset-0 col-12 selected-tags-wrapper">
                  <h3 className="selected-tags">Tags selected for you</h3>
                </div>
                <div className="col-12 tags-wrapper">
                  {tags.map((tag, index) => (
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
                  <button type="button" className="add-text-btn btn">Add more</button>
                </div>
              </div>
              <div className={`offset-1 col-10 pdf-content content ${activeContent === 'pdf' ? 'show' : ''}`}>
                <div className="row">
                  <div className="form-group offset-md-1 col-md-5 col-12">
                    <input
                      type="text"
                      placeholder="Url"
                      id="proxy"
                      className="form-control"
                      name="video"
                      value={form.video.value}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className="col-md-1 col-12">
                    <p className="or">OR</p>
                  </div>
                  <div className="form-group col-md-5 col-12">
                    <div className="pdf-wrapper">
                      <input
                        type="text"
                        placeholder="Select pdf documents"
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
                      <input ref={this.pdfFile} type="file" name="pdf" value={form.pdf.value} className="file" onChange={this.handleInputChange} multiple accept="application/pdf,.doc" />
                    </div>

                  </div>
                </div>
                <div className="form-group col-10 form-group-btn btn-wrapper">
                  <button type="button" className="add-pdf-btn btn">Add more</button>
                </div>
              </div>
              <div className={`offset-1 col-10 image-content content ${activeContent === 'image' ? 'show' : ''}`}>
                <div className="row">
                  <div className="form-group offset-md-1 col-md-5 col-12">
                    <input
                      type="text"
                      placeholder="Url"
                      id="proxy"
                      className="form-control"
                      name="video"
                      value={form.video.value}
                      onChange={this.handleInputChange}
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
                      <input ref={this.imageFile} type="file" name="image" value={form.image.value} className="file" onChange={this.handleInputChange} multiple accept="image/*" />
                    </div>
                  </div>
                </div>
                <div className="form-group col-10 form-group-btn btn-wrapper">
                  <button type="button" className="add-image-btn btn">Add more</button>
                </div>
              </div>
              <div className={`offset-1 col-10 video-content content ${activeContent === 'video' ? 'show' : ''}`}>
                <div className="row">
                  <div className="form-group offset-md-1 col-md-5 col-12">
                    <input
                      type="text"
                      placeholder="Url"
                      id="proxy"
                      className="form-control"
                      name="video"
                      value={form.video.value}
                      onChange={this.handleInputChange}
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
                      <input ref={this.videoFile} type="file" name="image" value={form.video.value} className="file" onChange={this.handleInputChange} multiple accept="video/mp4,video/x-m4v,video/*" />
                    </div>
                  </div>
                </div>
                <div className="form-group col-10 form-group-btn btn-wrapper">
                  <button type="button" className="add-video-btn btn">Add more</button>
                </div>
              </div>
            </div>
            <div className="row upload-btn-row">
              <div className="form-group col-8 offset-3 btn-wrapper">
                <button type="submit" className="btn upload-btn">Upload all</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


const mapStatesToProps = states => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStatesToProps, mapDispatchToProps)(Dashboard);
