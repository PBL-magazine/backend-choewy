'use strict';

const Response = require('../../commons/response');
const PostError = require('./post.error');

const PostValidation = {
  /* @Content Validation */
  Content: (req, res, next) => {
    try {
      !req.content && PostError.NotContent();
    } catch (error) {
      Response.Validation(res, error);
    }
    next();
  },

  /* @Image Validation */
  Image: (req, res, next) => {
    try {
      !req.file && PostError.NotImage();
    } catch (error) {
      Response.Validation(res, error);
    }
    next();
  },
};

module.exports = PostValidation;
