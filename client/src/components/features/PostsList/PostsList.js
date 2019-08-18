import React from 'react';
import { PropTypes } from 'prop-types';

import PostSummary from '../PostSummary/PostSummary';

const PostsList = ({ posts, cutText }) => (
  <div>
    <section className="posts-list">
      {posts.map(post => <PostSummary cutText={cutText} key={post.id} {...post} />)}
    </section>
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostsList;