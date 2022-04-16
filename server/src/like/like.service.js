'use strict';

const { Like } = require('../../models');

const LikeService = {
  changeLike: async (user_id, post_id) => {
    const like = await Like.findOne({
      where: { user_id, post_id },
    });

    if (like) {
      return await Like.destroy({
        where: { user_id, post_id },
      });
    }

    await Like.create({ user_id, post_id });
  },
};

module.exports = LikeService;
