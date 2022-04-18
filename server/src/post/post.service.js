'use strict';

const { Post, User, Like } = require('../../models');

const PostService = {
  /* 모든 게시물 정보, 작성자, 좋아요 정보를 조회합니다. */
  getPosts: async () => {
    const postsAll = await Post.findAll({
      nest: true,
      raw: true,
      include: [
        {
          nest: true,
          raw: true,
          model: User,
          as: 'user',
          attributes: ['user_id', 'email', 'nickname'],
        },
      ],
    });

    const likesAll = await Like.findAll({
      nest: true,
      raw: true,
    });

    return postsAll.map((post) => {
      const likes = likesAll
        .filter((like) => like.post_id === post.post_id)
        .map((like) => ({ user_id: like.user_id }));
      return { ...post, likes };
    });
  },

  /* 특정 게시물 정보, 작성자, 좋아요 정보를 조회합니다. */
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
      raw: true,
      nest: true,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['user_id'],
        },
      ],
      where: { post_id },
    });

    const likes = likesAll.map((like) => ({
      user_id: like.user_id,
    }));

    return {
      ...postOne.dataValues,
      likes,
    };
  },

  /* 현재 게시물의 존재여부 및 작성자 판단을 위한 함수입니다. */
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

  /* 새로운 게시물을 발행합니다. */
  createPost: async (postDto) => {
    await Post.create(postDto);
  },

  /* 특정 게시물을 수정합니다. */
  updatePost: async (post_id, user_id, postDto) => {
    await Post.update(postDto, { where: { post_id, user_id } });
  },

  /* 특정 게시물을 삭제합니다. */
  deletePost: async (post_id, user_id) => {
    await Post.destroy({
      where: { post_id, user_id },
    });
  },

  /* 관리자 권한으로 특정 게시물을 수정합니다. */
  updateAdminPost: async (post_id, postDto) => {
    await Post.update(postDto, { where: { post_id } });
  },

  /* 관리자 권한으로 특정 게시물을 삭제합니다. */
  deleteAdminPost: async (post_id) => {
    await Post.destroy({
      where: { post_id },
    });
  },
};

module.exports = PostService;
