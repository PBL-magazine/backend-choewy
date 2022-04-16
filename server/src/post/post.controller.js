'use strict';

const { Router } = require('express');
const multer = require('multer');
const Upload = multer({ dest: '../upload' });
const UserPipes = require('../user/user.pipes');
const PostValidation = require('./post.validation');
const PostService = require('./post.service');
const PostPipes = require('./post.pipes');
const CustomErrors = require('../../commons/CustomErrors');

const PostController = () => {
  const prefix = '/api/posts';
  const router = Router();
  router.get('/', async (_, res) => {
    try {
      const rows = await PostService.getPosts();
      res.status(200).send({ ok: true, rows });
    } catch (error) {
      CustomErrors.Response(res, error);
    }
  });

  router.get('/:post_id', PostPipes.Existence, async (req, res) => {
    try {
      const { post_id } = req.params;
      const row = await PostService.getPost(Number(post_id));
      res.status(200).send({ ok: true, row });
    } catch (error) {
      CustomErrors.Response(res, error);
    }
  });

  router.post(
    '/',
    UserPipes.Authorization,
    PostValidation.Content,
    Upload.single('image'),
    async (req, res) => {
      const { file } = req;
      const { user_id } = req.user;
      const image_url = file ? `/image/${req.file.filename}` : null;
      const postDto = {
        ...req.body,
        image_url,
        user_id,
      };
      try {
        await PostService.createPost(postDto);
        res.status(201).send({ ok: true });
      } catch (error) {
        CustomErrors.Response(res, error);
      }
    },
  );

  router.patch(
    '/:post_id',
    UserPipes.Authorization,
    PostPipes.Authorization,
    PostValidation.Content,
    Upload.single('image'),
    async (req, res) => {
      const { file } = req;
      const { user_id } = req.user;
      const { post_id } = req.params;
      const { content } = req.body;
      const image_url = file ? `/image/${req.file.filename}` : null;
      const postDto = { content, image_url };
      try {
        await PostService.updatePost(Number(post_id), user_id, postDto);
        res.status(200).send({ ok: true });
      } catch (error) {
        CustomErrors.Response(res, error);
      }
    },
  );

  router.delete(
    '/:post_id',
    UserPipes.Authorization,
    PostPipes.Authorization,
    async (req, res) => {
      const { user_id } = req.user;
      const { post_id } = req.params;
      try {
        await PostService.deletePost(Number(post_id), user_id);
        res.status(204).send({ ok: true });
      } catch (error) {
        const { code, data } = error;
        res.status(code).send(data);
      }
    },
  );

  return [prefix, router];
};

module.exports = PostController;
