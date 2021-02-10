// This class when added will render all the alerts within the state.alert
// To add an alert, the alert in actions folder must be used

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    // Gotta have a unique key for a list of JSX here
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  // get the alert reducer
  alerts: state.alert,
});

// Connect to use redux in this component, it has to be exported like this
// First connect argument --> any state you wanna map, like alert, profile, etc
// Then the result of the map is passed as props to Alert
export default connect(mapStateToProps)(Alert);
