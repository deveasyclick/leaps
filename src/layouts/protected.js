import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import authActionTypes from '../redux/auth/auth.actionTypes';
import navActionTypes from '../redux/nav/nav.action-type';
import { checkAuth } from '../redux/auth/auth.action';
import Loading from './loading';
import '../config/firebase';

import Sidebar from './components/sidebar/index';
import { Header } from './components/header/index';
import './style.scss';

export class ProtectedLayout extends React.Component {
  componentDidMount() {
    const { checkAuth: checkIfAuth } = this.props;
    checkIfAuth();
  }

  render() {
    const {
      component: Component,
      isAuthenticated,
      data,
      type,
      nav,
      ...rest
    } = this.props;
    const layoutStyle = {
      width:
        nav.type === navActionTypes.TOGGLE_NAV && nav.show ? '80%' : '100%',
      marginLeft:
        nav.type === navActionTypes.TOGGLE_NAV && nav.show ? '20%' : '0',
    };
    return (
      <Route
        {...rest}
        render={(matchProps) => {
          if (type === authActionTypes.CHECK_AUTH_FAILED) {
            return (
              <Redirect
                to={{
                  pathname: '/login',
                  states: { from: matchProps.location },
                }}
              />
            );
          }
          if (
            type === authActionTypes.SIGNUP_SUCCESS
            || type === authActionTypes.LOGIN_SUCCESS
            || type === authActionTypes.CHECK_AUTH_SUCCESS
          ) {
            // return console.log('data', data);
            if (data.isAdmin) {
              return (
                <Redirect
                  to={{
                    pathname: '/admin',
                    states: { from: matchProps.location },
                  }}
                />
              );
            }
            return (
              <React.Fragment>
                <Sidebar user={data} />
                <div style={layoutStyle} className="Protected">
                  <Header user={data} />
                  <div style={{ padding: '2rem' }}>
                    <Component {...matchProps} />
                  </div>
                </div>
              </React.Fragment>
            );
          }
          return <Loading />;
        }}
      />
    );
  }
}

const mapStateToProps = states => ({
  type: states.auth.type,
  isAuthenticated: states.auth.type,
  data: states.auth.data,
  nav: states.nav,
});

const mapDispatchToProps = dispatch => ({
  checkAuth: () => dispatch(checkAuth()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProtectedLayout);
