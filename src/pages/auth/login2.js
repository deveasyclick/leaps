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


const countries = ['Nigeria', 'Ethiopia', 'Kenya', 'Malawi'];
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
        signin: { email: { value: '', valid: false }, password: { value: '', valid: false } },
        signup: {
          email: { value: '', valid: false }, password: { value: '', valid: false }, country: { value: 'Nigeria', valid: false }, name: { value: '', valid: false },
        },
        forgot: { email: { value: '', valid: false } },
      },
      toSubmit: {},
      activePage: 'signin',
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
    const { form } = this.state;
    const { type, error } = this.props;
    if (type === authActionTypes.LOGIN_SUCCESS || type === authActionTypes.CHECK_AUTH_SUCCESS) {
      return <Redirect to="/" />;
    }
    const { activePage } = this.state;
    return (
      <section className="Login2 container-fluid">
        <div className="row">
          <div className="offset-md-4 col-md-4 col-12 content-container">
            <div className="row">
              <div className="col-12">
                <div className="title">
                  <h1>Sign in to your account</h1>
                </div>

                <div className="tab-control">
                  <button
                    type="button"
                    onClick={(e) => {
                      this.setState({ activePage: 'signin' });
                    }}
                    className={`btn signin ${activePage === 'signin' ? 'show' : ''}`}
                  >
                    Sign in
                  </button>
                  <button
                    onClick={(e) => {
                      this.setState({ activePage: 'signup' });
                    }}
                    type="button"
                    className={`btn signup ${activePage === 'signup' ? 'show' : ''}`}
                  >
                    Sign up
                  </button>
                  <button
                    onClick={(e) => {
                      this.setState({ activePage: 'forgot' });
                    }}
                    type="button"
                    className={`btn forgot ${activePage === 'forgot' ? 'show' : ''}`}
                  >
                    Forgot
                  </button>
                </div>
              </div>
            </div>
            <form className={`row tab-content signin-content ${activePage === 'signin' ? 'show' : ''}`}>
              <div className="caret" />
              <div className="form-group col-12">
                <input type="text" className="form-control" name="email" placeholder="Email" />
              </div>
              <div className="form-group col-12">
                <input type="password" className="form-control" name="email" placeholder="Password" />
              </div>
              <div className="form-group col-12">
                <button type="submit" className="btn submit-btn">Signin</button>
              </div>
            </form>
            <div className={`row tab-content signup-content ${activePage === 'signup' ? 'show' : ''}`}>
              <div className="caret" />
              <div className="form-group col-12">
                <input
                  type="text"
                  onChange={this.handleInputChange}
                  value={form.signup.name.value}
                  className="form-control"
                  name="name"
                  placeholder="Fullname"
                />
              </div>
              <div className="form-group col-12">
                <input
                  type="email"
                  onChange={this.handleInputChange}
                  value={form.signup.email.value}
                  className="form-control"
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div className="form-group col-12">
                <input
                  onChange={this.handleInputChange}
                  value={form.signup.password.value}
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <div className="form-group col-12">
                <select
                  name="country"
                  id="country"
                  onChange={this.handleInputChange}
                  value={form.signup.country.value}
                  className="form-control"
                  aria-describedby="countryId"
                >
                  {
                      countries.map((country, ind) => (
                        <option value={country} key={ind}>
                          {country}
                        </option>
                      ))
                    }
                </select>
              </div>
              <div className="form-group col-12">
                <button type="submit" className="btn submit-btn">Sign up</button>
              </div>
            </div>
            <div className={`row tab-content forgot-content ${activePage === 'forgot' ? 'show' : ''}`}>
              <div className="caret" />
              <div className="form-group col-12">
                <input type="text" className="form-control" name="email" placeholder="Email" />
              </div>
              <div className="form-group col-12">
                <button type="submit" className="btn submit-btn">Forgot password</button>
              </div>
            </div>
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
