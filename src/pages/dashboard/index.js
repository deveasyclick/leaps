import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FiPlus, FiCheck, FiEdit, FiEdit2, FiEdit3 } from 'react-icons/fi';
import Loader from 'react-loader-spinner';
import { isURL } from 'validator';
import { validator } from '../../helpers/utils';
import * as storage from '../../helpers/token';
import { uploadResources, fetchResearcher } from '../../redux/dash/dash.action';
import dashActionTypes from '../../redux/dash/dash.actionTypes';
import Dialog from '../../components/dialog';
import { Dialog2 } from '../../components/dialog';
import './index.scss';

const ignoredWords = ['is', 'the', 'there', 'they', 'we', 'when', 'who', 'how'];
export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        subject: { value: 'health education', valid: true },
        topic: { value: '', valid: false },
        heading: { value: '', valid: false },
        excerpt: { value: '', valid: false },
        definition: { value: '', valid: false },
        pdf: { value: '', files: [], valid: false },
        image: { value: '', files: [], valid: false },
        video: { value: '', files: [], valid: false },
        pdfTitle: { value: '', valid: false },
        imageTitle: { value: '', valid: false },
        videoTitle: { value: '', valid: false },
        tags: { value: '', valid: false },
        moreTags: { value: '', valid: false }
      },
      user: null,
      toSubmit: {},
      activeContent: 'texts',
      temporaryFiles: [],
      documents: {
        subject: '',
        topic: '',
        texts: [],
        pdf: [],
        image: [],
        video: [],
        tags: []
      },
      showedResources: 'texts',
      fileSources: { video: [], image: [] },
      dialogClicked: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleResourceBtnClick = this.handleResourceBtnClick.bind(this);
    this.AddResources = this.AddResources.bind(this);
    this.setTags = this.setTags.bind(this);
    this.pdfFile = React.createRef();
    this.imageFile = React.createRef();
    this.videoFile = React.createRef();
    this.deleteTag = this.deleteTag.bind(this);
    this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
    this.displayFiles = this.displayFiles.bind(this);
    this.addMoreTags = this.addMoreTags.bind(this);
    this.handleDialogNoClicked = this.handleDialogNoClicked.bind(this);
  }
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };
  handleInputChange(e) {
    const { name, value, type, files } = e.target;
    const docFiles = files ? Array.from(files) : [];

    if (type === 'file') {
      let filename = 'image';
      if (name === 'videoFile') filename = 'video';
      else if (name === 'imageFile') filename = 'image';
      else filename = 'pdf';

      this.setState(p => ({
        toSubmit: { ...p.toSubmit, [name]: value },
        form: {
          ...p.form,
          [filename]: {
            value: '',
            files: docFiles,
            valid: docFiles.length > 0
          }
        }
      }));
    } else {
      this.setState(p => ({
        toSubmit: { ...p.toSubmit, [name]: value },
        form: {
          ...p.form,
          [name]: {
            value,
            valid: validator(value, type, name),
            files: []
          }
        }
      }));
    }
  }
  deleteTag(index) {
    const { documents } = this.state;
    const { tags } = documents;
    tags.splice(index, 1);
    documents.tags = tags;
    this.setState({ documents });
  }
  addMoreTags() {
    const { form, documents } = this.state;
    const { value: values } = form.moreTags;
    let { tags } = documents;
    values
      .replace(/\s/g, '')
      .split(',')
      .map(value => value.toLowerCase())
      .forEach(value => {
        if (!tags.includes(value) && !ignoredWords.includes(value) && value) {
          tags.push(value);
        }
      });
    documents.tags = tags;
    this.setState({ documents });
  }
  setTags(ev, check = false) {
    const { form, documents } = this.state;
    const { value: topic } = form.topic;
    let { tags } = documents;
    if (check && tags.length < 10) {
      tags = topic
        .split(' ')
        .map(tag => tag.toLowerCase())
        .filter(tag => {
          if (tag.length > 2 && !ignoredWords.includes(tag)) {
            return tag;
          }
          return false;
        });

      documents.tags = tags;
      this.setState({ documents });
    } else if (ev.which === 32 && tags.length < 10) {
      tags = topic
        .split(' ')
        .map(tag => {
          return tag.toLowerCase();
        })
        .filter(tag => {
          if (tag.length > 2 && !ignoredWords.includes(tag)) {
            return tag;
          }
          return false;
        });
      documents.tags = tags;
      this.setState({ documents });
    }
  }

  AddResources(name, isText = false) {
    const { documents, form } = this.state;
    let showedResources;
    if (isText) {
      const doc = {};
      doc.heading = form.heading.value;
      doc.excerpt = form.excerpt.value;
      doc.definition = form.definition.value;
      documents.texts.push(doc);
      showedResources = 'texts';
      form.heading.value = '';
      form.heading.valid = false;
      form.excerpt.value = '';
      form.excerpt.valid = false;
      form.definition.value = '';
      form.definition.valid = false;
    } else {
      documents[name].push({
        value: form[name].value ? form[name].value : form[name].files,
        title: form[`${name}Title`].value
      });
      showedResources = name;
      form[name].value = '';
      form[name].valid = false;
      form[name].files = [];
      form[`${name}Title`].value = '';
      form[`${name}Title`].valid = false;
    }
    documents.subject = form.subject;
    documents.topic = form.topic;
    this.setState({
      documents,
      showedResources,
      form
    });
    this.displayFiles(showedResources);
  }

  onSubmit(ev) {
    ev.preventDefault();
    this.setState({ dialogClicked: true });
  }
  displayFiles(fileType) {
    if (fileType === 'texts') {
      return;
    }
    const { documents, fileSources, activeContent } = this.state;
    const files = [];
    documents[fileType].forEach(fileArr => {
      if (typeof fileArr.value === 'string') return;
      fileArr.value.forEach(file => {
        files.push(file);
      });
    });
    Promise.all(
      files.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          //reader.onloadend = () => this.setState({ imgSrc: reader.result });
          reader.onloadend = () => resolve(reader.result);
        });
      })
    ).then(fileSource => {
      this.setState({
        fileSources: { ...fileSources, [activeContent]: fileSource }
      });
    });
  }
  componentDidUpdate(prevProps, prevStates) {
    let { user } = this.state;
    if (prevStates.activeContent !== this.state.activeContent) {
      this.setState({ temporaryFiles: [] });
    }
    if (
      this.props.dash.type === dashActionTypes.FETCH_RESEARCHER_SUCCESS &&
      JSON.stringify(user) !== JSON.stringify(this.props.dash.data)
    ) {
      const user = this.props.dash.data;
      this.setState({ user });
    }

    if (
      prevProps.dash.type !== this.props.dash.type &&
      this.props.dash.type === dashActionTypes.UPLOAD_RESOURCES_SUCCESS
    ) {
      const { documents, activeContent } = this.state;
      this.setState({
        documents: {
          subject: '',
          topic: '',
          texts: [],
          pdf: [],
          image: [],
          video: [],
          tags: []
        },
        form: {
          subject: { value: 'health education', valid: true },
          topic: { value: '', valid: false },
          heading: { value: '', valid: false },
          excerpt: { value: '', valid: false },
          definition: { value: '', valid: false },
          pdf: { value: '', files: [], valid: false },
          image: { value: '', files: [], valid: false },
          video: { value: '', files: [], valid: false },
          pdfTitle: { value: '', valid: false },
          imageTitle: { value: '', valid: false },
          videoTitle: { value: '', valid: false },
          tags: { value: '', valid: false },
          moreTags: { value: '', valid: false }
        }
      });
    }
  }
  componentDidMount() {
    const { getResearcher } = this.props;
    const user = storage.get('user');
    if (user) {
      this.setState({ user });
      getResearcher(user.uid);
    }
  }
  handleDialogNoClicked() {
    const { form, documents } = this.state;
    const { uploadResources: upload } = this.props;
    const user = storage.get('user');

    documents.user_name = user.name;
    documents.user_email = user.email;
    documents.user_id = user.uid;
    documents.user_country = user.country;
    documents.subject = form.subject.value;
    documents.topic = form.topic.value;
    documents.tags = documents.tags.concat(
      form.tags.value.split(',').filter(val => val !== '')
    );
    upload(documents);
    this.setState({ dialogClicked: false });
  }
  handleResourceBtnClick(type) {
    let showedResources = 'texts';
    let activeContent = 'texts';
    switch (type) {
      case 'image':
        activeContent = 'image';
        showedResources = 'image';
        break;
      case 'video':
        activeContent = 'video';
        showedResources = 'video';
        break;
      case 'text':
        activeContent = 'texts';
        showedResources = 'texts';
        break;
      default:
        activeContent = 'pdf';
        showedResources = 'pdf';
    }
    this.setState({ activeContent, showedResources });
  }

  render() {
    const {
      form,
      activeContent,
      documents,
      moreAdded,
      fileSources,
      showedResources,
      dialogClicked,
      user
    } = this.state;
    // const { type, error } = this.props;
    // const formKeys = Object.keys(form);
    // const validCount = formKeys.filter(k => form[k].valid === true).length;
    // const allFieldsAreValid = validCount === formKeys.length;
    const { dash } = this.props;
    const textFieldIsValid = !!(
      form.heading.value &&
      form.excerpt.value &&
      form.definition.value &&
      form.topic.value
    );
    const pdfIsValid =
      (isURL(form.pdf.value) && form.topic.valid) || form.pdf.files.length > 0;
    const imageIsValid =
      (isURL(form.image.value) && form.topic.valid) ||
      form.image.files.length > 0;
    const videoIsValid =
      (isURL(form.video.value) && form.topic.valid) ||
      form.video.files.length > 0;
    return (
      <div className='container-fluid Dashboard'>
        <div className='row'>
          {dialogClicked && (
            <Dialog2
              handleYes={() => this.setState({ dialogClicked: false })}
              handleNo={this.handleDialogNoClicked}
              title='Resource action'
              message={`Do you still want to add other resource type i.e (pdf, images & videos) to the topic ${form.topic.value}?`}
            />
          )}
          <form
            onSubmit={this.onSubmit}
            className='content offset-0 offset-md-2 col-md-8 col-12 form'>
            <div className='row'>
              <div className='form-group col-12 col-md-6 subject-topic-row'>
                <select
                  value={form.subject.value}
                  onChange={this.handleInputChange}
                  className='form-control'
                  name='subject'
                  id='subject'>
                  <option value='health education'>Health Education</option>
                  <option value='civic studies'>Civic Studies</option>
                  <option value='integrated science'>Integrated Science</option>
                </select>
              </div>
              <div className='form-group col-md-6 col-12'>
                <label htmlFor='topic' />
                <input
                  type='text'
                  className='form-control'
                  name='topic'
                  id='topic'
                  placeholder='Topic'
                  value={form.topic.value}
                  onChange={this.handleInputChange}
                  onKeyPress={this.setTags}
                  autoComplete='true'
                  onBlur={e => {
                    this.setTags(e, true);
                  }}
                />
              </div>
            </div>
            {documents.tags.length > 0 && (
              <div className='row tags-row'>
                <div className='offset-0 col-12 selected-tags-wrapper'>
                  <h3 className='selected-tags'>Tags selected for you</h3>
                </div>
                <div className='col-12 tags-wrapper'>
                  {documents.tags.map((tag, index) => (
                    <span className='tag' key={index}>
                      <span
                        onClick={e => this.deleteTag(index)}
                        title='delete'
                        className='delete-tag'>
                        x
                      </span>
                      <span className='tag-text'>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className='row tags-input-wrapper'>
              <div className='col-12'>
                <input
                  value={form.moreTags.value}
                  type='text'
                  className='form-control'
                  name='moreTags'
                  placeholder='Enters comma seprated list of tags e.g person, animal'
                  onChange={this.handleInputChange}
                  onBlur={this.addMoreTags}
                />
              </div>
            </div>
            <div className='row d-flex justify-content-center upload-resources-heading-row'>
              <div className='offset-0 offset-md-3 col-12 col-md-9'>
                <h3 className='upload-text'>Upload Resource content</h3>
              </div>
            </div>
            {
              <div className='row resources-row'>
                {documents[activeContent].map((resource, index) => {
                  if (activeContent === 'texts') {
                    return (
                      <div key={index} className='text-resource resource-card'>
                        <div className='card-title'>
                          <h3>{resource.heading}</h3>
                        </div>
                        <div className='card-body'>
                          <p className='p'>
                            {resource.definition.slice(0, 70)}
                            <span className='span'>...</span>
                          </p>
                        </div>
                      </div>
                    );
                  }
                  if (activeContent === 'video') {
                    if (typeof resource.value === 'string') {
                      return (
                        <div className='video-resource' key={index}>
                          <iframe
                            width='100%'
                            height='auto'
                            className='iframe'
                            src={resource.value.replace('watch?v=', 'embed/')}
                          />
                        </div>
                      );
                    }
                  }
                  if (activeContent === 'image') {
                    if (typeof resource.value === 'string') {
                      return (
                        <div className='image-resource' key={index}>
                          <img
                            src={resource.value}
                            alt=''
                            width='100%'
                            height='auto'
                          />
                        </div>
                      );
                    }
                  }
                  if (activeContent === 'pdf') {
                    if (typeof resource.value === 'string') {
                      return (
                        <div className='pdf-resource' key={index}>
                          <iframe
                            src={`https://docs.google.com/gview?url=${resource.value}&embedded=true`}
                            style={{ width: '100%' }}
                            frameBorder='0'
                          />
                        </div>
                      );
                    }
                  }
                })}
                {activeContent === showedResources &&
                  fileSources[activeContent] &&
                  fileSources[activeContent].length > 0 &&
                  fileSources[activeContent].map((fileSource, index) => {
                    if (activeContent === 'image') {
                      return (
                        <div className='image-resource' key={index}>
                          <img
                            src={fileSource}
                            alt=''
                            width='100%'
                            height='8rem'
                          />
                        </div>
                      );
                    }

                    if (activeContent === 'pdf') {
                      return (
                        <div className='pdf-resource' key={index}>
                          <object
                            type='application/pdf'
                            src={fileSource}
                            width='100%'
                            height='8rem'
                          />
                        </div>
                      );
                    }
                    if (activeContent === 'video') {
                      return (
                        <div className='video-resource' key={index}>
                          <video
                            src={fileSource}
                            width='100%'
                            height='8rem'
                            controls
                          />
                        </div>
                      );
                    }
                  })}
              </div>
            }

            <div className='row resources-btn-row'>
              <div className='col-md-10 col-12 offset-0 d-flex btn-wrapper offset-md-1'>
                <button
                  type='button'
                  className={`text-btn btn ${
                    activeContent === 'texts' ? 'active' : ''
                  }`}
                  onClick={() => this.handleResourceBtnClick('text')}>
                  {activeContent === 'texts' ? (
                    <FiCheck className='check' />
                  ) : (
                    ''
                  )}
                  Texts
                </button>
                <button
                  type='button'
                  className={`pdf-btn btn ${
                    activeContent === 'pdf' ? 'active' : ''
                  }`}
                  onClick={() => this.handleResourceBtnClick('pdf')}>
                  {activeContent === 'pdf' ? <FiCheck className='check' /> : ''}
                  Pdfs
                </button>
                <button
                  type='button'
                  className={`image-btn btn ${
                    activeContent === 'image' ? 'active' : ''
                  }`}
                  onClick={() => this.handleResourceBtnClick('image')}>
                  {activeContent === 'image' ? (
                    <FiCheck className='check' />
                  ) : (
                    ''
                  )}
                  Images
                </button>
                <button
                  type='button'
                  className={`video-btn btn ${
                    activeContent === 'video' ? 'active' : ''
                  }`}
                  onClick={() => this.handleResourceBtnClick('video')}>
                  {activeContent === 'video' ? (
                    <FiCheck className='check' />
                  ) : (
                    ''
                  )}
                  Videos
                </button>
              </div>
            </div>
            <div className='row content-row'>
              <div
                className={`offset-md-1 offset-0 col-md-11 col-12 text-content content ${
                  activeContent === 'texts' ? 'show' : ''
                }`}>
                <div className='text-content-form-group form-group col-md-11 col-12'>
                  <FiEdit className='edit-icon' />
                  <input
                    type='text'
                    value={form.heading.value}
                    onChange={this.handleInputChange}
                    placeholder='Heading'
                    name='heading'
                    autoComplete='true'
                    className='form-control text-form-control'
                  />
                </div>
                <div className='text-content-form-group form-group col-md-11 col-12'>
                  <FiEdit2 className='edit-icon' />
                  <textarea
                    className='form-control text-form-control'
                    name='excerpt'
                    id='excerpt'
                    rows={3}
                    onChange={this.handleInputChange}
                    placeholder='Excerpt'
                    value={form.excerpt.value}
                  />
                </div>
                <div className='form-group text-content-form-group  col-md-11 col-12'>
                  <FiEdit3 className='edit-icon' />
                  <textarea
                    className='form-control text-form-control'
                    name='definition'
                    id='definition'
                    rows='5'
                    onChange={this.handleInputChange}
                    placeholder='Definition'
                    value={form.definition.value}
                  />
                </div>
                <div className='form-group col-md-10 col-12 form-group-btn'>
                  {user && user.approved ? (
                    <button
                      type='button'
                      disabled={
                        !(
                          form.heading.valid &&
                          form.excerpt.valid &&
                          form.definition.valid
                        )
                      }
                      className='add-text-btn btn'
                      onClick={() => this.AddResources('', true)}>
                      Add resources
                    </button>
                  ) : (
                    <button type='button' disabled className='add-text-btn btn'>
                      Add resources
                    </button>
                  )}
                </div>
              </div>
              <div
                className={`offset-1 col-10 pdf-content content ${
                  activeContent === 'pdf' ? 'show' : ''
                }`}>
                <div className='row'>
                  <div className='form-group input-wrapper col-md-11 col-10'>
                    <input
                      type='text'
                      className='form-control title'
                      name='pdfTitle'
                      value={form.pdfTitle.value}
                      autoComplete='true'
                      placeholder='Title'
                      onChange={this.handleInputChange}
                    />
                    <input
                      type='text'
                      id='proxy'
                      className='form-control'
                      name='pdf'
                      value={form.pdf.value}
                      autoComplete='true'
                      onChange={this.handleInputChange}
                      placeholder='http://'
                    />
                    <div
                      className='icon-helper'
                      title='Attach a file'
                      onClick={() => {
                        this.pdfFile.current.click();
                      }}>
                      <FiPlus size={30} className='add-icon' />
                    </div>
                    <ul className='list pdf-list'>
                      {form.pdf.files.map((file, index) => (
                        <li key={index} className='list-item pdf-list-item'>
                          {file.name}
                        </li>
                      ))}
                    </ul>
                    <input
                      ref={this.pdfFile}
                      type='file'
                      name='pdfFile'
                      className='file'
                      onChange={this.handleInputChange}
                      value=''
                      multiple
                      accept='application/pdf,.doc'
                    />
                  </div>
                </div>
                <div className='form-group col-10 form-group-btn btn-wrapper'>
                  {user && user.approved ? (
                    <button
                      type='button'
                      disabled={!(form.pdf.valid && form.pdfTitle.valid)}
                      onClick={() => this.AddResources('pdf')}
                      className='add-pdf-btn btn'>
                      Add resources
                    </button>
                  ) : (
                    <button type='button' disabled className='add-pdf-btn btn'>
                      Add resources
                    </button>
                  )}
                </div>
              </div>
              <div
                className={`offset-1 col-10 image-content content ${
                  activeContent === 'image' ? 'show' : ''
                }`}>
                <div className='row'>
                  <div className='form-group input-wrapper col-md-11 col-10'>
                    <input
                      type='text'
                      className='form-control title'
                      name='imageTitle'
                      value={form.imageTitle.value}
                      autoComplete='true'
                      placeholder='Title'
                      onChange={this.handleInputChange}
                    />
                    <input
                      type='text'
                      id='proxy'
                      className='form-control'
                      name='image'
                      value={form.image.value}
                      onChange={this.handleInputChange}
                      placeholder='http://'
                      autoComplete='true'
                    />
                    <div
                      className='icon-helper'
                      title='Attach a file'
                      onClick={() => {
                        this.imageFile.current.click();
                      }}>
                      <FiPlus size={30} className='add-icon' />
                    </div>
                    <ul className='list pdf-list'>
                      {form.image.files.map((file, index) => (
                        <li key={index} className='list-item pdf-list-item'>
                          {file.name}
                        </li>
                      ))}
                    </ul>
                    <input
                      ref={this.imageFile}
                      type='file'
                      name='imageFile'
                      className='file'
                      onChange={this.handleInputChange}
                      multiple
                      value=''
                      accept='image/*'
                    />
                  </div>
                </div>
                <div className='form-group col-10 form-group-btn btn-wrapper'>
                  {user && user.approved ? (
                    <button
                      type='button'
                      disabled={!(form.image.valid && form.imageTitle.valid)}
                      onClick={() => this.AddResources('image')}
                      className='add-image-btn btn'>
                      Add resources
                    </button>
                  ) : (
                    <button
                      type='button'
                      disabled
                      className='add-image-btn btn'>
                      Add resources
                    </button>
                  )}
                </div>
              </div>
              <div
                className={`offset-1 col-10 video-content content ${
                  activeContent === 'video' ? 'show' : ''
                }`}>
                <div className='row'>
                  <div className='form-group input-wrapper col-md-11 col-10'>
                    <input
                      type='text'
                      className='form-control title'
                      name='videoTitle'
                      value={form.videoTitle.value}
                      autoComplete='true'
                      placeholder='Title'
                      onChange={this.handleInputChange}
                    />
                    <input
                      type='text'
                      placeholder='http://'
                      id='proxy'
                      className='form-control'
                      name='video'
                      value={form.video.value}
                      onChange={this.handleInputChange}
                      autoComplete='true'
                    />
                    <div
                      className='icon-helper'
                      title='Attach a file'
                      onClick={() => {
                        this.videoFile.current.click();
                      }}>
                      <FiPlus size={30} className='add-icon' />
                    </div>
                    <ul className='list pdf-list'>
                      {form.video.files.map((file, index) => (
                        <li key={index} className='list-item pdf-list-item'>
                          {file.name}
                        </li>
                      ))}
                    </ul>
                    <input
                      ref={this.videoFile}
                      type='file'
                      name='videoFile'
                      className='file'
                      onChange={this.handleInputChange}
                      value=''
                      multiple
                      accept='video/mp4,video/x-m4v,video/*'
                    />
                  </div>
                </div>
                <div className='form-group col-10 form-group-btn btn-wrapper'>
                  {user && user.approved ? (
                    <button
                      type='button'
                      disabled={!(form.video.valid && form.videoTitle.valid)}
                      onClick={() => this.AddResources('video')}
                      className='add-video-btn btn'>
                      Add resources
                    </button>
                  ) : (
                    <button
                      type='button'
                      disabled
                      className='add-video-btn btn'>
                      Add resources
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className='row upload-btn-row'>
              <div className='form-group col-8 offset-3 btn-wrapper'>
                {dash.type === dashActionTypes.UPLOAD_RESOURCES_LOADING ? (
                  <button type='submit' className='btn upload-btn'>
                    <Loader
                      type='Circles'
                      color='#00BFFF'
                      height='20'
                      width='100'
                    />
                  </button>
                ) : (
                  <button
                    type='submit'
                    disabled={
                      (documents.texts.length < 1 &&
                        documents.pdf.length < 1 &&
                        documents.image.length < 1 &&
                        documents.video.length < 1) ||
                      !form.topic.value
                    }
                    className='btn upload-btn'>
                    Upload all
                  </button>
                )}
                {dash.type === dashActionTypes.UPLOAD_RESOURCES_SUCCESS && (
                  <Dialog message='Upload successful' />
                )}
                {dash.type === dashActionTypes.UPLOAD_RESOURCES_FAILED && (
                  <Dialog message={dash.error} />
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
  dash: states.dash
});
const mapDispatchToProps = dispatch => ({
  uploadResources: document => dispatch(uploadResources(document)),
  getResearcher: uid => dispatch(fetchResearcher(uid))
});
export default connect(
  mapStatesToProps,
  mapDispatchToProps
)(Dashboard);
