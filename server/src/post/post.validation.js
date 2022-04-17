'use strict';

const Response = require('../../commons/response');
const PostError = require('./post.error');

const PostValidation = {
  /* @Content Validation */
  Content: (req, res, next) => {
    console.log(req.body);
    try {
      !req.body.content && PostError.NotContent();
    } catch (error) {
      console.log(error);
      return Response.Fails(res, error);
    }
    next();
  },

  /* @Image Validation */
  Image: (req, res, next) => {
    try {
      !req.file && PostError.NotImage();
    } catch (error) {
      return Response.Fails(res, error);
    }
    next();
  },
};

module.exports = PostValidation;
