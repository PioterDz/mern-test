import React from 'react';
import { PropTypes } from 'prop-types';

import PostsList from '../PostsList/PostsList';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';

class Posts extends React.Component {

  componentDidMount() {
    const { loadPosts, resetRequest } = this.props;
    resetRequest();
    loadPosts();
  }

  cutText = (content, maxLength) => {

    if (maxLength < 1) {
      return 'Error';
    } else if (maxLength > content.length) {
      const arr = content.split('');
      const lastIndex = arr.lastIndexOf(' ', maxLength);
      const newContent = content.substr(0, lastIndex);
      return newContent + '...';
    } else {
      return content;
    }
  }

  render() {
    const { posts, request } = this.props;

    if (request.pending || request.success === null) return <Spinner />
    else if (!request.pending && request.error !== null) return <Alert variant={'error'} children={request.error} />
    else if (!request.pending && request.success && posts.length === 0) return <Alert variant={'info'} children={'no posts'} />
    else if (!request.pending && request.success && posts.length > 0) return <PostsList posts={posts} cutText={this.cutText} />

  }

};

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    })
  ),
  request: PropTypes.objectOf(
    PropTypes.shape({
      pending: PropTypes.bool.isRequired,
      error: PropTypes.bool.isRequired,
      success: PropTypes.bool.isRequired,
    })
  ),
  loadPosts: PropTypes.func.isRequired,
};

export default Posts;