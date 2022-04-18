'use strict';

const { Like } = require('../../models');

const LikeService = {
  /* 특정 게시물의 좋아요 상태를 변경합니다. */
  changeLike: async (user_id, post_id) => {
    const target = { user_id, post_id };
    const like = await Like.findOne({ where: target });
    like ? await Like.destroy({ where: target }) : await Like.create(target);
  },
};

module.exports = LikeService;
