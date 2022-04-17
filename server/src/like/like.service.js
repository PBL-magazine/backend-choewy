'use strict';

const { Like } = require('../../models');

const LikeService = {
  /* @Change Like State Service */
  changeLike: async (user_id, post_id) => {
    const target = { user_id, post_id };
    const like = await Like.findOne({ where: target });

    if (like) {
      await Like.destroy({ where: target });
      return false;
    }

    await Like.create(target);
    return true;
  },
};

module.exports = LikeService;
