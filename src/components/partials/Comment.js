import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Voting from './Voting';
import { voteCommentUp, voteCommentDown, deleteComment } from '../../actions/comment';

class Comment extends React.Component {

  deleteComment (e) {
    e.preventDefault();
    this.props.deleteComment(this.props.comment.id);
  }

  render () {
    const { comment } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col-md-10">
            { comment.body }
          </div>
          <div className="col-md-2">
            <Voting
              onVoteUp={() => this.props.voteCommentUp(comment.id)}
              onVoteDown={() => this.props.voteCommentDown(comment.id)}
              object={comment} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <p className="text-muted">by: { comment.author }</p>
          </div>
          <div className="col-md-4">
            <p className="text-muted">on: {moment(comment.timestamp).format('DD/MM/YY')}</p>
          </div>
          <div className="col-md-4">
            <Link to={`/comments/${comment.id}/edit`} className="btn btn-warning btn-xs">
              Edit
            </Link>
            &nbsp;
            <button className="btn btn-danger btn-xs" onClick={e => this.deleteComment(e)}>Delete</button>
          </div>
        </div>
        <hr />
      </div>
    )
  }
};

const mapStateToProps = ({ post, comment }) => {
  return {
    post: post.post,
    comments: comment.comments,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    voteCommentUp: commentId => dispatch(voteCommentUp(commentId)),
    voteCommentDown: commentId => dispatch(voteCommentDown(commentId)),
    deleteComment: commentId => dispatch(deleteComment(commentId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
