import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
// from props we get logout and auth, and from auth we get isAuthenticated and loading
const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  // hide-sm class makes something invisible is the size is too small, like in a phone
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        {/*Link to receives a url, not a html file like a href */}
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>

      {
        /*If not loading then do this*/ !loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )
      }
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // Grabs the whole auth state object from the global state
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
