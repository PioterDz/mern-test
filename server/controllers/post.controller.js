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
    console.log(req.body, 'body');
    Post.findByIdAndUpdate(req.params.id, req.body, {new: true, useFindAndModify: false, setDefaultsOnInsert: true}, (err, post) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(post);
    });



  } catch(err) {
    res.status(500).json(err);
  }
}

