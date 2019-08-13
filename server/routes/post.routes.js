const express = require('express');
const router = express.Router();

const PostController = require('../controllers/post.controller');

// get all posts
router.route('/posts').get(PostController.getPosts);

// get one post
router.route('/posts/:id').get(PostController.getPost);

// add posts
router.route('/posts').post(PostController.addPost);

//edit post
router.route('/posts/edit/:id').post(PostController.editPost);

// get posts by range
router.route('/posts/range/:startAt/:limit').get(PostController.getPostsByRange);

module.exports = router;