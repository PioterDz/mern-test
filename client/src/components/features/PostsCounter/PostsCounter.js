import React from 'react';
import { PropTypes } from 'prop-types';

class PostsCounter extends React.Component {

  render() {
    const { postsCount, request } = this.props;

    if (request.success) {
      return (
        <div>Posts amount: { postsCount > 0 ? postsCount : 'no posts' }</div>
      );
    } else {
      return null;
    }
  }

};

PostsCounter.propTypes = {
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      })
    )
};

export default PostsCounter;
