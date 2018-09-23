import React, { Component } from "react";
import ReviewItem from "./ReviewItem";
class ReviewFeed extends Component {
  render() {
    const { reviews } = this.props;
    return reviews.map(review => (
      <ReviewItem key={review._id} review={review} />
    ));
  }
}

export default ReviewFeed;
