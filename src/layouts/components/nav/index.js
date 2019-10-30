import React, { PureComponent } from 'react';
import { FiSearch, FiMenu, FiLogOut } from 'react-icons/fi';
import { GoThreeBars, GoX } from 'react-icons/go';
import { IoMdTime } from 'react-icons/io';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import * as navActions from '../../../redux/nav/nav.action';
import navActionTypes from '../../../redux/nav/nav.action-type';
import * as authActions from '../../../redux/auth/auth.action';
import authActionTypes from '../../../redux/auth/auth.actionTypes';

import './nav.scss';

export class Nav extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleNavClick = this.handleNavClick.bind(this);
    this.renderDropdown = this.renderDropdown.bind(this);
    this.renderNavMenu = this.renderNavMenu.bind(this);
  }

  handleNavClick() {
    const { nav, toggleNav: toggleBar } = this.props;
    toggleBar({
      show: !nav.show,
    });
  }

  renderNavMenu() {
    const { nav } = this.props;
    if (nav.mobile && nav.show) {
      return (
        <IoMdTime
          onClick={() => this.handleNavClick(nav)}
          className="three-bars"
          size={24}
        />
      );
    }
    return (
      <GoThreeBars
        onClick={() => this.handleNavClick(nav)}
        className="three-bars"
        size={24}
      />
    );
  }

  renderDropdown() {
    const { nav } = this.props;
    if (nav.show) {
      return (
        <div className="dropdown">
          <div className="dropdown-item">
            <input type="text" placeholder="Search" className="nav-search" />
          </div>
          <div className="dropdown-item">
            <Link to="/">Dashboard</Link>
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    const {
 logout, auth, nav, width, search 
} = this.props;
    const navStyle = {
      width: nav.type === navActionTypes.TOGGLE_NAV && nav.show ? '80%' : '100%',
    };
    if (auth.type === authActionTypes.LOGIN_SUCCESS) {
      return <Redirect to="/login" />;
    }
    return (
      <section
        className="Nav container-fluid"
        style={width ? { width } : navStyle}
      >
        <div className="desktop-nav row d-flex align-items-center">
          <div className="col-6 col-md-8 d-flex align-content-center">
            <div className="times-icon-wrapper" onClick={this.handleNavClick}>
              {nav.type === navActionTypes.TOGGLE_NAV && nav.show ? (
                <GoX size={21} className="times-icon" />
              ) : (
                <FiMenu size={21} className="times-icon" />
              )}
            </div>
            <h1 className="d-flex site-section">Dashboard</h1>
          </div>
          <div className="col-6 col-md-4 d-flex justify-content-center align-items-center">
            <div className="search-wrapper">
              {search && (
                <React.Fragment>
                  <input
                    type="text"
                    className="search"
                    placeholder="Search"
                    name="search"
                  />
                  <div className="search-icon-wrapper">
                    <FiSearch size={21} className="search-icon" />
                  </div>
                </React.Fragment>
              )}
            </div>
            <div
              title="logout"
              className="logout-icon-wrapper"
              onClick={() => logout()}
            >
              <FiLogOut size={21} className="logout-icon" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = states => ({
  nav: states.nav,
  auth: states.auth,
});
const mapDispatchToProps = dispatch => ({
  toggleNav: obj => dispatch(navActions.toggleNav(obj)),
  logout: () => dispatch(authActions.logout()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Nav);
