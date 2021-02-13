import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
  // no need to put return in arrow function when just writting what you are returning, in this case inside ()
}) => (
  <div class="profile-about bg-light p-2">
    {bio && (
      <Fragment>
        {" "}
        {/**Put just first name**/}
        <h2 class="text-primary">{name.trim().split(" ")[0]}'s Bio</h2>
        <p>{bio}</p>
        <div class="line"></div>
      </Fragment>
    )}

    <h2 class="text-primary">Skill Set</h2>
    <div class="skills">
      {skills.map((skill, index) => (
        <div key={index} className="p-1">
          <i className="fas fa-check"></i>
          {skill}
        </div>
      ))}
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
