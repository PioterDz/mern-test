import React from 'react';
import { PropTypes } from 'prop-types';

import PageTitle from '../../common/PageTitle/PageTitle';
import HtmlBox from '../../common/HtmlBox/HtmlBox';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';

const SinglePostForm = (props) => {

    const { post, request } = props;
    
    if (request.pending || request.success === null) return <Spinner />
    else if (!request.pending && request.error !== null) return <Alert variant={'error'} children={request.error} />
    else if (!request.pending && request.success && Object.keys(post).length === 0) return <Alert variant={'info'} children={'no posts'} />
    else if (!request.pending && request.success && Object.keys(post).length > 0)
    return (
      <div>
      <PageTitle>{ post.title }</PageTitle>
      <p>Author: { post.author }</p>
      <HtmlBox>{ post.content }</HtmlBox>
      </div>
    );

}

SinglePostForm.propTypes = {
    post: PropTypes.object,
    request: PropTypes.object.isRequired,
};

export default SinglePostForm;