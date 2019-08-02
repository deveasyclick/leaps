import React, { Component } from 'react';
import { connect } from 'react-redux';
import './sidebar.scss';
import { IoMdPerson } from 'react-icons/io';
import { FiUser, FiCommand } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/images/logo-only_mobile.png';
import * as storage from '../../../helpers/token';
import navActionTypes from '../../../redux/nav/nav.action-type';
import dashActionTypes from '../../../redux/dash/dash.actionTypes';


const navs = [{ name: 'Dashboard', icon: FiCommand, path: '/' }, { name: 'Account', icon: IoMdPerson, path: 'account' }];

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { user: { name: '', category: '', image: '' }, activeLink: 0 };
  }

  componentDidMount() {
    const user = storage.getToken();
    if (user) {
      this.setState({ user });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.dash.type !== this.props.dash.type && this.props.dash.type === dashActionTypes.UPDATE_DETAILS_SUCCESS) {
      const user = storage.getToken();
      if (user) {
        this.setState({ user });
      }
    }
  }

  render() {
    const { user, activeLink } = this.state;
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
            <Link
              onClick={() => {
                this.setState({ activeLink: 1 });
              }}
              className="user-account-link"
              to="/account"
            >
              <div className="user-icon">
                {
                  user.image ? <img className="img" src={user.image} width="100%" alt="user" />
                    : <FiUser size={40} />
                }
              </div>
            </Link>
          </div>
          <div className="user-details">
            <p className="user-name">{user.name}</p>
            <small className="user-role">{user.category}</small>
          </div>
        </div>
        <div className="menu-wrapper">
          <ul className="menu">
            {
              navs.map((navItem, index) => {
                const { icon: Icon } = navItem;
                return (
                  <Link key={index} to={navItem.path} className="link" ref={index}>
                    <li
                      onClick={() => {
                        this.setState({ activeLink: index });
                      }}
                      className={`menu-item ${index === activeLink ? 'active' : ''}`}
                    >
                      <div className="icon">
                        <Icon size={21} />
                      </div>
                      <div className="menu-name">
                        <span className="link">{navItem.name}</span>
                      </div>
                    </li>
                  </Link>
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}


const mapStateToProps = states => ({
  nav: states.nav,
  dash: states.dash,
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
