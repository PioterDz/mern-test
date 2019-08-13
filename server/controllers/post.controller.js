const Post = require('../models/post.model');
const uuid = require('uuid');

// get all posts

exports.getPosts = async (req, res) => {

    try {
      res.status(200).json(await Post.find());
    } catch(err) {
      res.status(500).json(err);
    }

};

// get one post

exports.getPost = async (req, res) => {

  try {
    res.status(200).json(await Post.find({ id: req.params.id }));

  } catch(err) {
    res.status(500).json(err);
  }
}

// add new post

exports.addPost = async function (req, res) {

  try {
    const { title, author, content } = req.body;

    let newPost = new Post(req.body);
    newPost.id = uuid();

    postSaved = await newPost.save();
    res.status(200).json(postSaved);

  } catch(err) {
    res.status(500).json(err);
  }

}

// edit post 

exports.editPost = async function (req, res) {

  try {
    const { title, author, content } = req.body;

    res.status(200).json(await Post.updateOne( { id : req.params.id }, req.body));

  } catch(err) {
    res.status(500).json(err);
  }
}

