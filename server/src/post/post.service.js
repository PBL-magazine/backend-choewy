'use strict';

const { Post, User, Like, Sequelize } = require('../../models');

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
      console.log(error);
      throw {
        code: 500,
        data: {
          ok: false,
          message: 'DB Error',
          error,
        },
      };
    }
  },
  getPost: async (post_id) => {
    const likes = await Like.findAndCountAll({
      where: { post_id },
    });

    const post = await Post.findOne({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['email', 'nickname'],
        },
      ],
      where: { post_id },
    });

    if (!post) {
      throw {
        code: 404,
        data: {
          ok: false,
          message: '게시물 정보를 찾을 수 없습니다.',
        },
      };
    }
    post.likes = likes;
    return post;
  },
  createPost: async (postDto) => {
    try {
      await Post.create(postDto);
    } catch (error) {
      throw {
        code: 500,
        data: {
          ok: false,
          message: error.parent.sqlMessage,
        },
      };
    }
  },
  updatePost: async (post_id, user_id, postDto) => {
    try {
      await Post.update(postDto, { where: { post_id, user_id } });
    } catch (error) {
      throw {
        code: 500,
        data: {
          ok: false,
          message: error.parent.sqlMessage,
        },
      };
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
      throw {
        code: 500,
        data: {
          ok: false,
          message: error.parent.sqlMessage,
        },
      };
    }
  },
};

module.exports = PostService;
