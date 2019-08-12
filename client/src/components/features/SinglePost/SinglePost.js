import React from 'react';
import { PropTypes } from 'prop-types';

import PageTitle from '../../common/PageTitle/PageTitle';
import HtmlBox from '../../common/HtmlBox/HtmlBox';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';

class SinglePost extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    const { loadPost } = this.props;
    loadPost(this.props.match.params.id);
  }

  render() {
    const { post, request } = this.props;

    let spinner = null;
    let singlePostContent = null;
    let singlePostTitle = null;
    let author = null;
    let alert = null;
    
    if (request.pending || request.success === null) {
      spinner = <Spinner />;
    } else if (!request.pending && request.success && Object.keys(post).length > 0) {
      singlePostTitle = <PageTitle>{ post.title }</PageTitle>;
      author = <p>Author: { post.author }</p>;
      singlePostContent = <HtmlBox>{ post.content }</HtmlBox>;
    } else if (!request.pending && request.error !== null) {
      alert = <Alert variant={'error'} children={request.error} />;
    } else if (!request.pending && request.success && Object.keys(post).length === 0) {
      alert = <Alert variant={'info'} children={'no posts'} />;
    }


    return (
      <div>
        {spinner}
        {singlePostTitle}
        {author}
        {singlePostContent}
        {alert}
      </div>
    );
  }
}

SinglePost.propTypes = {
  post: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    })
  ),
  request: PropTypes.objectOf(
    PropTypes.shape({
      pending: PropTypes.bool.isRequired,
      error: PropTypes.bool.isRequired,
      success: PropTypes.bool.isRequired,
    })
  ),
  loadPost: PropTypes.func.isRequired,
};

export default SinglePost;