import React from 'react';
import { PropTypes } from 'prop-types';

import PostsList from '../PostsList/PostsList';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import Pagination from '../../common/Pagination/Pagination';

const PostsPattern = (props) => {

    const { posts, request, pages, presentPage, pagination, loadPostsPage, cutText } = props;

    if (request.pending || request.success === null) return <Spinner />
    else if (!request.pending && request.error !== null) return <Alert variant={'error'} children={request.error} />
    else if (!request.pending && request.success && posts.length === 0) return <Alert variant={'info'} children={'no posts'} />
    else if (!request.pending && request.success && posts.length > 0) return (
        <div>      
            <PostsList posts={posts} cutText={cutText} />
            { pagination ? <Pagination presentPage={presentPage} pages={pages} onPageChange={loadPostsPage} /> : '' }
        </div>
    );

}

export default PostsPattern;