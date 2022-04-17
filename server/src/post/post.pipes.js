'use strict';

const Response = require('../../commons/response');
const PostService = require('./post.service');
const PostError = require('./post.error');

const PostPipes = {
  /* @Post Update or Delete Authorization Check Pipe */
  Authorization: async (req, res, next) => {
    const { user_id } = req.user;
    const post_id = Number(req.params.post_id);

    let post;

    try {
      post = await PostService.getPostExistance(post_id);
      !post && PostError.NotFound();
    } catch (error) {
      return Response.Fails(res, error);
    }

    try {
      const isOwner = post.user_id === user_id;
      !isOwner && PostError.Unauthorized();
    } catch (error) {
      return Response.Fails(res, error);
    }

    req.params = { ...req.params, post_id };

    next();
  },

  /* @Post Existence Check Pipe */
  Existence: async (req, res, next) => {
    const post_id = Number(req.params.post_id);

    let post;

    try {
      post = await PostService.getPostExistance(post_id);
      !post && PostError.NotFound();
    } catch (error) {
      return Response.Fails(res, error);
    }

    req.params = { ...req.params, post_id };

    next();
  },
};

module.exports = PostPipes;
