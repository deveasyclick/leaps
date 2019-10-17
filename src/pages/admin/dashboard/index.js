import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import { FiClock, FiMoreVertical, FiCheck } from 'react-icons/fi';
import { IoMdCheckmarkCircle, IoMdArrowDropdown } from 'react-icons/io';
import ReactTable from 'react-table';
import Image from '../../../assets/images/favicon.png';
import 'react-table/react-table.css';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { activeContent: 'texts' };
    this.handleResourceBtnClick = this.handleResourceBtnClick.bind(this);
  }

  handleResourceBtnClick(type) {
    const { user } = this.state;
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

    const columns = [
      {
        Header: 'Name',
        accessor: 'name', // String-based value accessors!
        Cell: props => <span className="name cell">{props.value}</span>, // Custom cell components!
      },
      {
        Header: 'School',
        accessor: 'school',
        Cell: props => <span className="school cell">{props.value}</span>, // Custom cell components!
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: props => <span className="status cell">{props.value}</span>, // Custom cell components!
      },
      {
        Header: 'Actions',
        accessor: 'action',
        Cell: props => (
          <div className="actions cell">
            <FiMoreVertical size={18} />
          </div>
        ), // Custom cell components!
      },
    ];
    const { activeContent } = this.state;
    return (
      <React.Fragment>
        <section className="container Admin">
          <div className="row btn-row">
            <button className="btn" type="button">
              United Kingdom
            </button>
            <button className="btn" type="button">
              Nigeria
            </button>
            <button className="btn" type="button">
              Kenya
            </button>
            <button className="btn" type="button">
              Malawi
            </button>
            <button className="btn" type="button">
              Ethiopia
            </button>
          </div>
          <div className="row">
            <h3 className="researchers-title">Researchers</h3>
          </div>
          <div className="row cards-row">
            <div className="researcher card">
              <div className="details-wrapper d-flex justify-content-between">
                <div className="details">
                  <p className="name">Researchers name</p>
                  <p className="uploads">4000 Uploads</p>
                </div>
                <div className="image">
                  <img src={Image} alt="" width="100%" className="img" />
                </div>
              </div>
              <div className="stats d-flex">
                <p className="pending d-flex align-items-center">
                  <FiClock size={18} className="pending-icon" />
                  19 pending
                </p>
                <p className="approved">
                  <IoMdCheckmarkCircle size={18} className="approved-icon" />
                  11 approved
                </p>
              </div>
            </div>
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
                data={data}
                columns={columns}
                className="teachers-table -striped -highlight"
              />
            </div>
          </div>
          <React.Fragment className="second-page">
            <div className="Resources">
              <div className="row cards-row">
                <div className="researcher card">
                  <div className="details-wrapper d-flex justify-content-between">
                    <div className="details">
                      <p className="name">Country</p>
                      <p className="uploads">Name</p>
                    </div>
                    <div className="icon">
                      <FiMoreVertical size={20} />
                    </div>
                  </div>
                  <div className="stats d-flex">
                    <p className="pending d-flex align-items-center">
                      <FiClock size={18} className="pending-icon" />
                      19 pending
                    </p>
                    <p className="approved">
                      <IoMdCheckmarkCircle
                        size={18}
                        className="approved-icon"
                      />
                      11 approved
                    </p>
                  </div>
                </div>
              </div>
              <div className="row resources-row">
                <div className="row resources-btn-row">
                  <div className="col-md-10 col-12 offset-0 d-flex btn-wrapper offset-md-1">
                    <button
                      type="button"
                      className={`text-btn btn ${
                        activeContent === 'texts' ? 'active' : ''
                      }`}
                      onClick={() => this.handleResourceBtnClick('text')}
                    >
                      {activeContent === 'texts' ? (
                        <FiCheck className="check" />
                      ) : (
                        ''
                      )}
                    </button>
                    <button
                      type="button"
                      className={`pdf-btn btn ${
                        activeContent === 'pdf' ? 'active' : ''
                      }`}
                      onClick={() => this.handleResourceBtnClick('pdf')}
                    >
                      {activeContent === 'pdf' ? (
                        <FiCheck className="check" />
                      ) : (
                        ''
                      )}
                      Pdfs
                    </button>
                    <button
                      type="button"
                      className={`image-btn btn ${
                        activeContent === 'image' ? 'active' : ''
                      }`}
                      onClick={() => this.handleResourceBtnClick('image')}
                    >
                      {activeContent === 'image' ? (
                        <FiCheck className="check" />
                      ) : (
                        ''
                      )}
                      Images
                    </button>
                    <button
                      type="button"
                      className={`video-btn btn ${
                        activeContent === 'video' ? 'active' : ''
                      }`}
                      onClick={() => this.handleResourceBtnClick('video')}
                    >
                      {activeContent === 'video' ? (
                        <FiCheck className="check" />
                      ) : (
                        ''
                      )}
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
              </div>
            </div>
          </React.Fragment>
        </section>
      </React.Fragment>
    );
  }
}

const mapPropsToState = state => ({});
const mapPropsToDispatch = dispatch => ({});
export default connect(
  mapPropsToState,
  mapPropsToDispatch,
)(AdminDashboard);
