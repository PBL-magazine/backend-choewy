'use strict';

const { Router } = require('express');
const UserPipes = require('../user/user.pipes');
const PostPipes = require('../post/post.pipes');
const CommentService = require('./comment.service');
const CommentPipes = require('./comment.pipes');
const Response = require('../../commons/response');

const CommentController = () => {
  const prefix = '/api/posts/:post_id/comments';
  const router = Router({ mergeParams: true });

  router.get('/', PostPipes.Existence, async (req, res) => {
    try {
      const { post_id } = req.params;
      const rows = await CommentService.getComments(post_id);
      Response.Success.Ok(res, { rows });
    } catch (error) {
      Response.Fails(res, error);
    }
  });

  router.post(
    '/',
    UserPipes.Authorization,
    PostPipes.Existence,
    async (req, res) => {
      try {
        const { user_id } = req.user;
        const { post_id } = req.params;
        const commentDto = req.body;
        await CommentService.createComment(user_id, post_id, commentDto);
        Response.Success.Created(res);
      } catch (error) {
        Response.Fails(res, error);
      }
    },
  );

  router.patch(
    '/:comment_id',
    UserPipes.Authorization,
    PostPipes.Existence,
    CommentPipes.Authorization,
    async (req, res) => {
      try {
        const { user_id } = req.user;
        const { post_id, comment_id } = req.params;
        const commentDto = req.body;
        await CommentService.updateComment(
          user_id,
          post_id,
          comment_id,
          commentDto,
        );
        Response.Success.Ok(res);
      } catch (error) {
        Response.Fails(res, error);
      }
    },
  );

  router.delete(
    '/:comment_id',
    UserPipes.Authorization,
    PostPipes.Existence,
    CommentPipes.Authorization,
    async (req, res) => {
      try {
        const { user_id } = req.user;
        const { post_id, comment_id } = req.params;
        await CommentService.deleteComment(user_id, post_id, comment_id);
        Response.Success.Ok(res);
      } catch (error) {
        Response.Fails(res, error);
      }
    },
  );

  return [prefix, router];
};

module.exports = CommentController;
