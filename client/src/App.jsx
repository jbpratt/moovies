import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

// components
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import Landing from "./components/layout/Landing/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/Create-Profile";
import Home from "./components/home/Home";
import Requests from "./components/requests/Requests";
import NotFound from "./components/notfound/NotFound";
import Reviews from "./components/reviews/Reviews";

import { clearCurrentProfile } from "./actions/profileActions";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Review from "./components/review/Review";

library.add(fab);
// check for token
if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // set current user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // log out user
    store.dispatch(logoutUser());
    // clear profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App Site">
            <div className="">
              <div className="App-header">
                <Navbar />
              </div>
              <div className="main">
                <Switch>
                  <Route exact path="/" component={Landing} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/requests" component={Home} />
                  <Route exact path="/reviews" component={Reviews} />
                  <Route exact path="/search" component={Requests} />
                  <PrivateRoute exact path="/profile" component={Dashboard} />
                  <PrivateRoute
                    exact
                    path="/create-profile"
                    component={CreateProfile}
                  />
                  <Switch>
                    <PrivateRoute
                      exact
                      path="/reviews/:id"
                      component={Review}
                    />
                  </Switch>
                  <Route component={NotFound} />
                </Switch>
              </div>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
