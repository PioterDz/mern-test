const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const random = require('mongoose-simple-random');

const Post = new Schema({
  id: { type: 'String', required: true },
  title: { type: 'String', required: true },
  content: { type: 'String', required: true },
  author: { type: 'String', required: true },
});

Post.plugin(random);

module.exports = mongoose.model('Post', Post);