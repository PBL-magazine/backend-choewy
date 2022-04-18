'use strict';

const Response = require('../../commons/response');
const PostError = require('./post.error');

const PostValidation = {
  /* 게시물 내용의 적합성을 검사합니다. */
  Content: (req, res, next) => {
    try {
      !req.body.content && PostError.NotContent();
    } catch (error) {
      return Response.Fails(res, error);
    }
    next();
  },

  /* 게시물 이미지의 적합성을 검사합니다. */
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
