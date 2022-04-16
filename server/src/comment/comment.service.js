'use strict';

const CustomErrors = require('../../commons/CustomErrors');
const { Comment, User } = require('../../models');

const CommentService = {
  getComments: async (post_id) => {
    try {
      return await Comment.findAll({
        where: { post_id },
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['email', 'nickname'],
          },
        ],
      });
    } catch (error) {
      CustomErrors.Database(error);
    }
  },
  getComment: async (post_id, comment_id) => {
    console.log(post_id, comment_id);
    try {
      return await Comment.findOne({
        where: { post_id, comment_id },
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['email', 'nickname'],
          },
        ],
      });
    } catch (error) {
      CustomErrors.Database(error);
    }
  },
  createComment: async (user_id, post_id, commentDto) => {
    try {
      await Comment.create({
        user_id,
        post_id,
        ...commentDto,
      });
    } catch (error) {
      CustomErrors.Database(error);
    }
  },
  updateComment: async (user_id, post_id, comment_id, commentDto) => {
    try {
      await Comment.update(commentDto, {
        where: {
          user_id,
          post_id,
          comment_id,
        },
      });
    } catch (error) {
      CustomErrors.Database(error);
    }
  },
  deleteComment: async (user_id, post_id, comment_id) => {
    try {
      await Comment.destroy({
        where: {
          user_id,
          post_id,
          comment_id,
        },
      });
    } catch (error) {
      CustomErrors.Database(error);
    }
  },
};

module.exports = CommentService;
