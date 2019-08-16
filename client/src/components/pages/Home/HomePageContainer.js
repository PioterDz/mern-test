import { connect } from 'react-redux';
import { getPosts, getRequest, loadPostsByPageRequest, getPages, resetRequest, getPresentPage, getInitialPage } from '../../../redux/postsRedux';
import HomePage from './HomePage';

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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);