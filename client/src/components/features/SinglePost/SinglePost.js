import React from 'react';
import { PropTypes } from 'prop-types';

import SinglePostForm from '../SinglePostForm/SinglePostForm';

class SinglePost extends React.Component {

  componentDidMount() {
    const { loadPost, resetRequest } = this.props;
    resetRequest();
    loadPost(this.props.match.params.id);
  }

  render() {
    const { post, request } = this.props;
    
    return <SinglePostForm post={post} request={request} />
  }
}

SinglePost.propTypes = {
  post: PropTypes.object.isRequired,
  request: PropTypes.object.isRequired,
  loadPost: PropTypes.func.isRequired,
  resetRequest: PropTypes.func.isRequired
};

export default SinglePost;