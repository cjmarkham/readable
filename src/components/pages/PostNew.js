import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createPost } from '../../actions/post';
import PostForm from '../partials/PostForm';
import moment from 'moment';

class PostNew extends React.Component {
  createPost (data) {
    this.props.createPost({
      id: moment().unix(),
      title: data.title,
      body: data.body,
      author: data.author,
      category: data.category,
      timestamp: moment().unix(),
    });
  }

  componentWillReceiveProps (props) {
    if (props.post) {
      props.history.push(`/category/${props.post.category}`);
    }
  }

  render () {
    if ( ! this.props.categories) {
      return <p>Loading</p>;
    }

    return (
      <div>
        <h4>Create a new post</h4>
        <hr />
        <PostForm
          categories={this.props.categories}
          onSubmit={data => this.createPost(data)} />
      </div>
    );
  }
}

const mapStateToProps = ({ category, post }) => {
  return {
    categories: category.categories,
    post: post.post,
  };
}

const mapDispatchToProps = dispatch => ({
  createPost: params => dispatch(createPost(params)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostNew));
