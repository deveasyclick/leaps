import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Header } from '../components/header';
import authActionTypes from '../redux/auth/auth.actionTypes';
import { checkAuth } from '../redux/auth/auth.action';
import Loading from './loading';

import '../config/firebase';


export class ProtectedLayout extends React.Component {
  componentDidMount() {
    const { checkAuth: checkIfAuth } = this.props;
    checkIfAuth();
  }

  render() {
    const {
      component: Component, isAuthenticated, data, type, ...rest
    } = this.props;
    return (
      <Route
        {...rest}
        render={(matchProps) => {
          if (type === authActionTypes.CHECK_AUTH_FAILED) {
            return (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: matchProps.location },
                }}
              />
            );
          } if (type === authActionTypes.CHECK_AUTH_SUCCESS) {
            return (
              <React.Fragment>
                <Header />
                <Component {...matchProps} />
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

const mapStateToProps = state => ({
  type: state.auth.type,
  isAuthenticated: state.auth.type,
  data: state.auth.data,
});

const mapDispatchToProps = dispatch => ({
  checkAuth: () => dispatch(checkAuth()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProtectedLayout);
