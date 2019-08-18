import React from 'react';

function withPost(WrappedComponent) {
    return class extends React.Component {
    
        state = {
            post: {
            title: '',
            author: '',
            content: ''
            }
        }
    
        handleChange = (e) => {
            const { post } = this.state;
            this.setState({ post: { ...post, [e.target.name]: e.target.value }});
        }
    
        handleEditor = (text) => {
            const { post } = this.state;
            this.setState({ post: { ...post, content: text }});
        }

        fillUpState = (data) => {
            this.setState({ post: { title: data.title, author: data.author, content: data.content }})
        }
    
        render() {
            return <WrappedComponent post={this.state.post} handleChange={this.handleChange} handleEditor={this.handleEditor} fillUpState={this.fillUpState} {...this.props} />;
        }
    };
}

export default withPost;