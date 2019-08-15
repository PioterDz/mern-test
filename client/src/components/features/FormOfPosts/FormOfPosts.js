import React from 'react';
import { PropTypes } from 'prop-types';

import TextField from '../../common/TextField/TextField';
import SectionTitle from '../../common/SectionTitle/SectionTitle';
import Button from '../../common/Button/Button';
import Alert from '../../common/Alert/Alert';
import Spinner from '../../common/Spinner/Spinner';
import '../PostForm/PostForm.scss';

import Editor from 'react-medium-editor';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';

const FormOfPosts = (props) => {

    const { post, request, handleChange, handleEditor, formFunc } = props;

    if(request.error) return <Alert variant="error">{request.error}</Alert>
    else if(request.success) return <Alert variant="success">Post has been added!</Alert>
    else if(request.pending) return <Spinner />
    else return (

        <form onSubmit={formFunc}>
    
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
    
            <Button variant="primary">Add post</Button>
    
        </form>
    );
}

FormOfPosts.propTypes = {
    request: PropTypes.object.isRequired,
    post: PropTypes.object,
    handleChange: PropTypes.func.isRequired,
    handleEditor: PropTypes.func.isRequired,
    formFunc: PropTypes.func.isRequired,
};

export default FormOfPosts;