import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { addRequest } from "../../actions/requestActions";
import { addReview } from "../../actions/reviewActions";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import StarRatingComponent from "react-star-rating-component";

class MovieResults extends Component {
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
      text: "",
      user: ""
    };
    this.setRequest = this.setRequest.bind(this);
    this.WatchLater = this.WatchLater.bind(this);
    this.reviewPopup = this.reviewPopup.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    //const { user } = this.props.auth;
    // set state
    this.setState({
      reviewing: false
    });
    const newReview = {
      title: this.state.reqTitle,
      externalid: this.state.reqID.toString(),
      posterpath: this.state.reqPosterPath,
      rating: this.state.rating,
      review: this.state.text,
      name: this.state.user
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

  reviewPopup(result) {
    this.setState(
      {
        reviewing: true,
        reqTitle: result.title,
        reqPosterPath: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${
          result.poster_path
          }`,
        overview: result.overview,
        reqID: result.id,
        rating: 0
      },
      () => {
        console.log(this.state);
      }
    );
  }

  setRequest(req) {
    this.setState(
      {
        reqTitle: req.title,
        reqID: req.id,
        reqPosterPath: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${
          req.poster_path
          }`
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

  WatchLater() {
    // const { user } = this.props.auth;
    const newRequest = {
      title: this.state.reqTitle,
      externalid: this.state.reqID.toString(),
      posterpath: this.state.reqPosterPath
    };
    this.props.addRequest(newRequest);
    console.log(newRequest);
    this.props.history.push("/requests");
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
              <TextFieldGroup
                placeholder="Username"
                name="username"
                value={this.state.user}
                onChange={this.onChange}
              />
            </div>
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
              <div className="col-sm-8" style={{}}>
                {" "}
                <h5>
                  <a href={`https://www.themoviedb.org/movie/${result.id}`}>
                    {result.title}
                  </a>
                </h5>
                <p>{`${result.vote_average}`} / 10</p>
                <p>{result.release_date}</p>
                <p>{result.overview}</p>
              </div>
              <div className="col-sm-2">
                <img
                  src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${
                    result.poster_path
                    }`}
                  alt={result.title}
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

MovieResults.propTypes = {
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
  )(MovieResults)
);
