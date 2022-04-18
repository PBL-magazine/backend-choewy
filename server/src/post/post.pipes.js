'use strict';

const Response = require('../../commons/response');
const PostService = require('./post.service');
const PostError = require('./post.error');

const PostPipes = {
  /* 특정 게시물의 존재여부 및 수정, 삭제 권한을 확인합니다. */
  Authorization: async (req, res, next) => {
    const { user_id, role } = req.user;
    const post_id = Number(req.params.post_id);

    let post;

    /* 게시물을 찾을 수 없는 경우 오류를 발생시키고 즉시 응답합니다. */
    try {
      post = await PostService.getPostExistance(post_id);
      !post && PostError.NotFound();
    } catch (error) {
      return Response.Fails(res, error);
    }

    /* 현재 사용자가 해당 게시물의 수정 또는 삭제 권한이 없는 경우 */
    /* 오류를 발생시키고 즉시 응답합니다. */
    try {
      const isAdmin = role === 1;
      const isOwner = post.user_id === user_id;
      const isAuth = isAdmin || isOwner;
      !isAuth && PostError.Unauthorized();
    } catch (error) {
      return Response.Fails(res, error);
    }

    req.params = { ...req.params, post_id };

    next();
  },

  /* 특정 게시물의 존재여부만을 확인합니다. */
  Existence: async (req, res, next) => {
    const post_id = Number(req.params.post_id);

    let post;

    /* 게시물을 찾을 수 없는 경우 오류를 발생시키고 즉시 응답합니다. */
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
