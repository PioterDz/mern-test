    
import React from 'react';
import { PropTypes } from 'prop-types';

import Alert from '../../common/Alert/Alert';

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
        await fillUpState(singlePost);
    }

    editPost = (e) => {
        const { editPost, request, post } = this.props;
      
        e.preventDefault();
        editPost(post, this.props.match.params.id);
        if(request.success) return this.setState({ edited: true });
    }


    render() {
        const { request, handleChange, handleEditor, post } = this.props;
        const { edited } = this.state;
        const { editPost } = this;

        if(request.success && edited) return <Alert variant="success">Post has been added!</Alert>
        else return <FormOfPosts formFunc={editPost} request={request} post={post} handleChange={handleChange} handleEditor={handleEditor} />
    }
}

EditPost.propTypes = {
    request: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    singlePost: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleEditor: PropTypes.func.isRequired,
};

export default withPost(EditPost);