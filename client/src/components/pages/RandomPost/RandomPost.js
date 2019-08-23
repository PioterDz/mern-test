import React from 'react';
import { PropTypes } from 'prop-types';

import SinglePostForm from '../../features/SinglePostForm/SinglePostForm';

class RandomPost extends React.Component {

    componentDidMount() {
        const { loadRandomPost, resetRequest } = this.props;
        resetRequest();
        loadRandomPost();
    }
  
    render() {
        const { post, request } = this.props;

        return <SinglePostForm post={post.data} request={request} />
    }
}

RandomPost.propTypes = {
    post: PropTypes.object.isRequired,
    request: PropTypes.object.isRequired,
    loadRandomPost: PropTypes.func.isRequired,
    resetRequest: PropTypes.func.isRequired
};
  
export default RandomPost;
