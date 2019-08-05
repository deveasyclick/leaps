import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';

class AdminDashboard extends Component {
  render() {
    return <p>I am an admin</p>;
  }
}


const mapPropsToState = state => ({});
const mapPropsToDispatch = dispatch => ({});
export default connect(mapPropsToState, mapPropsToDispatch)(AdminDashboard);
