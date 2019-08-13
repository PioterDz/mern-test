import React from 'react';
import { PropTypes } from 'prop-types';

import PostsList from '../PostsList/PostsList';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import Pagination from '../../common/Pagination/Pagination';

class Posts extends React.Component {

  state = {
    initialPage: this.props.initialPage || 1,
    postsPerPage: 10,
    pagination: true
  }

  componentDidMount() {
    const { loadPostsByPage, resetRequest } = this.props;
    const { postsPerPage, initialPage } = this.state;
    resetRequest();
    loadPostsByPage(initialPage, postsPerPage);
  }

  loadPostsPage = (page) => {
    const { loadPostsByPage } = this.props;
    const { postsPerPage } = this.state;
    loadPostsByPage(page, postsPerPage);
  }

  cutText = (content, maxLength) => {

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
    const { posts, request, pages, presentPage } = this.props;
    const { pagination } = this.state;
    const { loadPostsPage } = this;

    if (request.pending || request.success === null) return <Spinner />
    else if (!request.pending && request.error !== null) return <Alert variant={'error'} children={request.error} />
    else if (!request.pending && request.success && posts.length === 0) return <Alert variant={'info'} children={'no posts'} />
    else if (!request.pending && request.success && posts.length > 0) return (
      <div>      
        <PostsList posts={posts} cutText={this.cutText} />
        { pagination ? <Pagination presentPage={presentPage} pages={pages} onPageChange={loadPostsPage} /> : '' }
      </div>

    );

  }

};

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  request: PropTypes.object.isRequired,
  loadPostsByPage: PropTypes.func.isRequired,
  resetRequest: PropTypes.func.isRequired,
  presentPage: PropTypes.number.isRequired,
};

export default Posts;