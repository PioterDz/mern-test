import React from 'react';
import { PropTypes } from 'prop-types';

import PageTitle from '../../common/PageTitle/PageTitle';
import PostsPattern from '../../features/PostsPattern/PostsPattern';
import withPage from '../../features/withPage/withPage';

const HomePage = (props) => {

  const { posts, request, pages, presentPage, pagination, loadPostsPage, cutText } = props;
  
  return (
    <div>
      <PageTitle>Blog</PageTitle>
      <PostsPattern posts={posts} request={request} pages={pages} presentPage={presentPage} pagination={pagination} loadPostsPage={loadPostsPage} cutText={cutText} />
    </div>
  );
}

HomePage.propTypes = {
  posts: PropTypes.array.isRequired,
  request: PropTypes.object.isRequired,
  pages: PropTypes.number.isRequired,
  loadPostsPage: PropTypes.func.isRequired,
  cutText: PropTypes.func.isRequired,
  presentPage: PropTypes.number.isRequired,
  pagination: PropTypes.bool.isRequired
};

export default withPage(HomePage, 3, false);