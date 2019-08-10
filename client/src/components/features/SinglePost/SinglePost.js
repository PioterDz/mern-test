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
    let alert = null;

    if (request.pending || request.success === null) {
      spinner = <Spinner />;
    } else if (!request.pending && request.success && post.length > 0) {
      const singlePost = post.shift();
      singlePostTitle = <PageTitle> { singlePost.title }</PageTitle>;
      singlePostContent = <HtmlBox>{ singlePost.content }</HtmlBox>;
    } else if (!request.pending && request.error !== null) {
      alert = <Alert variant={'error'} children={request.error} />;
    } else if (!request.pending && request.success && post.length === 0) {
      alert = <Alert variant={'info'} children={'no posts'} />;
    }

    console.log(post, singlePostTitle, singlePostContent, 'post in render');

    return (
      <div>
        {spinner}
        {singlePostTitle}
        {singlePostContent}
        {alert}
      </div>
    );
  }
}

SinglePost.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
};

export default SinglePost;