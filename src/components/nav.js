import React, { PureComponent } from 'react';
import { FiUser } from 'react-icons/fi';
import { GoThreeBars, GoX } from 'react-icons/go';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleNav } from '../redux/nav/nav.action';
import Logo from '../assets/images/logo-only_mobile.png';

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
      mobile: true,
    });
  }

  renderNavMenu() {
    const { nav } = this.props;
    if (nav.mobile && nav.show) {
      return <GoX onClick={() => this.handleNavClick(nav)} className="three-bars" size={24} />;
    }
    return <GoThreeBars onClick={() => this.handleNavClick(nav)} className="three-bars" size={24} />;
  }

  renderDropdown() {
    const { nav } = this.props;
    if (nav.mobile && nav.show) {
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
    return (
      <section className="Nav container-fluid">
        <div className="mobile-nav row d-flex align-items-center">
          <div className="menu-wrapper col-4">
            {
                       this.renderNavMenu()
                   }
            <span className="site-name">LEAPS</span>
          </div>
          <div className="logo-wrapper col-4">
            <a href="/">
              <span className="site-nav-logo">
                <img src={Logo} alt="leaps-logo" width="40" height="40" />
              </span>
            </a>
          </div>
          <div className="icon-wrapper col-4"><FiUser className="user-icon" size={24} /></div>
          {this.renderDropdown()}
        </div>
      </section>
    );
  }
}

const mapStateToProps = states => ({
  nav: states.nav,
});
const mapDispatchToProps = dispatch => ({
  toggleNav: obj => dispatch(toggleNav(obj)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
