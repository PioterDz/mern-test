import React from 'react';
import { PropTypes } from 'prop-types';

import withPost from '../withPost/withPost';
import FormOfPosts from '../FormOfPosts/FormOfPosts';

class EditPost extends React.Component {
    state = {
        edited: false,
    }

    async componentDidMount() {
        const { loadPost, resetRequest, fillUpState } = this.props;
        resetRequest();
        await loadPost(this.props.match.params.id);
        const { singlePost } = this.props;
        fillUpState(singlePost);
    }

    editPost = (e) => {
        const { editPost, request, post } = this.props;
      
        e.preventDefault();
        editPost(post, this.props.match.params.id);
        if(request.success) return this.setState({ edited: true });
    }


    render() {
        const { request, post, handleChange, handleEditor } = this.props;
        const { editPost } = this;
    
        return <FormOfPosts formFunc={editPost} request={request} post={post} handleChange={handleChange} handleEditor={handleEditor} />
    }
}

EditPost.propTypes = {
    request: PropTypes.object.isRequired,
    post: PropTypes.object,
    singlePost: PropTypes.object,
    handleChange: PropTypes.func.isRequired,
    handleEditor: PropTypes.func.isRequired,
};

export default withPost(EditPost);