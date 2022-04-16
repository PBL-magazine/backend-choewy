'use strict';

const { Post, User, Like } = require('../../models');
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

      const likesAll = await Like.findAll({
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['email', 'nickname'],
          },
        ],
      });

      const postValues = postsAll.map((el) => el.get({ plain: true }));
      const likesValues = likesAll.map((el) => el.get({ plain: true }));

      return postValues.map((post) => {
        const likesDetail = likesValues.filter(
          (like) => like.post_id === post.post_id,
        );
        return { ...post, likesDetail, likes: likesDetail.length };
      });
    } catch (error) {
      CustomErrors.Database(error);
    }
  },
  getPost: async (post_id) => {
    try {
      const postOne = await Post.findOne({
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['email', 'nickname'],
          },
        ],
        where: { post_id },
      });
      const likesDetail = await Like.findAll({
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['email', 'nickname'],
          },
        ],
        where: { post_id },
      });
      return { ...postOne.dataValues, likesDetail, likes: likesDetail.length };
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
