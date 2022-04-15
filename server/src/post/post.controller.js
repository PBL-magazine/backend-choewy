'use strict';

const { Router } = require('express');
const UserPipes = require('../user/user.pipes');
const PostValidation = require('./post.validation');
const multer = require('multer');
const Upload = multer({ dest: '../upload' });

const PostController = () => {
  const prefix = '/api/posts';
  const router = Router();

  router.get('/', async (req, res) => {
    try {
      res.status(200).send({ ok: true, rows: [] });
    } catch (error) {
      const { code, data } = error;
      res.status(code).send(data);
    }
  });

  router.post(
    '/',
    UserPipes.Authorization,
    PostValidation.Content,
    Upload.single('image'),
    PostValidation.Image,
    async (req, res) => {
      const { file } = req;
      const image_url = `/image/${req.file.filename}`;

      // DB에 저장
      console.log(image_url);
      res.send({ req: req.body });
    },
  );

  return [prefix, router];
};

module.exports = PostController;
