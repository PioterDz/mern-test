import React from 'react';
import { PropTypes } from 'prop-types';

import PostsList from '../PostsList/PostsList';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';

class Posts extends React.Component {
  constructor(props){
    super(props);
    this.cutText = this.cutText.bind(this);
  }

  componentDidMount() {
    const { loadPosts } = this.props;
    loadPosts();
  }

  cutText(content, maxLength) {
    
    if (maxLength < 1) {
      return 'Error';

    } else if (maxLength > content.length) {
      const arr = content.split('');
      const lastIndex = arr.lastIndexOf(' ', maxLength);
      const newContent = content.substr(0, lastIndex);
      return newContent + '...';

    } else {
      return content;
    }
  }

  render() {
    const { posts, request } = this.props;
    let spinner = null;
    let postsList = null;
    let alert = null;

    if(request.pending || request.success === null) {
      spinner = <Spinner />;
    }
    else if(!request.pending && request.success && posts.length > 0) {
      postsList = <PostsList posts={posts} cutText={this.cutText} />;
    }
    else if(!request.pending && request.error !== null) {
      alert = <Alert variant={'error'} children={request.error} />;
    }
    else if(!request.pending && request.success && posts.length === 0) {
      alert = <Alert variant={'info'} children={'no posts'} />;
    }

  
    return (
      <div>
        {spinner}
        {postsList}
        {alert}
      </div>
    );
  }

};

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
  loadPosts: PropTypes.func.isRequired,
};

export default Posts;