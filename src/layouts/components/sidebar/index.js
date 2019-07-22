import React, { Component } from 'react';
import { connect } from 'react-redux';
import './sidebar.scss';
import { FiUser, FiGrid } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/images/logo-only_mobile.png';
import * as storage from '../../../helpers/token';
import navActionTypes from '../../../redux/nav/nav.action-type';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { user: { name: '', category: '' } };
  }

  componentDidMount() {
    const user = storage.getToken();
    if (user) {
      this.setState({ user });
    }
  }

  render() {
    const { user } = this.state;
    const { nav } = this.props;
    const sidebarStyle = { left: nav.type === navActionTypes.TOGGLE_NAV && nav.show ? '0' : '-300px' };
    return (
      <div className="Sidebar" style={sidebarStyle}>
        <div className="header d-flex justify-content-center">
          <div className="logo-wrapper">
            <img src={Logo} alt="Leaps Logo" width="50px" height="50px" />
          </div>
          <div className="site-name-wrapper d-flex align-items-center">
            <h3 className="site-name">LEAPS</h3>
          </div>
        </div>
        <div className="profile d-flex justify-content-center align-items-center flex-column">
          <div className="user-icon-wrapper">
            <div className="user-icon">
              <FiUser size={40} />
            </div>
          </div>
          <div className="user-details">
            <p className="user-name">{user.name}</p>
            <small className="user-role">{user.category}</small>
          </div>
        </div>
        <div className="menu-wrapper">
          <ul className="menu">
            <Link to="/" className="link">
              <li className="menu-item active">
                <div className="icon">
                  <FiGrid size={21} />
                </div>
                <div className="menu-name">
                  <span className="link">Dashboard</span>
                </div>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    );
  }
}


const mapStateToProps = states => ({
  nav: states.nav,
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
