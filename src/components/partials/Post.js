import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { voteUp, voteDown, deletePost } from '../../actions/post';
import Voting from './Voting';

const Post = props => {
  const { post } = props;

  return (
    <li className="row">
      <div className="col-md-10">
        <h4>
          <Link to={`/posts/${post.id}`}>
            { post.title }
          </Link>
        </h4>
        <div className="row">
          <div className="col-md-4">
            <p className="text-muted">by: { post.author }</p>
          </div>
          <div className="col-md-4">
            <date className="text-muted" title={moment(post.timestamp).format('DD/MM/YY')}>
              on: { moment(post.timestamp).format('DD/MM/YY') }
            </date>
          </div>
          <div className="col-md-4">
            <Link to={`/posts/${post.id}/edit`} className="btn btn-xs btn-warning">
              Edit
            </Link>
            &nbsp;
            <button onClick={() => props.deletePost(post.id)} className="btn btn-xs btn-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-2">
        <Voting
          onVoteUp={() => props.voteUp(post.id)}
          onVoteDown={() => props.voteDown(post.id)}
          object={post} />
      </div>
    </li>
  );
}

const mapStateToProps = () => {
  return {};
}

const mapDispatchToProps = dispatch => ({
  voteUp: postId => dispatch(voteUp(postId)),
  voteDown: postId => dispatch(voteDown(postId)),
  deletePost: postId => dispatch(deletePost(postId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Post);
