'use strict';

const { Post, User, Like } = require('../../models');

const PostService = {
  /* @Get All Posts(with. User, Likes) Service */
  getPosts: async () => {
    const postsAll = await Post.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['user_id', 'email', 'nickname'],
        },
      ],
    });

    const likesAll = await Like.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['user_id', 'email', 'nickname'],
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
  },

  /* @Get One Post(with. User, Likes) Service */
  getPost: async (post_id) => {
    const postOne = await Post.findOne({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['user_id', 'email', 'nickname'],
        },
      ],
      where: { post_id },
    });

    const likesDetail = await Like.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['user_id', 'email', 'nickname'],
        },
      ],
      where: { post_id },
    });

    return {
      ...postOne.dataValues,
      likesDetail,
      likes: likesDetail.length,
    };
  },

  /* @Get Ono Post(with. User) Service */
  getPostExistance: async (post_id) => {
    return await Post.findOne({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['user_id', 'email', 'nickname'],
        },
      ],
      where: { post_id },
    });
  },

  /* @Create Post Service */
  createPost: async (postDto) => {
    await Post.create(postDto);
  },

  /* @Update Post Service */
  updatePost: async (post_id, user_id, postDto) => {
    await Post.update(postDto, { where: { post_id, user_id } });
  },

  /* @Delete Post Service */
  deletePost: async (post_id, user_id) => {
    await Post.destroy({
      where: { post_id, user_id },
    });
  },
};

module.exports = PostService;
