import React, { Component } from "react";
import "./NotFound.css";

class NotFound extends Component {
  render() {
    return (
      <div className="landing-notfound">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>404</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
