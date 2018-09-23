import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <div id="footer" className="footer containerFooter">
        <a
          href="https://twitter.com/autumnpiratecat"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://www.github.com" className="m-1">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    );
  }
}
export default Footer;
