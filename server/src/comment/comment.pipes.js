'use strict';

const CommentService = require('./comment.service');

const CommentPipes = {
  Authorization: async (req, res, next) => {
    console.log(req.params);
    const { user_id } = req.user;
    const post_id = Number(req.params.post_id);
    const comment_id = Number(req.params.comment_id);
    const comment = await CommentService.getComment(post_id, comment_id);

    if (!comment) {
      return res.status(404).send({
        ok: false,
        message: '존재하지 않는 댓글입니다.',
      });
    }
    if (comment.user_id !== user_id) {
      return res.status(401).send({
        ok: false,
        message: '수정 또는 삭제 권한이 없는 댓글입니다.',
      });
    }

    req.params = { post_id, comment_id };
    next();
  },
  Existence: async (req, res, next) => {
    const post_id = Number(req.params.post_id);
    const comment_id = Number(req.params.comment_id);
    const comment = await CommentService.getComment(post_id, comment_id);

    if (!comment) {
      return res.status(404).send({
        ok: false,
        message: '존재하지 않는 댓글입니다.',
      });
    }

    req.params = { post_id, comment_id };
    next();
  },
};

module.exports = CommentPipes;
