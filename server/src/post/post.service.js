'use strict';

const { Post, User, Like, Sequelize } = require('../../models');
const CustomErrors = require('../../commons/CustomErrors');

const PostService = {
  getPosts: async () => {
    try {
      const postsAll = await Post.findAll({
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['email', 'nickname'],
          },
        ],
      });
      const postValues = postsAll.map((el) => el.get({ plain: true }));

      const likesAll = await Like.findAll();
      const likesValues = likesAll.map((el) => el.get({ plain: true }));

      return postValues.map((post) => {
        const likes = likesValues.filter(
          (like) => like.post_id === post.post_id,
        );
        return { ...post, likes: likes.length };
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
            attributes: ['user_id'],
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
