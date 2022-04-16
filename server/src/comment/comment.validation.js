'use strict';

const Response = require('../../commons/response');
const CommentError = require('./comment.error');

const CommentValidation = {
  /* @Comment Content Validation */
  Content: (req, res, next) => {
    try {
      !req.body.content && CommentError.NotContent();
    } catch (error) {
      Response.Fails(res, error);
    }

    next();
  },
};

module.exports = CommentValidation;
