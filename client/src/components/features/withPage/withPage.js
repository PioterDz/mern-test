import React from 'react';

function withPage(WrappedComponent, postsPerPage, pagination) {
    return class extends React.Component {

        state = {
            pagination: pagination,
            postsPerPage: postsPerPage
        }

        componentDidMount() {
            const { loadPostsByPage, resetRequest, initialPage } = this.props;
            const { postsPerPage } = this.state;
        
            resetRequest();
            loadPostsByPage(!initialPage ? 1 : initialPage, postsPerPage);
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
            const { pagination, postsPerPage } = this.state;
            const { posts, request, pages, presentPage } = this.props;
            const { loadPostsPage, cutText } = this;
            
            return <WrappedComponent 
                pagination={pagination} 
                postsPerPage={postsPerPage} 
                posts={posts}
                request={request}
                pages={pages}
                presentPage={presentPage}
                loadPostsPage={loadPostsPage}
                cutText={cutText}
                {...this.props} />
        }
    };

}

export default withPage;