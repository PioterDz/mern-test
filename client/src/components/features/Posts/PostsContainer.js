import { connect } from 'react-redux';
import { getPosts, getRequest, loadPostsByPageRequest, getPages, resetRequest, getPresentPage, getInitialPage } from '../../../redux/postsRedux';

import Posts from './Posts';
import HomePage from '../../pages/Home/HomePage';

const mapStateToProps = state => ({
  posts: getPosts(state),
  request: getRequest(state),
  pages: getPages(state),
  presentPage: getPresentPage(state),
  initialPage: getInitialPage(state),
});

const mapDispatchToProps = dispatch => ({
  loadPostsByPage: (page, postsPerPage) => dispatch(loadPostsByPageRequest(page, postsPerPage)),
  resetRequest: () => dispatch(resetRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
export const Home = connect(mapStateToProps, mapDispatchToProps)(HomePage);