import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./RequestItem.css";
import {
  deleteRequest,
  addUpvote,
  removeUpvote
} from "../../actions/requestActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faMinusCircle
} from "@fortawesome/free-solid-svg-icons";

class RequestItem extends Component {
  onDeleteClick(id) {
    this.props.deleteRequest(id);
  }
  onUpvoteClick(id) {
    this.props.addUpvote(id);
  }
  onDownvoteClick(id) {
    this.props.removeUpvote(id);
  }

  findUserUpvotes(upvotes) {
    const { auth } = this.props;
    if (upvotes.filter(upvote => upvote.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    const { request, auth } = this.props;
    console.log(request)
    return (
      <div className="m-3 request-item" style={{ textAlign: "center" }}>
        <div className="">
          <img
            src={request.posterpath}
            alt="poster"
            style={{ width: "150px", height: "225px" }}
          />
        </div>
        <div className="">
          <a href={`https://www.themoviedb.org/${request.type}/${request.externalid}`}>
            <h5> {request.title}</h5>
          </a>{" "}
        </div>
        <div className="btn-group" role="group">
          <button
            onClick={this.onUpvoteClick.bind(this, request._id)}
            type="button"
            className="btn"
          >
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>
          <button className="btn">
            <a>
              <span className="mb-2">{request.upvotes.length}</span>
            </a>
          </button>
          <button
            onClick={this.onDownvoteClick.bind(this, request._id)}
            type="button"
            className="btn"
          >
            <FontAwesomeIcon icon={faThumbsDown} />
          </button>
          {request.user === auth.user.id ? (
            <button
              onClick={this.onDeleteClick.bind(this, request._id)}
              type="button"
              className="btn"
            >
              <FontAwesomeIcon icon={faMinusCircle} />
            </button>
          ) : ((request.user === null) ? null : null)}
        </div>
      </div>
    );
  }
}
RequestItem.propTypes = {
  request: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteRequest: PropTypes.func.isRequired,
  addUpvote: PropTypes.func.isRequired,
  removeUpvote: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteRequest, addUpvote, removeUpvote }
)(RequestItem);



