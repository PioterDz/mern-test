import React from 'react';
import { PropTypes } from 'prop-types';

import SectionTitle from '../../common/SectionTitle/SectionTitle';
import HtmlBox from '../../common/HtmlBox/HtmlBox';

class SinglePost extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    const { loadPost } = this.props;
    const id = this.props.match.params.id;
    loadPost();
  }

  render() {
    const { posts } = this.props;


    return (
      <div>
        <SectionTitle>{posts.title}</SectionTitle>
        <HtmlBox>{posts.content}</HtmlBox>
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