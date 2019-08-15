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

// Get posts by range

exports.getPostsByRange = async function (req, res) {

  try {
    let { startAt, limit } = req.params;

    startAt = parseInt(startAt);
    limit = parseInt(limit);

    const posts = await Post.find().skip(startAt).limit(limit);
    const amount = await Post.countDocuments();

    res.status(200).json({
      posts,
      amount,
    });

  } catch(err) {
    res.status(500).json(err);
  }

};

//get random post

exports.getRandomPost = async function(req, res) {

  try {
    await Post.count().exec(function(err, count){

      const random = Math.floor(Math.random() * count);
      
      Post.findOne().skip(random).exec(
        function (err, result) {
          if(err) res.status(500).json(err);
          res.status(200).json(result);
        }
      )
    });

  } catch(err) {
    res.status(500).json(err);
  }

};

