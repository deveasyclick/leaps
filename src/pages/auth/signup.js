import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Button from './components/button';
import bookLover from '../../assets/illustrations/undraw_book_lover_mkck.svg';
import Loader from '../../assets/images/Spinner-1s-200px.svg';
import { signup } from '../../redux/auth/auth.action';
import authActionTypes from '../../redux/auth/auth.actionTypes';
import { validator } from '../../helpers/utils';

import './style.scss';


function printError(type, error) {
  switch (type) {
    case authActionTypes.SIGNUP_FAILED:
      return <p className="error-text">{error}</p>;
    case authActionTypes.SIGNUP_SUCCESS:
      return <p className="success-text">Success!</p>;
    default: return null;
  }
}
export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: { value: '', valid: false }, password: { value: '', valid: false },
      },
      toSubmit: {},
      showInvalid: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.formIsValid = this.formIsValid.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static getDerivedStateFromProps(props) {
    if (props.type === authActionTypes.SIGNUP_SUCCESS) {
      return <Redirect to="/" />;
    }
    return null;
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ showInvalid: false });
    if (!this.formIsValid()) {
      this.setState({ showInvalid: true });
      return;
    }
    const { toSubmit } = this.state;
    const { register } = this.props;
    register(toSubmit);
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

  formIsValid() {
    const { form } = this.state;
    const formKeys = Object.keys(form);
    const validCount = formKeys.filter(k => form[k].valid === true).length;
    return validCount === formKeys.length;
  }

  render() {
    const { form, showInvalid } = this.state;
    const { type, error } = this.props;
    return (
      <section className="Signup container-fluid">
        <div className="row">
          <div className="col-md-7 right-container">
            <div className="container">
              <div className="row">
                <div className="image-wrapper">
                  <img src={bookLover} alt="" width="600px" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-5 form-wrapper">
            <form className="container" onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col-12">
                  <h1 className="h1 welcome-heading">WELCOME TO LEAPS</h1>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="email" className="col-12 label">Email</label>
                <div className="col-12 col-md-8">
                  <input type="text" name="email" id="email" className="form-control" placeholder="Email" aria-describedby="emailId" value={form.email.value} onChange={this.handleInputChange} />
                  {
                    showInvalid && !form.email.valid
                    && <p className="input-error-text">Invalid email entered</p>
                  }
                  <small id="emailId" className="text-muted">Email</small>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="password" className="col-12 col-md-6 label">
                  Password
                </label>
                <div className="col-12 col-md-8">
                  <input type="password" name="password" id="password" className="form-control" placeholder="Password" aria-describedby="passwordId" value={form.password.value} onChange={this.handleInputChange} />
                  {
                    showInvalid && !form.password.valid
                    && <p className="input-error-text">please enter a valid password</p>
                  }
                  <small id="passwordId" className="text-muted">Password</small>
                </div>
              </div>
              <div className="form-group form-group-btn row">
                <div className="col-12 col-md-8">
                  <Button className="signup-btn" type="submit">
                    {type === authActionTypes.SIGNUP_LOADING
                      ? (
                        <span className="preloader-wrapper">
                          <img src={Loader} alt="preloader" className="preloader" width="35px" />
                        </span>
                      )
                      : <span className="signup-text">Signup</span>
                  }
                  </Button>
                  {printError(type, error)}
                </div>
              </div>
              <div className="form-group row">
                <div className="col-12 col-md-8 d-flex justify-content-center">
                  <Link className="forgot-password-link" to="/password-reset">Forgot Password?</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}


const mapStateToProps = state => ({
  type: state.auth.type,
  error: state.auth.error,
});
const mapDispatchToProps = dispatch => ({
  register: obj => dispatch(signup(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
