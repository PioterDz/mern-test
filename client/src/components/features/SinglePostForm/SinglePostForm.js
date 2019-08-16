import React from 'react';
import { PropTypes } from 'prop-types';

import { FacebookProvider, Comments, ShareButton } from 'react-facebook';
import { withRouter } from 'react-router-dom';
import { BASE_URL } from '../../../config';

import PageTitle from '../../common/PageTitle/PageTitle';
import HtmlBox from '../../common/HtmlBox/HtmlBox';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';

const SinglePostForm = (props) => {

    const { post, request, location } = props;
    
    if (request.pending || request.success === null) return <Spinner />
    else if (!request.pending && request.error !== null) return <Alert variant={'error'} children={request.error} />
    else if (!request.pending && request.success && Object.keys(post).length === 0) return <Alert variant={'info'} children={'no posts'} />
    else if (!request.pending && request.success && Object.keys(post).length > 0)
    return (
      <div>
        <PageTitle>{ post.title }</PageTitle>
        <p>Author: { post.author }</p>
        <HtmlBox>{ post.content }</HtmlBox>

        <FacebookProvider appId="2683371941697520">
          <Comments href={`${BASE_URL}/${location.pathname}`} />
          <ShareButton href={`${BASE_URL}/${location.pathname}`}>
            Share
          </ShareButton>
        </FacebookProvider>
      </div>
    );

}

SinglePostForm.propTypes = {
    post: PropTypes.object,
    request: PropTypes.object.isRequired,
};

export default withRouter(props => <SinglePostForm {...props}/>);