import React from 'react';
import { connect } from 'react-redux';
import { FiUser } from 'react-icons/fi';
import './index.scss';

class AccountComponent extends React.Component {
  render() {
    return (
      <section className="Account .container-fluid">
        <div className="row">
          <div className="col-4 card-column">
            <div className="card">
              <div className="card-body container-fluid">
                <div className="row name-container">
                  <div className="col-7 name-wrapper">
                    <h3 className="name">Adeniyi yusuf</h3>
                    <strong className="address">Nigeria</strong>
                  </div>
                  <div className="col-5 image-container">
                    <div className="user-icon-wrapper">
                      <div className="user-icon">
                        <FiUser size={40} />

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <p className="upload-picture">UPLOAD PICTURE</p>
                <p className="remove-picture">REMOVE PICTURE</p>
              </div>
            </div>
          </div>
          <div className="col-8 form-column">
            <div className="row header d-flex align-items-center">
              <p className="profile">Profile</p>
              <small className="notice">The information can be edited</small>
            </div>
            <form className="row form">
              <div className="inputs-wrapper">
                <div className="form-group col-12">
                  <div className="label">Name *</div>
                  <input type="text" className="form-control" />
                </div>
                <div className="form-group col-12">
                  <div className="label">Email *</div>
                  <input type="text" className="form-control" />
                </div>
                <div className="form-group col-12">
                  <input type="text" className="form-control" placeholder="Phone Number" />
                </div>
                <div className="form-group col-12">
                  <div className="label">Country *</div>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="form-group col-12 btn-wrapper">
                <button type="submit" className="btn save-details-btn">SAVE DETAILS</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = states => ({});
const mapDispatchToProps = dipatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AccountComponent);
