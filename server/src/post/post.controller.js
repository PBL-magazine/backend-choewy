'use strict';

const { Router } = require('express');
const multer = require('multer');
const Upload = multer({ dest: './upload' });
const UserPipes = require('../user/user.pipes');
const PostValidation = require('./post.validation');
const PostService = require('./post.service');
const PostPipes = require('./post.pipes');
const Response = require('../../commons/response');

const PostController = () => {
  const prefix = '/api/posts';
  const router = Router();

  /* @Get All Posts Controller */
  router.get('/', async (_, res) => {
    try {
      const rows = await PostService.getPosts();
      Response.Success.Ok(res, { rows });
    } catch (error) {
      Response.Fails(res, error);
    }
  });

  /* @Get One Post Controller */
  router.get('/:post_id', PostPipes.Existence, async (req, res) => {
    try {
      const { post_id } = req.params;
      const row = await PostService.getPost(post_id);
      Response.Success.Ok(res, { row });
    } catch (error) {
      Response.Fails(res, error);
    }
  });

  /* @Create Post Controller */
  router.post(
    '/',
    UserPipes.Authorization,
    Upload.single('image'),
    PostValidation.Image,
    PostValidation.Content,
    async (req, res) => {
      try {
        const { file } = req;
        const { user_id } = req.user;
        const image_url = file ? `/image/${req.file.filename}` : null;
        const postDto = {
          ...req.body,
          image_url,
          user_id,
        };
        await PostService.createPost(postDto);
        Response.Success.Created(res);
      } catch (error) {
        Response.Fails(res, error);
      }
    },
  );

  /* @Update Post Controller */
  router.patch(
    '/:post_id',
    UserPipes.Authorization,
    PostPipes.Authorization,
    PostValidation.Content,
    async (req, res) => {
      try {
        const { user_id } = req.user;
        const { post_id } = req.params;
        const { content } = req.body;
        const postDto = { content };
        await PostService.updatePost(post_id, user_id, postDto);
        Response.Success.Ok(res);
      } catch (error) {
        Response.Fails(res, error);
      }
    },
  );

  /* @Delete Post Controller */
  router.delete(
    '/:post_id',
    UserPipes.Authorization,
    PostPipes.Authorization,
    async (req, res) => {
      try {
        const { user_id } = req.user;
        const { post_id } = req.params;
        await PostService.deletePost(post_id, user_id);
        Response.Success.Ok(res);
      } catch (error) {
        Response.Fails(res, error);
      }
    },
  );

  return [prefix, router];
};

module.exports = PostController;
