import { connect } from 'react-redux';
import { getRequest, resetRequest, getSinglePost, loadSinglePostRequest, editPostRequest } from '../../../redux/postsRedux';
import EditPost from './EditPost';

const mapStateToProps = state => ({
    singlePost: getSinglePost(state),
    request: getRequest(state),
});

const mapDispatchToProps = dispatch => ({
    editPost: (post, id) => dispatch(editPostRequest(post, id)),
    loadPost: (id) => dispatch(loadSinglePostRequest(id)),
    resetRequest: () => dispatch(resetRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
