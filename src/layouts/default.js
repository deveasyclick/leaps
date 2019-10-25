import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import navActionTypes from '../redux/nav/nav.action-type';
import '../config/firebase';

import Sidebar from './components/sidebar/index';
import { Header } from './components/header/index';
import './style.scss';

export class DefaultLayout extends React.Component {
  render() {
    const { component: Component, nav, ...rest } = this.props;
    const layoutStyle = {
      width:
        nav.type === navActionTypes.TOGGLE_NAV && nav.show ? '80%' : '100%',
      marginLeft:
        nav.type === navActionTypes.TOGGLE_NAV && nav.show ? '20%' : '0',
    };
    return (
      <Route
        {...rest}
        render={matchProps => (
          <React.Fragment>
            <Sidebar />
            <div style={layoutStyle} className="Protected">
              <Header />
              <div style={{ padding: '2rem' }}>
                <Component {...matchProps} />
              </div>
            </div>
          </React.Fragment>
        )}
      />
    );
  }
}

const mapStateToProps = states => ({
  nav: states.nav,
});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefaultLayout);
