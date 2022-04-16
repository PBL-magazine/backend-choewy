'use strict';

const Response = require('../../commons/response');
const CommentService = require('./comment.service');
const CommentError = require('./comment.error');

const CommentPipes = {
  /* @Comment Update or Delete Authorization Check Pipe */
  Authorization: async (req, res, next) => {
    const { user_id } = req.user;
    const post_id = Number(req.params.post_id);
    const comment_id = Number(req.params.comment_id);

    let comment;

    try {
      comment = await CommentService.getComment(post_id, comment_id);
      !comment && CommentError.NotFound();
    } catch (error) {
      Response.Fails(res, error);
    }

    try {
      const isOwner = comment.user_id === user_id;
      !isOwner && CommentError.Unauthorized();
    } catch (error) {
      Response.Fails(res, error);
    }

    req.params = {
      ...req.params,
      post_id,
      comment_id,
    };

    next();
  },

  /* @Comment Existence Check Pipe */
  Existence: async (req, res, next) => {
    const post_id = Number(req.params.post_id);
    const comment_id = Number(req.params.comment_id);

    let comment;

    try {
      comment = await CommentService.getComment(post_id, comment_id);
      !comment && CommentError.NotFound();
    } catch (error) {
      Response.Fails(res, error);
    }

    req.params = {
      ...req.params,
      post_id,
      comment_id,
    };

    next();
  },
};

module.exports = CommentPipes;
