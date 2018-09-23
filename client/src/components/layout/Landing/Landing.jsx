import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import "./Landing.css";

class Landing extends Component {
  componentDidMount() {
    // if (this.props.auth.isAuthenticated) {
    //   this.props.history.push("/home");
    // }
  }

  render() {
    const imgs = [
      "https://pbs.twimg.com/media/Dhwu7hEXkAE4dmV.jpg",
      "https://pbs.twimg.com/media/DZdBXy_X4AEp-um.jpg",
      "https://pbs.twimg.com/media/DWVV560X0AAb815.jpg",
      "https://i.imgur.com/RnyNWdw.jpg",
      "https://i.imgur.com/2PH2Y41.jpg",
      "https://i.imgur.com/clvGTA8.jpg",
      "https://i.imgur.com/E7VOWJ7.jpg"
    ];
    const max = 6;
    const min = 0;
    const index = Math.floor(Math.random() * (max - min + 1) + min);
    const backImg = {
      backgroundImage: `url(${imgs[index]})`
    };
    // clean above up into lifecycle method
    return (
      <div className="landing" style={backImg}>
        <div className="dark-overlay landing-inner text-light" />
      </div>
    );
  }
}
Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
