'use strict';

const { Like } = require('../../models');

const LikeService = {
  changeLike: async (user_id, post_id) => {
    const target = { user_id, post_id };
    const like = await Like.findOne({ where: target });
    like ? await Like.destroy({ where: target }) : Like.create(target);
  },
};

module.exports = LikeService;
