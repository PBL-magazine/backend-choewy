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

  /* 특정 게시물의 모든 댓글을 조회합니다. */
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

  /* 특정 게시물의 기존 댓글을 수정합니다. */
  router.patch(
    '/:comment_id',
    UserPipes.Authorization,
    PostPipes.Existence,
    CommentPipes.Authorization,
    async (req, res) => {
      try {
        const { user_id, role } = req.user;
        const { post_id, comment_id } = req.params;
        const commentDto = req.body;
        role === 1
          ? await CommentService.updateAdminComment(
              post_id,
              comment_id,
              commentDto,
            )
          : await CommentService.updateComment(
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

  /* 특정 게시물의 기존 댓글을 삭제합니다. */
  router.delete(
    '/:comment_id',
    UserPipes.Authorization,
    PostPipes.Existence,
    CommentPipes.Authorization,
    async (req, res) => {
      try {
        const { user_id, role } = req.user;
        const { post_id, comment_id } = req.params;
        role === 1
          ? await CommentService.deleteAdminComment(post_id, comment_id)
          : await CommentService.deleteComment(user_id, post_id, comment_id);
        Response.Success.Ok(res);
      } catch (error) {
        Response.Fails(res, error);
      }
    },
  );

  return [prefix, router];
};

module.exports = CommentController;
