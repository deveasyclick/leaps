import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from './components/button';
import bookLover from '../../assets/illustrations/undraw_book_lover_mkck.svg';
import Loader from '../../assets/images/Spinner-1s-200px.svg';

import './style.scss';

export default class ForgotPassword extends Component {
  render() {
    return (
      <section className="ForgotPassword container-fluid">
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
            <form className="container">
              <div className="row">
                <div className="col-12">
                  <h1 className="h1 welcome-heading">WELCOME TO LEAP</h1>
                  <h3 className="h3">Forgot Your Password?</h3>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="email" className="col-12 label">Email</label>
                <div className="col-12 col-md-8">
                  <input type="text" name="email" id="email" className="form-control" placeholder="Email" aria-describedby="emailId" />
                  <small id="emailId" className="text-muted">Email</small>
                </div>
              </div>
              <div className="form-group form-group-btn row">
                <div className="col-12 col-md-8">
                  <Button className="forgotpassword-btn">
                    <span className="forgotpassword-text">Send Reset Instructions</span>
                    <span className="preloader-wrapper">
                      <img src={Loader} alt="preloader" className="preloader" width="35px" />
                    </span>
                  </Button>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-12 col-md-8 d-flex justify-content-center">
                  <Link className="forgot-password-link" to="/login">Login</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
