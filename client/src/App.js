import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

const App = () => {
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
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
