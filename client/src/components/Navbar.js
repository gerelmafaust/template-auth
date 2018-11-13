import React, { Component } from "react";
import { Link } from "react-router-dom";

import AuthService from "../services/authService";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  handleLogoutClick = e => {
    AuthService.logout();
  };

  handleClick = e => {
    e.preventDefault();
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    console.log(AuthService.isLoggedIn());
    return (
      <div>
        <nav className="navbar">
          <div
            id="side-nav"
            className={
              this.state.isOpen
                ? "open-side-menu side-nav"
                : "closed-side-menu side-nav"
            }
          >
            <a href="/">Home</a>
            {AuthService.isLoggedIn() && (
              <a href="/user-profile">{this.props.user}</a>
            )}

            {!AuthService.isLoggedIn() && <Link to="/signup"> Signup</Link>}
            {!AuthService.isLoggedIn() && <a href="/login">Login</a>}
            {AuthService.isLoggedIn() && (
              <a href="/logout" onClick={e => this.handleLogoutClick(e)}>
                Logout
              </a>
            )}
          </div>
          <span className="open-slide">
            <a href={null} onClick={this.handleClick}>
              <svg width="30" height="30">
                <path d="M0,5 30,5" stroke="#fff" strokeWidth="5" />
                <path d="M0,14 30,14" stroke="#fff" strokeWidth="5" />
                <path d="M0,23 30,23" stroke="#fff" strokeWidth="5" />
              </svg>
            </a>
          </span>
          <div id="nav-brand">
            <Link to="/">Appname ?</Link>
          </div>
          <div className="nav-links-row">
            <ul className="navbar navbar-navb">
              <li className="navbar-navb-li">
                {!AuthService.isLoggedIn() && <Link to="/">Home</Link>}
              </li>
              <li className="navbar-navb-li">
                {AuthService.isLoggedIn() && (
                  <Link to="/user-profile">{this.props.user}</Link>
                )}
              </li>

              <li className="navbar-navb-li">
                {!AuthService.isLoggedIn() && <Link to="/signup">Signup</Link>}
              </li>
              <li className="navbar-navb-li">
                {!AuthService.isLoggedIn() && <Link to="/login">Login</Link>}
              </li>
              <li className="navbar-navb-li">
                {AuthService.isLoggedIn() && (
                  <Link to="/" onClick={e => this.handleLogoutClick(e)}>
                    Logout
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;
