'use strict';

const { Post, User, Like } = require('../../models');

const PostService = {
  /* @Get All Posts(with. User, Likes) Service */
  getPosts: async () => {
    const postsAll = await Post.findAll({
      include: [
        {
          raw: true,
          model: User,
          as: 'user',
          attributes: ['user_id', 'email', 'nickname'],
        },
      ],
    });

    const likesAll = await Like.findAll();

    /* 사용자 정보까지 조회하려면 아래 옵션 추가 */
    /*
    {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['user_id', 'email', 'nickname'],
        },
      ],
    }
    */

    const postValues = postsAll.map((el) => el.get({ plain: true }));
    const likesValues = likesAll.map((el) => el.get({ plain: true }));

    return postValues.map((post) => {
      const likes = likesValues
        .filter((like) => like.post_id === post.post_id)
        .map((like) => ({ user_id: like.user_id }));
      return { ...post, likes };
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

    const likesAll = await Like.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['user_id'],
        },
      ],
      where: { post_id },
    });

    /* 사용자 정보까지 조회하려면 */
    /* 1. 아래 옵션 추가 */
    /*
    {
      attributes: ['user_id', 'email', 'nickname'],
    }
    */

    /* 2. map((like) => ... ) 부분 삭제*/
    const likes = likesAll
      .map((el) => el.get({ plain: true }))
      .map((like) => ({
        user_id: like.user_id,
      }));

    return {
      ...postOne.dataValues,
      likes,
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

  /* @Update Post Admin Service */
  updateAdminPost: async (post_id, postDto) => {
    await Post.update(postDto, { where: { post_id } });
  },

  /* @Delete Post Service */
  deletePost: async (post_id, user_id) => {
    await Post.destroy({
      where: { post_id, user_id },
    });
  },

  /* @Delete Post Admin Service */
  deleteAdminPost: async (post_id) => {
    await Post.destroy({
      where: { post_id },
    });
  },
};

module.exports = PostService;
