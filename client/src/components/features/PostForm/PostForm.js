import React from 'react';
import { PropTypes } from 'prop-types';

import TextField from '../../common/TextField/TextField';
import SectionTitle from '../../common/SectionTitle/SectionTitle';
import Button from '../../common/Button/Button';
import Alert from '../../common/Alert/Alert';
import Spinner from '../../common/Spinner/Spinner';
import './PostForm.scss';

import Editor from 'react-medium-editor';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';

class PostForm extends React.Component {

  state = {
    post: {
      title: '',
      author: '',
      content: ''
    }
  }

  componentDidMount() {
    const { resetRequest } = this.props;
    resetRequest();
  }

  addPost = (e) => {
    const { addPost } = this.props;
    const { post } = this.state;
  
    e.preventDefault();
    addPost(post);
  }

  handleChange = (e) => {
    const { post } = this.state;
    this.setState({ post: { ...post, [e.target.name]: e.target.value }});
  }

  handleEditor = (text) => {
    const { post } = this.state;
    this.setState({ post: { ...post, content: text }});
  }


  render() {
 
    const { handleChange, handleEditor, addPost } = this;
    const { post } = this.state;
    const { request } = this.props;

    if(request.error) return <Alert variant="error">{request.error}</Alert>
    else if(request.success) return <Alert variant="success">Post has been added!</Alert>
    else if(request.pending) return <Spinner />
    else return (

      <form onSubmit={addPost}>

        <TextField
            label="Title"
            value={post.title}
            onChange={handleChange}
        />

        <TextField
            label="Author"
            value={post.author}
            onChange={handleChange}
            name="author"
        />

        <SectionTitle>Edit post content</SectionTitle>

        <Editor
            className="content-editor"
            text={post.content}
            onChange={handleEditor}
            options={{ placeholder: false, toolbar: { buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3'] } }}
        />

        <Button variant="primary">Add post</Button>

      </form>
    );
  }
};

PostForm.propTypes = {
    request: PropTypes.object.isRequired,
    addPost: PropTypes.func.isRequired,
};

export default PostForm;