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


export class ProtectedLayout extends React.Component {
  componentDidMount() {
    const { checkAuth: checkIfAuth } = this.props;
    checkIfAuth();
  }

  render() {
    const {
      component: Component, isAuthenticated, data, type, nav, ...rest
    } = this.props;
    const layoutStyle = {
      width: nav.type === navActionTypes.TOGGLE_NAV && nav.show ? '80%' : '100%',
      marginLeft: nav.type === navActionTypes.TOGGLE_NAV && nav.show ? '20%' : '0',
      background: '#F8FAFC',
      height: '100vh',
      paddingTop: '60px',
      transition: '1s all',
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
          } if (type === authActionTypes.CHECK_AUTH_SUCCESS) {
            return (
              <React.Fragment>
                <Sidebar />
                <div style={layoutStyle}>
                  <Header />
                  <Component {...matchProps} />
                </div>
              </React.Fragment>

            );
          }
          return <Loading />;
        }
        }
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
export default connect(mapStateToProps, mapDispatchToProps)(ProtectedLayout);
