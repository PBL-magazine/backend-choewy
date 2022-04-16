'use strict';

const PostService = require('./post.service');

const PostPipes = {
  Authorization: async (req, res, next) => {
    const { user_id } = req.user;
    const { post_id } = req.params;
    const post = await PostService.getPost(post_id);
    console.log(post.user_id);
    if (post.user_id !== user_id) {
      return res.status(401).send({
        ok: false,
        message: '작성자만 수정 또는 삭제할 수 있습니다.',
      });
    }
    next();
  },
};

module.exports = PostPipes;
