import React, { Fragment, useState } from "react";

const Register = () => {
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
    password: "",
  });

  // Pulling the elements out
  const { name, email, password, password2 } = formData;

  return (
    <Fragment>
      {" "}
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" action="create-profile.html">
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" />
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
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </Fragment>
  );
};

export default Register;
