import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getPost, deletePost } from '../../actions/post';
import { getComments, createComment } from '../../actions/comment';
import moment from 'moment';
import Voting from '../partials/Voting';
import { voteUp, voteDown } from '../../actions/post';
import Comment from '../partials/Comment';
import { Link } from 'react-router-dom';
import Sorting from '../partials/Sorting';
import CommentForm from '../partials/CommentForm';
import Loading from '../partials/Loading';

class Post extends React.Component {
  componentDidMount () {
    const postId = this.props.match.params.postId;

    this.props.getPost(postId);
    this.props.getComments(postId);
  }

  render () {
    const { post, comments } = this.props;

    if ( ! post || ! comments) {
      return <Loading />;
    }

    return (
      <div>
        <div className="row">
          <div className="col-md-10">
            <h4>
              { post.title }
              <small>
                <Link to={`/posts/${post.id}/edit`} className="btn btn-xs btn-warning">
                  Edit
                </Link>
                &nbsp;
                <button onClick={() => this.props.deletePost(post.id)} className="btn btn-xs btn-danger">
                  Delete
                </button>
              </small>
            </h4>
            <div className="row">
              <div className="col-md-4">
                <p className="text-muted">by: { post.author }</p>
              </div>
              <div className="col-md-4">
                <p className="text-muted">in: { post.category }</p>
              </div>
              <div className="col-md-4">
                <date title={moment(post.timestamp).format('DD/MM/YY')} className="text-muted">
                  on: {moment(post.timestamp).format('DD/MM/YY')}
                </date>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <Voting
              onVoteUp={() => this.props.voteUp(post.id)}
              onVoteDown={() => this.props.voteDown(post.id)}
              object={post} />
          </div>
        </div>
        <hr />
        <div>
          { post.body }
        </div>
        <hr />
        <div className="row">
          <div className="col-md-6">
            <h4>Comments ({comments.length})</h4>
          </div>
          <div className="col-md-6 text-right">
            <Sorting onSort={(key, value) => this.props.getComments(post.id, key, value)} />
          </div>
        </div>
        <hr />
        {
          comments.length > 0
            ? comments.map((comment, index) => <Comment comment={comment} key={index} />)
            : <p className="alert alert-warning">No comments yet</p>
        }
        <CommentForm
          parentId={post.id}
          onSubmit={data => this.props.createComment(data)} />
      </div>
    )
  }
}

const mapStateToProps = ({ post, comment }) => {
  return {
    post: post.post,
    comments: comment.comments,
  };
}

const mapDispatchToProps = dispatch => ({
  getPost: postId => dispatch(getPost(postId)),
  deletePost: postId => dispatch(deletePost(postId)),
  getComments: (postId, sortAttr, sortDir) => dispatch(getComments(postId, sortAttr, sortDir)),
  voteUp: postId => {
    dispatch(voteUp(postId))
  },
  voteDown: postId => {
    dispatch(voteDown(postId))
  },
  createComment: data => dispatch(createComment(data)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
