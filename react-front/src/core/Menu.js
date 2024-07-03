import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import Logo from "../images/logo.png";
import "./Menu.css"; // Import the CSS file

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#ff9900" };
  else return { color: "#fff" };
};

const Menu = ({ history }) => (
  <div className="navbar-container">
    <ul className="nav nav-tabs navbar-fixed-top">
      <li className="nav-item logo-container">
        <img src={Logo} alt="Logo" className="navbar-logo" />
      </li>
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, "/")} to="/">
          <i className="fas fa-home nav-icon"></i> Home
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, `/users`)} to="/users">
          <i className="fas fa-users nav-icon"></i> Users
        </Link>
      </li>

      <li className="nav-item">
        <Link to={`/post/create`} style={isActive(history, `/post/create`)} className="nav-link">
          <i className="fas fa-edit nav-icon"></i> Create Post
        </Link>
      </li>

      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">
              <i className="fas fa-sign-in-alt nav-icon"></i> Sign In
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">
              <i className="fas fa-user-plus nav-icon"></i> Sign Up
            </Link>
          </li>
        </Fragment>
      )}

      {isAuthenticated() && isAuthenticated().user.role === "admin" && (
        <li className="nav-item">
          <Link to={`/admin`} style={isActive(history, `/admin`)} className="nav-link">
            <i className="fas fa-cogs nav-icon"></i> Admin
          </Link>
        </li>
      )}

      {isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link to={`/findpeople`} style={isActive(history, `/findpeople`)} className="nav-link">
              <i className="fas fa-search nav-icon"></i> Find People
            </Link>
          </li>

          <li className="nav-item">
            <Link to={`/user/${isAuthenticated().user._id}`} style={isActive(history, `/user/${isAuthenticated().user._id}`)} className="nav-link">
              <i className="fas fa-user-circle nav-icon"></i> {`${isAuthenticated().user.name}'s profile`}
            </Link>
          </li>

          <li className="nav-item ml-auto">
            <span className="nav-link signout-link" onClick={() => signout(() => history.push("/"))}>
              <i className="fas fa-sign-out-alt nav-icon"></i> Sign Out
            </span>
          </li>
        </Fragment>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
