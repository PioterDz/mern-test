import React from 'react';

const withPost = (props) => WrappedComponent => {
    class WithPost extends React.Component {

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

        handleChange = (e) => {
            const { post } = this.state;
            this.setState({ post: { ...post, [e.target.name]: e.target.value }});
        }
        
        handleEditor = (text) => {
            const { post } = this.state;
            this.setState({ post: { ...post, content: text }});
        }

        feelUpState = (state) => {
            this.setState({ post: { title: state.title, author: state.author, content: state.content }});
        }
        

        render() {
            return <WrappedComponent post={this.state.post} handleChange={this.handleChange} handleEditor={this.handleEditor} feelUpState={this.feelUpState} {...this.props} />
        }
    }
    return WithPost
}

export default withPost;