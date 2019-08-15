import { connect } from 'react-redux';
import { compose } from 'redux';
import { getRequest, resetRequest, getSinglePost, loadSinglePostRequest, editPostRequest } from '../../../redux/postsRedux';
import EditPost from './EditPost';
import withPost from '../withPost/withPost';

const mapStateToProps = state => ({
    singlePost: getSinglePost(state),
    request: getRequest(state),
});

const mapDispatchToProps = dispatch => ({
    editPost: (post, id) => dispatch(editPostRequest(post, id)),
    loadPost: (id) => dispatch(loadSinglePostRequest(id)),
    resetRequest: () => dispatch(resetRequest()),
});

// export default connect(mapStateToProps, mapDispatchToProps)(EditPost);


const enhance = compose(
  withPost,
  connect(mapStateToProps, mapDispatchToProps)
)
export default enhance(EditPost);