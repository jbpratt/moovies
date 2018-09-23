const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Review model
const Review = require("../../models/Review");

// Validation
const validateReviewInput = require("../../validation/review");

// @route  GET api/reviews/test
// @desc   Reviews posts route
// @access Public
router.get("/test", (req, res) => {
  res.json({
    msg: "Reviews works"
  });
});

// @route  GET api/reviews
// @desc   Get reviews
// @access Public
router.get("/", (req, res) => {
  Review.find()
    .sort({
      upvotes: -1
    })
    .then(reviews => res.json(reviews))
    .catch(err =>
      res.status(404).json({
        noreviewsfound: "No reviews found"
      })
    );
});

// @route  POST api/reviews
// @desc   Create reviews
// @access Private
router.post(
  "/",
  (req, res) => {
    // const { errors, isValid } = validateReviewInput(req.body);
    // //Check Validation
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    const newReview = new Review({
      title: req.body.title,
      externalid: req.body.externalid,
      review: req.body.review,
      rating: req.body.rating,
      posterpath: req.body.posterpath
    });
    newReview.save().then(review => res.json(review));
  }
);

// @route  GET api/reviews/:id
// @desc   Get review by id
// @access Public
router.get("/:id", (req, res) => {
  Review.findById(req.params.id)
    .then(review => res.json(review))
    .catch(err =>
      res.status(404).json({
        noreviewfound: "No review found with that id"
      })
    );
});

// @route  DELETE api/reviews/:id
// @desc   Delete reviews by id
// @access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      Review.findById(req.params.id).then(review => {
        // Check for review owner
        if (review.user.toString() !== req.user.id) {
          return res.status(401).json({
            notauthorized: "User not authorized to remove"
          });
        }

        // Delete
        review
          .remove()
          .then(() =>
            res.json({
              success: true
            })
          )
          .catch(err =>
            res.status(404).json({
              reviewnotfound: "review not found"
            })
          );
      });
    });
  }
);

// @route  POST api/reviews/upvote/:id
// @desc   upvote reviews by id
// @access Private
router.post(
  "/upvote/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      Review.findById(req.params.id)
        .then(review => {
          if (
            review.upvotes.filter(
              upvote => upvote.user.toString() === req.user.id
            ).length > 0
          ) {
            return res.status(400).json({
              alreadyupvoted: "User already upvoted this review"
            });
          }
          // Add user id to upvotes array
          review.upvotes.unshift({
            user: req.user.id
          });
          review.save().then(review => res.json(review));
        })
        .catch(err =>
          res.status(404).json({
            reviewnotfound: "No review found"
          })
        );
    });
  }
);

// @route   POST api/reviews/downvote/:id
// @desc    Downvote review (remove placed upvote only)
// @access  Private
router.post(
  "/downvote/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      Review.findById(req.params.id)
        .then(review => {
          if (
            review.upvotes.filter(
              upvote => upvote.user.toString() === req.user.id
            ).length === 0
          ) {
            return res.status(400).json({
              notupvoted: "You have not yet upvoted this review"
            });
          }
          // Get remove index
          const removeIndex = review.upvotes
            .map(item => item.user.toString())
            .indexOf(req.user.id);
          // Splice out of array
          review.upvotes.splice(removeIndex, 1);
          // Save
          review.save().then(review => res.json(review));
        })
        .catch(err =>
          res.status(404).json({
            reviewnotfound: "No review found"
          })
        );
    });
  }
);

// @route   POST api/reviews/comment/:id
// @desc    Add comment to review
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateReviewInput(req.body);
    console.log(req.body);
    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Review.findById(req.params.id)
      .then(review => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          user: req.user.id
        };

        // Add to comments array
        review.comments.unshift(newComment);

        // Save
        review.save().then(review => res.json(review));
      })
      .catch(err =>
        res.status(404).json({ reviewnotfound: "No review found" })
      );
  }
);

// @route   DELETE api/reviews/comment/:id/:comment_id
// @desc    Remove comment from review
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Review.findById(req.params.id)
      .then(review => {
        // Check to see if comment exists
        if (
          review.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnonexistant: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = review.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        review.comments.splice(removeIndex, 1);

        review.save().then(review => res.json(review));
      })
      .catch(err =>
        res.status(404).json({ reviewnotfound: "No review found" })
      );
  }
);

module.exports = router;
