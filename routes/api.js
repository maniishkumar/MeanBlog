var mongoose = require('mongoose');
var blogpost = require('../models/blogpost.js');

// GET all posts
exports.posts = function (req, res, next) {
  blogpost.find({}, function (err, posts) {
    if (err) return next(err);

    res.json({posts: posts});
  });
};
//GET post by id
exports.post = function (req, res) {
  blogpost.findById(req.params.id, function (err, post) {
    if (err) return res.json(false);
    console.log("Post data");
    console.log(post);
    res.json({post:post});
  });
};

// POST
exports.addPost = function (req, res, next) {
  blogpost.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
};

// PUT
exports.editPost = function (req, res, next) {
  blogpost.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
};

// DELETE
exports.deletePost = function (req, res) {
  blogpost.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return res.json(false);
    res.json(post);
  });
};
