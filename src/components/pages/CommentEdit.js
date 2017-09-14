import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { editComment, getComment } from '../../actions/comment';
import CommentForm from '../partials/CommentForm';

class CommentEdit extends React.Component {
  componentDidMount () {
    this.props.getComment(this.props.match.params.commentId);
  }

  editComment (data) {
    this.props.editComment(this.props.comment.id, {
      body: data.body,
    });
  }

  componentWillReceiveProps (props) {
    if (props.reload) {
      props.history.push(`/posts/${props.comment.parentId}`);
    }
  }

  render () {
    if ( ! this.props.comment) {
      return <p>Loading</p>;
    }

    return (
      <div>
        <h4>Edit comment</h4>
        <hr />
        <CommentForm
          comment={this.props.comment}
          onSubmit={data => this.editComment(data)} />
      </div>
    );
  }
}

const mapStateToProps = ({ comment }) => {
  return {
    comment: comment.comment,
    reload: comment.reload,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getComment: commentId => dispatch(getComment(commentId)),
    editComment: (commentId, params) => dispatch(editComment(commentId, params)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentEdit));
