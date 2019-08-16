import React from 'react';
import { PropTypes } from 'prop-types';

import PostsList from '../PostsList/PostsList';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import Pagination from '../../common/Pagination/Pagination';


class PostsPattern extends React.Component {

    render() {
        const { posts, request, pages, presentPage, pagination, cutText, loadPostsPage } = this.props;

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

}

PostsPattern.propTypes = {
    posts: PropTypes.array.isRequired,
    request: PropTypes.object.isRequired,
    pages: PropTypes.number.isRequired,
    presentPage: PropTypes.number.isRequired,
    pagination: PropTypes.bool.isRequired,
    cutText: PropTypes.func.isRequired,
    loadPostsPage: PropTypes.func.isRequired,
};

export default PostsPattern;