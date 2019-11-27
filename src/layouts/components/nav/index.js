import React, { PureComponent } from 'react';
import { FiSearch, FiMenu, FiLogOut } from 'react-icons/fi';
import { GoThreeBars, GoX } from 'react-icons/go';
import { IoMdTime } from 'react-icons/io';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import * as navActions from '../../../redux/nav/nav.action';
import navActionTypes from '../../../redux/nav/nav.action-type';
import * as authActions from '../../../redux/auth/auth.action';
import authActionTypes from '../../../redux/auth/auth.actionTypes';
import { Dialog2 as SignoutDialog } from '../../../components/dialog';
import dashActionTypes from '../../../redux/dash/dash.actionTypes';
import { fetchResearcher } from '../../../redux/dash/dash.action';
import * as storage from '../../../helpers/token';

import './nav.scss';

export class Nav extends PureComponent {
  constructor(props) {
    super(props);
    this.handleNavClick = this.handleNavClick.bind(this);
    this.renderDropdown = this.renderDropdown.bind(this);
    this.renderNavMenu = this.renderNavMenu.bind(this);
    this.handleNo = this.handleNo.bind(this);
    this.handleYes = this.handleYes.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = { dialogClicked: false, user: null, activePath: '' };
  }

  handleNavClick() {
    const { nav, toggleNav: toggleBar } = this.props;
    toggleBar({
      show: !nav.show,
    });
  }

  handleNo() {
    this.setState({ dialogClicked: false });
  }

  handleYes() {
    const { logout } = this.props;
    logout();
    this.setState({ dialogClicked: true });
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

  componentDidMount() {
    const { user } = this.props;
    if (user) {
      this.setState({ user });
    }
  }

  componentDidUpdate() {
    const { user } = this.state;

    if (JSON.stringify(storage.get('user')) !== JSON.stringify(user)) {
      const user = storage.get('user');
      this.setState({ user });
    }
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

  handleLogout(ev) {
    ev.preventDefault();
    this.setState({ dialogClicked: true });
  }

  render() {
    const {
 auth, nav, width, search 
} = this.props;
    const { dialogClicked, user } = this.state;
    const navStyle = {
      width: nav.type === navActionTypes.TOGGLE_NAV && nav.show ? '80%' : '100%',
    };
    if (auth.type === authActionTypes.LOGOUT_SUCCESS) {
      return <Redirect to="/login" />;
    }
    return (
      <section
        className="Nav container-fluid"
        style={width ? { width } : navStyle}
      >
        <div className="desktop-nav row d-flex align-items-center">
          {dialogClicked && (
            <SignoutDialog
              title="Sign out modal"
              message="Are you sure you want to sign out?"
              handleNo={this.handleNo}
              handleYes={this.handleYes}
            />
          )}
          <div className="col-6 col-md-8 d-flex align-content-center">
            <div className="times-icon-wrapper" onClick={this.handleNavClick}>
              {nav.type === navActionTypes.TOGGLE_NAV && nav.show ? (
                <GoX size={21} className="times-icon" />
              ) : (
                <FiMenu size={21} className="times-icon" />
              )}
            </div>
            {/* <h1 className="d-flex site-section">leaPs</h1> */}
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
              onClick={this.handleLogout}
            >
              <FiLogOut size={21} className="logout-icon" />
            </div>
          </div>
        </div>
        {user && !user.isAdmin && !user.approved && (
          <div className="desktop-notice-nav row d-flex align-items-center">
            <div className="p-0 col-12 notice-text-col">
              <h3 className="notice-text">
                Your account is not yet approved, you won't be able to upload
                resources
              </h3>
            </div>
          </div>
        )}
      </section>
    );
  }
}

const mapStateToProps = states => ({
  nav: states.nav,
  auth: states.auth,
  dash: states.dash,
});
const mapDispatchToProps = dispatch => ({
  toggleNav: obj => dispatch(navActions.toggleNav(obj)),
  logout: () => dispatch(authActions.logout()),
  getResearcher: uid => dispatch(fetchResearcher(uid)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Nav));
