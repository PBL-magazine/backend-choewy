'use strict';

const { Comment, User } = require('../../models');

const CommentService = {
  /* 특정 게시물의 모든 댓글 내용을 조회합니다. */
  getComments: async (post_id) => {
    return await Comment.findAll({
      where: { post_id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['user_id', 'email', 'nickname'],
        },
      ],
    });
  },

  /* 특정 게시물의 특정 댓글 내용을 조회합니다. */
  getComment: async (post_id, comment_id) => {
    return await Comment.findOne({
      where: { post_id, comment_id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['user_id', 'email', 'nickname'],
        },
      ],
    });
  },

  /* 특정 게시물에 새로운 댓글을 추가합니다. */
  createComment: async (user_id, post_id, commentDto) => {
    await Comment.create({
      ...commentDto,
      user_id,
      post_id,
    });
  },

  /* 특정 게시물의 기존 댓글을 수정합니다. */
  updateComment: async (user_id, post_id, comment_id, commentDto) => {
    await Comment.update(commentDto, {
      where: {
        user_id,
        post_id,
        comment_id,
      },
    });
  },

  /* 특정 게시물의 기존 댓글을 삭제합니다. */
  deleteComment: async (user_id, post_id, comment_id) => {
    await Comment.destroy({
      where: {
        user_id,
        post_id,
        comment_id,
      },
    });
  },

  /* 관리자 권한으로 특정 게시물의 기존 댓글을 수정합니다. */
  updateAdminComment: async (post_id, comment_id, commentDto) => {
    await Comment.update(commentDto, {
      where: {
        post_id,
        comment_id,
      },
    });
  },

  /* 관리자 권한으로 특정 게시물의 기존 댓글을 삭제합니다. */
  deleteAdminComment: async (post_id, comment_id) => {
    await Comment.destroy({
      where: {
        post_id,
        comment_id,
      },
    });
  },
};

module.exports = CommentService;
