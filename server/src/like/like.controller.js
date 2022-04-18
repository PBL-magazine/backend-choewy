'use strict';

const { Router } = require('express');
const PostPipes = require('../post/post.pipes');
const UserPipes = require('../user/user.pipes');
const LikeService = require('./like.service');
const Response = require('../../commons/response');

const LikeController = () => {
  const prefix = '/api/posts/:post_id/like';
  const router = Router({ mergeParams: true });

  /* 특정 게시물의 좋아요 상태를 변경합니다. */
  router.put(
    '/',
    UserPipes.Authorization,
    PostPipes.Existence,
    async (req, res) => {
      try {
        const { user_id } = req.user;
        const { post_id } = req.params;
        await LikeService.changeLike(user_id, post_id);
        Response.Success.Ok(res);
      } catch (error) {
        Response.Fails(res, error);
      }
    },
  );

  return [prefix, router];
};

module.exports = LikeController;
