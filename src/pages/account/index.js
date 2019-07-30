import React from 'react';
import { connect } from 'react-redux';
import { FiUser } from 'react-icons/fi';
import * as storage from '../../helpers/token';
import { validator } from '../../helpers/utils';
import Loader from 'react-loader-spinner';
import dashActionTypes from '../../redux/dash/dash.actionTypes';
import { updateUserDetails } from '../../redux/dash/dash.action';

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
        email: { value: '', valid: false }
      },
      toSubmit: {},
      imgSrc: '',
      updated:false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.imageRef = React.createRef();
  }

  onSubmit(e) {
    e.preventDefault();
    const { toSubmit } = this.state;
    const { updateUser } = this.props;
    updateUser(toSubmit);
  }

  handleInputChange(e) {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      let file = files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => this.setState({ imgSrc: reader.result });
      this.setState(p => ({
        toSubmit: { ...p.toSubmit, [name]: file },
        imgSrc: reader.result,
        updated:true,
        form: {
          ...p.form,
          [name]: {
            value: '',
            valid: true,
            file
          }
        }
      }));
    } else {
      this.setState(p => ({
        toSubmit: { ...p.toSubmit, [name]: value },
        updated:true,
        form: {
          ...p.form,
          [name]: {
            value: value,
            valid: validator(value, type)
          }
        }
      }));
    }
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  componentDidMount() {
    const user = storage.getToken();
    const { form, toSubmit} = this.state;
    let {imgSrc} = this.state;
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
      this.setState({ form, imgSrc });
    }
  }

  render() {
    const { form, imgSrc } = this.state;
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
                  <div className="col-7 name-wrapper">
                    <h3 className="name">Adeniyi yusuf</h3>
                    <strong className="address">Nigeria</strong>
                  </div>
                  <div className="col-5 image-container">
                    <div className="user-icon-wrapper">
                      <div className="user-icon">
                        {imgSrc ? (
                          <img
                            src={imgSrc}
                            width="100%"
                            alt="user"
                            className="img"
                          />
                        ) : (
                          <FiUser size={40} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <p
                  className="upload-picture"
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
                <p className="remove-picture">REMOVE PICTURE</p>
              </div>
            </div>
          </div>
          <div className="col-md-8 col-12 form-column">
            <div className="row header d-flex align-items-center">
              <p className="profile">Profile</p>
              <small className="notice">The information can be edited</small>
            </div>
            <form className="row form" onSubmit={this.onSubmit}>
              <div className="inputs-wrapper">
                <div className="form-group col-12">
                  <div className="label">Name *</div>
                  <input
                    name="name"
                    onChange={this.handleInputChange}
                    type="text"
                    className="form-control"
                    value={form.name.value}
                  />
                </div>
                <div className="form-group col-12">
                  <div className="label">Email *</div>
                  <input
                    name="email"
                    type="text"
                    onChange={this.handleInputChange}
                    className="form-control"
                    value={form.email.value}
                  />
                </div>
                <div className="form-group col-12">
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
                <div className="form-group col-12">
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
              <div className="form-group col-12 btn-wrapper">
                {dash.type === dashActionTypes.UPDATE_DETAILS_LOADING ? (
                  <button type="submit" className="btn upload-btn">
                    <Loader
                      type="Circles"
                      color="#00BFFF"
                      height="20"
                      width="100"
                    />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!formIsValid}
                    className="btn save-details-btn"
                  >
                    SAVE DETAILS
                  </button>
                )}

                {dash.type === dashActionTypes.UPDATE_DETAILS_SUCCESS && (
                  <p className="success-feedback">User details updated! </p>
                )}
                {dash.type === dashActionTypes.UPDATE_DETAILS_FAILED && (
                  <p className="error-feedback">{dash.error}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = states => ({
  dash: states.dash
});
const mapDispatchToProps = dipatch => ({
  updateUser: user => dipatch(updateUserDetails(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountComponent);
