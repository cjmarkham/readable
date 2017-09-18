import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { editPost, getPost } from '../../actions/post';
import PostForm from '../partials/PostForm';

class PostEdit extends React.Component {
  componentDidMount () {
    this.props.getPost(this.props.match.params.postId);
  }

  editPost (data) {
    this.props.editPost(this.props.post.id, {
      title: data.title,
      body: data.body,
      author: data.author,
      category: data.category,
    });
  }

  componentWillReceiveProps (props) {
    if (props.reload) {
      props.history.push(`/posts/${props.post.id}`);
    }
  }

  render () {
    if ( ! this.props.categories || ! this.props.post) {
      return <p>Loading</p>;
    }

    return (
      <div>
        <h4>Edit post {this.props.post.id}</h4>
        <hr />
        <PostForm
          post={this.props.post}
          categories={this.props.categories}
          onSubmit={data => this.editPost(data)} />
      </div>
    );
  }
}

const mapStateToProps = ({ category, post }) => {
  return {
    categories: category.categories,
    post: post.post,
    reload: post.reload,
  };
}

const mapDispatchToProps = dispatch => ({
  getPost: postId => dispatch(getPost(postId)),
  editPost: (postId, params) => dispatch(editPost(postId, params)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostEdit));
