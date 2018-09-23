const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Request model
const Request = require("../../models/Request");
const Profile = require("../../models/Profile");
// Validation
const validateRequestInput = require("../../validation/request");

// @route  GET api/requests/test
// @desc   Tests requests route
// @access Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Posts Works"
  })
);

// @route  GET api/requests
// @desc   Get requests
// @access Public
router.get("/", (req, res) => {
  Request.find()
    .sort({
      upvotes: -1
    })
    .then(requests => res.json(requests))
    .catch(err =>
      res.status(404).json({
        norequestsfound: "No requests found"
      })
    );
});

// @route  GET api/requests/:id
// @desc   Get requests by id
// @access Public
router.get("/:id", (req, res) => {
  Request.findById(req.params.id)
    .then(requests => res.json(requests))
    .catch(err =>
      res.status(404).json({
        norequestfound: "No requests found with that id"
      })
    );
});

// @route  POST api/requests
// @desc   Create requests
// @access Private
router.post(
  "/",
  (req, res) => {
    const { errors, isValid } = validateRequestInput(req.body);
    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    const newReq = new Request({
      title: req.body.title,
      externalid: req.body.externalid,
      posterpath: req.body.posterpath,
      type: req.body.type
    });
    newReq.save().then(request => res.json(request));
  }
);

// @route  DELETE api/requests/:id
// @desc   Delete requests by id
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
      Request.findById(req.params.id).then(request => {
        // Check for request owner
        if (request.user.toString() !== req.user.id) {
          return res.status(401).json({
            notauthorized: "User not authorized to remove"
          });
        }

        // Delete
        request
          .remove()
          .then(() =>
            res.json({
              success: true
            })
          )
          .catch(err =>
            res.status(404).json({
              requestnotfound: "Request not found"
            })
          );
      });
    });
  }
);

// @route  POST api/requests/upvote/:id
// @desc   upvote requests by id
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
      Request.findById(req.params.id)
        .then(request => {
          if (
            request.upvotes.filter(
              upvote => upvote.user.toString() === req.user.id
            ).length > 0
          ) {
            return res.status(400).json({
              alreadyupvoted: "User already upvoted this request"
            });
          }
          // Add user id to upvotes array
          request.upvotes.unshift({
            user: req.user.id
          });
          request.save().then(request => res.json(request));
        })
        .catch(err =>
          res.status(404).json({
            requestnotfound: "No request found"
          })
        );
    });
  }
);

// @route   POST api/requests/downvote/:id
// @desc    Downvote request (remove placed upvote only)
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
      Request.findById(req.params.id)
        .then(request => {
          if (
            request.upvotes.filter(
              upvote => upvote.user.toString() === req.user.id
            ).length === 0
          ) {
            return res.status(400).json({
              notupvoted: "You have not yet upvoted this request"
            });
          }
          // Get remove index
          const removeIndex = request.upvotes
            .map(item => item.user.toString())
            .indexOf(req.user.id);
          // Splice out of array
          request.upvotes.splice(removeIndex, 1);
          // Save
          request.save().then(request => res.json(request));
        })
        .catch(err =>
          res.status(404).json({
            requestnotfound: "No request found"
          })
        );
    });
  }
);
module.exports = router;
