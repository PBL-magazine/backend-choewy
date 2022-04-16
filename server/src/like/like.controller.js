'use strict';

const { Router } = require('express');
const CustomErrors = require('../../commons/CustomErrors');
const PostPipes = require('../post/post.pipes');
const UserPipes = require('../user/user.pipes');
const LikeService = require('./like.service');

const LikeController = () => {
  const prefix = '/api/posts/:post_id';
  const router = Router({ mergeParams: true });

  router.put(
    '/like',
    UserPipes.Authorization,
    PostPipes.Existence,
    async (req, res) => {
      try {
        const { user_id } = req.user;
        const { post_id } = req.params;
        await LikeService.changeLike(user_id, post_id);
        res.status(200).send({ ok: true });
      } catch (error) {
        CustomErrors.Response(res, error);
      }
    },
  );

  return [prefix, router];
};

module.exports = LikeController;
