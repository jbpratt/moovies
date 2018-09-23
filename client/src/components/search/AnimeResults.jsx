import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { addRequest } from "../../actions/requestActions";
import { addReview } from "../../actions/reviewActions";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import StarRatingComponent from "react-star-rating-component";

class AnimeResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reqTitle: "",
      reqID: "",
      reqPosterPath: "",
      rating: null,
      overview: "",
      errors: {},
      reviewing: false,
      text: ""
    };
    this.setRequest = this.setRequest.bind(this);
    this.WatchLater = this.WatchLater.bind(this);
    this.reviewPopup = this.reviewPopup.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  setRequest(req) {
    this.setState(
      {
        reqTitle: req.title.english,
        reqID: req.id,
        reqPosterPath: req.coverImage.large
      },
      () => {
        var x = window.confirm("Yee?");
        if (x === true) {
          this.WatchLater();
        } else {
          window.alert("Nee");
        }
      }
    );
  }

  onSubmit(e) {
    const { user } = this.props.auth;
    // set state
    this.setState({
      reviewing: false
    });
    const newReview = {
      title: this.state.reqTitle,
      externalid: this.state.reqID.toString(),
      name: user.name,
      posterpath: this.state.reqPosterPath,
      rating: this.state.rating,
      review: this.state.text
    };
    console.log(newReview);
    this.close(e);
    // call action
    this.props.addReview(newReview);
    // forward
    this.props.history.push("/reviews");
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  WatchLater() {
    const { user } = this.props.auth;
    const newRequest = {
      title: this.state.reqTitle,
      externalid: this.state.reqID.toString(),
      name: user.name,
      posterpath: this.state.reqPosterPath
    };
    console.log(newRequest);
    this.props.addRequest(newRequest);
    this.props.history.push("/requests");
  }

  reviewPopup(result) {
    this.setState(
      {
        reviewing: true,
        reqTitle: result.title.english,
        reqPosterPath: result.coverImage.large,
        overview: result.description,
        reqID: result.id,
        rating: 0
      },
      () => {
        console.log(this.state);
      }
    );
  }
  close(e) {
    e.preventDefault();
    this.setState({
      reviewing: false,
      reqID: "",
      reqPosterPath: "",
      reqTitle: "",
      rating: 0,
      overview: ""
    });
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  render() {
    let modalStyle = {
      position: "fixed",
      top: "10%",
      right: "25%",
      left: "25%",
      zIndex: "9999",
      background: "#fff",
      borderRadius: "10px",
      textAlign: "center"
    };

    let backdropStyle = {
      position: "fixed",
      margin: "0",
      width: "100%",
      height: "100%",
      top: "0px",
      left: "0px",
      zIndex: "9998",
      background: "rgba(0, 0, 0, 0.3)"
    };
    const reviewForm = (
      <div>
        <div style={modalStyle} className="review-form">
          <div>
            <img
              className="mt-2"
              src={this.state.reqPosterPath}
              alt={`${this.state.reqTitle}`}
              style={{ width: "150px", height: "225px" }}
            />
            <h2>{this.state.reqTitle}</h2>
            <p className="m-4">{this.state.overview}</p>
          </div>
          <form onSubmit={this.onSubmit}>
            <div>
              <StarRatingComponent
                name="rating"
                starCount={5}
                value={this.state.rating}
                onStarClick={this.onStarClick.bind(this)}
                starColor="#483d8b"
                emptyStarColor={"Grey"}
              />
              <div className="form-group m-4">
                <TextAreaFieldGroup
                  placeholder="Write a review"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                />
              </div>
              <button type="submit" className="btn btn-dark mb-2">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div style={backdropStyle} onClick={e => this.close(e)} />
      </div>
    );
    return (
      <div className="results">
        {this.state.reviewing ? reviewForm : ""}
        {this.props.results.map(result => {
          return (
            <div
              key={result.id}
              className="result row p-2"
              style={{
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              <div className="col-sm-2">
                <button
                  className="btn btn-sm"
                  onClick={() => this.setRequest(result)}
                >
                  Request
                </button>
                <button
                  className="btn btn-sm"
                  onClick={() => this.reviewPopup(result)}
                >
                  Review
                </button>
              </div>
              <div className="col-sm-8">
                <h4>
                  <a
                    href={`https://anilist.co/anime/790/Ergo-Proxy/${
                      result.id
                    }`}
                  >
                    {" "}
                    {result.title.english}
                  </a>
                </h4>
                <p>{result.description}</p>
                <p>Average score: {`${result.averageScore}`} / 100</p>
                <p style={{ color: "#483d8b" }}>Episodes: {result.episodes}</p>
              </div>
              <div className="col-sm-2">
                <img
                  src={result.coverImage.large}
                  alt={result.title.english}
                  className="result-img"
                  style={{ width: "150px", height: "225px" }}
                />
              </div>
            </div>
          );
        })}
        <hr />
      </div>
    );
  }
}

AnimeResults.propTypes = {
  addRequest: PropTypes.func.isRequired,
  addReview: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default withRouter(
  connect(
    mapStateToProps,
    { addRequest, addReview }
  )(AnimeResults)
);
