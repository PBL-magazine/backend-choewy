'use strict';

const PostService = require('./post.service');

const PostPipes = {
  Authorization: async (req, res, next) => {
    const { user_id } = req.user;
    const { post_id } = req.params;
    const post = await PostService.getPost(post_id);
    if (!post) {
      return res.status(404).send({
        ok: false,
        message: '존재하지 않는 게시물입니다.',
      });
    }
    if (post.user_id !== user_id) {
      return res.status(401).send({
        ok: false,
        message: '수정 또는 삭제 권한이 없는 게시물입니다.',
      });
    }
    next();
  },
  Existence: async (req, res, next) => {
    const { post_id } = req.params;
    const post = await PostService.getPost(post_id);
    if (!post) {
      return res.status(404).send({
        ok: false,
        message: '존재하지 않는 게시물입니다.',
      });
    }
    next();
  },
};

module.exports = PostPipes;
