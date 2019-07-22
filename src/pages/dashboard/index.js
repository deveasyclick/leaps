import React, { Component } from 'react';
import { connect } from 'react-redux';

import { validator } from '../../helpers/utils';
import './index.scss';
import 'react-tabs/style/react-tabs.css';


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
        pdf: { value: '', valid: false },
      },
      toSubmit: {},
      showInvalid: false,
      activeContent: 'text',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.formIsValid = this.formIsValid.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleResourceBtnClick = this.handleResourceBtnClick.bind(this);
  }

  formIsValid() {
    const { form } = this.state;
    const formKeys = Object.keys(form);
    const validCount = formKeys.filter(k => form[k].valid === true).length;
    return validCount === formKeys.length;
  }

  handleInputChange(e) {
    const { name, value, type } = e.target;
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

  onSubmit(e) {}

  handleResourceBtnClick(type) {
    let activeContent = 'text';
    switch (type) {
      case 'pdf': activeContent = 'pdf'; break;
      case 'image': activeContent = 'image'; break;
      case 'video': activeContent = 'video'; break;
      default: activeContent = 'text';
    }
    this.setState({ activeContent });
  }

  render() {
    const { form, showInvalid, activeContent } = this.state;
    // const { type, error } = this.props;
    return (
      <div className="container Dashboard">
        <div className="row">
          <form className="content offset-2 col-8 form">
            <div className="row">
              <div className="form-group col-6 subject-topic-row">
                <select value={form.subject.value} onChange={this.handleInputChange} className="form-control" name="subject" id="subject">
                  <option value="Health Education">Health Education</option>
                  <option value="Civic Studies">Civic Studies</option>
                  <option value="Integrated Science">Integrated Science</option>
                </select>
              </div>
              <div className="form-group col-6">
                <label htmlFor="topic" />
                <input
                  type="text"
                  className="form-control"
                  name="topic"
                  id="topic"
                  placeholder="Topic"
                  value={form.topic.value}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="row tags">
              <div className="offset-1 col-4">
                <p className="selected-tags">Tags selected for you:</p>
              </div>
              <div className="col-6 tags-wrapper">
                <span className="tag">
                  <span title="delete" className="delete-tag">x</span>
                      Hello
                </span>
                <span className="tag">
                  <span title="delete" className="delete-tag">x</span>
                      How far
                </span>
              </div>
            </div>

            <div className="row d-flex justify-content-center upload-resources-heading-row">
              <div className="offset-3 col-9">
                <h3 className="upload-text">
                Upload Resource content!
                </h3>
              </div>
            </div>
            <div className="row resources-btn-row">
              <div className="col-8 d-flex btn-wrapper offset-1">
                <button type="button" className={`text-btn btn ${activeContent === 'text' ? 'active' : ''}`} onClick={() => this.handleResourceBtnClick('text')}>Texts</button>
                <button type="button" className={`pdf-btn btn ${activeContent === 'pdf' ? 'active' : ''}`} onClick={() => this.handleResourceBtnClick('pdf')}>Pdfs</button>
                <button type="button" className={`image-btn btn ${activeContent === 'image' ? 'active' : ''}`} onClick={() => this.handleResourceBtnClick('image')}>Images</button>
                <button type="button" className={`video-btn btn ${activeContent === 'video' ? 'active' : ''}`} onClick={() => this.handleResourceBtnClick('video')}>Videos</button>
              </div>
            </div>
            <div className="row content-row">
              <div className={`offset-1 col-10 text-content content ${activeContent === 'text' ? 'show' : ''}`}>
                <div className="form-group col-10">
                  <input
                    type="text"
                    value={form.heading.value}
                    onChange
                    placeholder="Heading"
                    name="heading"
                    className="form-control"
                  />
                </div>
                <div className="form-group col-10">
                  <textarea className="form-control" name="excerpt" id="excerpt" rows="3" onChange={this.handleInputChange} placeholder="Excerpt" value={form.excerpt.value} />
                </div>
                <div className="form-group col-10">
                  <textarea className="form-control" name="definition" id="definition" rows="5" onChange={this.handleInputChange} placeholder="Definition" value={form.definition.value} />
                </div>
                <div className="form-group col-10 form-group-btn">
                  <button type="button" className="add-text-btn btn">Add more</button>
                </div>
              </div>
              <div className={`offset-1 col-10 pdf-content content ${activeContent === 'pdf' ? 'show' : ''}`}>
                <div className="form-group col-10">
                  <input
                    type="file"
                    value={form.pdf.value}
                    onChange
                    placeholder="Select a pdf file"
                    name="pdf"
                    className="form-control"
                  />
                </div>
              </div>
              <div className={`offset-1 col-10 image-content content ${activeContent === 'image' ? 'show' : ''}`}>Images content</div>
              <div className={`offset-1 col-10 video-content content ${activeContent === 'video' ? 'show' : ''}`}>Videos content</div>
            </div>
            <div className="row upload-btn-row">
              <div className="form-group col-8 offset-1 btn-wrapper">
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
