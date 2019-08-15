import React from 'react';
import { PropTypes } from 'prop-types';

import TextField from '../../common/TextField/TextField';
import SectionTitle from '../../common/SectionTitle/SectionTitle';
import Button from '../../common/Button/Button';
import Alert from '../../common/Alert/Alert';
import Spinner from '../../common/Spinner/Spinner';
import '../PostForm/PostForm.scss';
import withPost from '../withPost/withPost';

import Editor from 'react-medium-editor';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';

class EditPost extends React.Component {
    state = {
        // post: {
        //   title: '',
        //   author: '',
        //   content: ''
        // },
        edited: false,
    }

    async componentDidMount() {
        const { loadPost, resetRequest, singlePost, feelUpState } = this.props;
        resetRequest();
        await loadPost(this.props.match.params.id);
        feelUpState(singlePost);
        // await this.setState({ post: { title: post.title, author: post.author, content: post.content }});
    }

    editPost = (e) => {
        const { editPost, request } = this.props;
        const { post } = this.state;
      
        e.preventDefault();
        editPost(post, this.props.match.params.id);
        if(request.success) return this.setState({ edited: true });
    }

    // handleChange = (e) => {
    //     const { post } = this.state;
    //     this.setState({ post: { ...post, [e.target.name]: e.target.value }});
    // }

    // handleEditor = (text) => {
    //     const { post } = this.state;
    //     this.setState({ post: { ...post, content: text }});
    // }

    render() {
        const { request, post, handleChange, handleEditor  } = this.props;
        const { editPost } = this;
        // const { post } = this.state;
    
        if(request.error) return <Alert variant="error">{request.error}</Alert>
        else if(request.success && this.state.edited) return <Alert variant="success">Post has been edited!</Alert>
        else if(request.pending) return <Spinner />
        else return (
    
            <form onSubmit={editPost}>
    
                <TextField
                    label="Title"
                    value={post.title}
                    onChange={handleChange}
                    name="title"
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
        
                <Button variant="primary">Edit post</Button>
    
            </form>
        );
    }
}

EditPost.propTypes = {
    request: PropTypes.object.isRequired,
    editPost: PropTypes.func.isRequired,
};

export default withPost(EditPost);