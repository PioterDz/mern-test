import React from 'react';
import { PropTypes } from 'prop-types';

import Alert from '../../common/Alert/Alert';

import FormOfPosts from '../FormOfPosts/FormOfPosts';
import withPost from '../withPost/withPost';

class PostForm extends React.Component {

  componentDidMount() {
    const { resetRequest } = this.props;
    resetRequest();
  }

  addPost = (e) => {
    const { addPost, post } = this.props;
  
    e.preventDefault();
    addPost(post);
  }

  render() {
    
    const { addPost } = this;
    const { request, post, handleChange, handleEditor } = this.props;

    if(request.success) return <Alert variant="success">Post has been added!</Alert>
    else return <FormOfPosts formFunc={addPost} request={request} post={post} handleChange={handleChange} handleEditor={handleEditor} />

  }
};

PostForm.propTypes = {
    request: PropTypes.object.isRequired,
    resetRequest: PropTypes.func.isRequired,
    post: PropTypes.object,
    handleChange: PropTypes.func.isRequired,
    handleEditor: PropTypes.func.isRequired,
};

export default withPost(PostForm);