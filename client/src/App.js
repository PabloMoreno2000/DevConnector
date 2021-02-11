import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  /*
    useEffect is like a componentDidMount when used like this.
    Normally it will keep running forever, but not if we add the brackets []
    as second parameter, in that case it will run just once in mount and unmount.
    Every time the page is loaded it will check for a valid token and do the auth process
  */
  useEffect(() => {
    // Remember to use dispatch when a modification in the state of a reducer is going to happen
    store.dispatch(loadUser());
  }, []);

  return (
    /**To use the provider everything must be wrapped on it */
    <Provider store={store}>
      {/**Everything must be wrapped up within the router */}
      <Router>
        <Fragment>
          <Navbar />
          {/**Shwo the landing page just in the root dir*/}
          <Route exact path="/" component={Landing}></Route>
          <section className="container">
            <Alert />
            {/*display one component depending on the url.
          Navbar won't go anywhere because switch is inside
          the container.*/}
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
