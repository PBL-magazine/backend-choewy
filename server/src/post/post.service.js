'use strict';

const { Post, User, Like, Sequelize } = require('../../models');
const CustomErrors = require('../../commons/CustomErrors');

const PostService = {
  getPosts: async () => {
    // @TODO COUNT로 좋아요 개수 불러와야 함.
    // 지금은 좋아요 정보를 전부 불러오도록 되어 있음.
    try {
      return await Post.findAll({
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['email', 'nickname'],
          },
          {
            model: Like,
            as: 'likes',
            attributes: ['post_id'],
          },
        ],
      });
    } catch (error) {
      CustomErrors.Database(error);
    }
  },
  getPost: async (post_id) => {
    try {
      return await Post.findOne({
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['email', 'nickname'],
          },
          {
            model: Like,
            as: 'likes',
            attributes: ['post_id'],
          },
        ],
        where: { post_id },
      });
    } catch (error) {
      CustomErrors.Database(error);
    }
  },
  createPost: async (postDto) => {
    try {
      await Post.create(postDto);
    } catch (error) {
      CustomErrors.Database(error);
    }
  },
  updatePost: async (post_id, user_id, postDto) => {
    try {
      await Post.update(postDto, { where: { post_id, user_id } });
    } catch (error) {
      CustomErrors.Database(error);
    }
  },
  deletePost: async (post_id, user_id) => {
    try {
      await Post.destroy({
        where: {
          post_id,
          user_id,
        },
      });
    } catch (error) {
      CustomErrors.Database(error);
    }
  },
};

module.exports = PostService;
