import React from 'react';
import { PropTypes } from 'prop-types';

import PostsPattern from '../PostsPattern/PostsPattern';
import withPage from '../withPage/withPage';

const Posts = (props) => {

  const { posts, request, pages, presentPage, pagination, loadPostsPage, cutText } = props;
  
  return (
    <div>
      <PostsPattern posts={posts} request={request} pages={pages} presentPage={presentPage} pagination={pagination} loadPostsPage={loadPostsPage} cutText={cutText} />
    </div>
  );
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  request: PropTypes.object.isRequired,
  loadPostsByPage: PropTypes.func.isRequired,
  resetRequest: PropTypes.func.isRequired,
  presentPage: PropTypes.number.isRequired,
  initialPage: PropTypes.number.isRequired,
};

export default withPage(Posts, 10, true);