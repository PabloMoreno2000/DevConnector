import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
// to use props
import PropTypes from "prop-types";

// Instead of using props and then props.setAlert, get setAlert directly from props with {setAlert}
const Register = ({ setAlert, register }) => {
  {
    /* Fragment lets you add multiple children without
  adding extra nodes to the DOM */
  }

  {
    /* useState() returns a hook.
  First element is an state object, can be any type you want.
  Second element is a function that will set the value of the state obj.
  Parameter of useState is the default value for formData */
  }
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  // Pulling the elements out. Updates with setFormData will be visible for these constants
  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    // ...Something creates a copy of Something, and with the second argument we are just
    // modifying some values of it. Each input field has a name attribute that coincides with
    // a name withing formData.
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password });
    }
  };

  return (
    <Fragment>
      {" "}
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            /* Function to get called when the input element changes.
            "e" is the input element itself */
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

// Stating required props
Register.propTypes = {
  //ptrf
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

// Connect to use redux in this component, it has to be exported like this
// First connect argument --> any state you wanna map, like alert, profile, etc
// Second connect argument --> an object with any actions you wanna use
export default connect(null, { setAlert, register })(Register);
