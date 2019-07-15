import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Button from './components/button';
import bookLover from '../../assets/illustrations/undraw_book_lover.svg';
import Loader from '../../assets/images/Spinner-1s-200px.svg';
import authActionTypes from '../../redux/auth/auth.actionTypes';
import { login } from '../../redux/auth/auth.action';
import { validator } from '../../helpers/utils';
import Logo from '../../assets/images/logo-only_mobile.png';

import './style.scss';


function printError(type, error) {
  switch (type) {
    case authActionTypes.LOGIN_FAILED:
      return <p className="error-text">{error}</p>;
    case authActionTypes.LOGIN_SUCCESS:
      return <p className="success-text">Success!</p>;
    default: return null;
  }
}
export class Login extends Component {
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

  onSubmit(e) {
    e.preventDefault();
    this.setState({ showInvalid: false });
    if (!this.formIsValid()) {
      this.setState({ showInvalid: true });
      return;
    }
    const { toSubmit } = this.state;
    const { login: loginUser } = this.props;
    loginUser(toSubmit);
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
    if (type === authActionTypes.LOGIN_SUCCESS) {
      return <Redirect to="/" />;
    }
    return (
      <section className="Login container-fluid">
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
                <div className="col-12 top-login-column">
                  <div className="logo-wrapper">
                    <img src={Logo} alt="Leaps Logo" />
                  </div>
                  <h1 className="h1 welcome-heading">WELCOME TO LEAPS,</h1>
                  <h3 className="h3"><small className="login-notice">Login as a Reseacher!</small></h3>
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
                  {' '}
                  <small>
                    <Link className="notice-link" title="forgot your password?" to="/password-reset">Forgot?</Link>
                  </small>
                </label>
                <div className="col-12 col-md-8">
                  <input type="password" name="password" id="password" className="form-control" onChange={this.handleInputChange} value={form.password.value} placeholder="Password" aria-describedby="passwordId" />
                  {
                    showInvalid && !form.password.valid
                    && <p className="input-error-text">please enter a valid password</p>
                  }
                  <small id="passwordId" className="text-muted">Password</small>
                </div>
              </div>
              <div className="form-group row">
                <div className="forgot-password col-12 d-flex justify-content-center ">
                  <Link className="forgot-password-link" to="/password-reset">Forgot Password?</Link>
                </div>
              </div>
              <div className="form-group form-group-btn row">
                <div className="col-12 col-md-8">
                  <Button className="login-btn" type="submit">
                    {type === authActionTypes.LOGIN_LOADING
                      ? (
                        <span className="preloader-wrapper">
                          <img src={Loader} alt="preloader" className="preloader" width="35px" />
                        </span>
                      )
                      : <span className="login-text">Login</span>
                  }
                  </Button>
                  {printError(type, error)}

                </div>
              </div>
              <div className="form-group row">
                <div className="col-12 col-md-8 d-flex justify-content-center">
                  <span>
                    Not a member?
                    <Link className="notice-link signup-link" to="/signup">Sign up now</Link>
                  </span>
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
  login: obj => dispatch(login(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
