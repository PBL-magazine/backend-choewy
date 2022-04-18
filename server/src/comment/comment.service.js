'use strict';

const { Comment, User } = require('../../models');

const CommentService = {
  /* @Get Post's All Comments Service */
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

  /* @Get Post's One Comment Service */
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

  /* @Create Post's Comment Service */
  createComment: async (user_id, post_id, commentDto) => {
    await Comment.create({
      ...commentDto,
      user_id,
      post_id,
    });
  },

  /* @Update Post's Comment Service */
  updateComment: async (user_id, post_id, comment_id, commentDto) => {
    await Comment.update(commentDto, {
      where: {
        user_id,
        post_id,
        comment_id,
      },
    });
  },

  /* @Update Post's Comment Admin Service */
  updateAdminComment: async (post_id, comment_id, commentDto) => {
    await Comment.update(commentDto, {
      where: {
        post_id,
        comment_id,
      },
    });
  },

  /* @Delete Post's Comment Service */
  deleteComment: async (user_id, post_id, comment_id) => {
    await Comment.destroy({
      where: {
        user_id,
        post_id,
        comment_id,
      },
    });
  },

  /* @Delete Post's Comment Admin Service */
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
