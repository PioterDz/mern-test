import React from 'react';
import { PropTypes } from 'prop-types';

import PostsList from '../PostsList/PostsList';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import Pagination from '../../common/Pagination/Pagination';

class Posts extends React.Component {

  componentDidMount() {
    const { loadPostsByPage, resetRequest, initialPage, postsPerPage } = this.props;
    
    resetRequest();
    loadPostsByPage(!initialPage ? 1 : initialPage, postsPerPage);
  }

  loadPostsPage = (page) => {
    const { loadPostsByPage, postsPerPage } = this.props;
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
    const { posts, request, pages, presentPage, pagination } = this.props;
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
  initialPage: PropTypes.number.isRequired,
  postsPerPage: PropTypes.number.isRequired,
  pagination: PropTypes.bool.isRequired
};

export default Posts;