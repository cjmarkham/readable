import React from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Post from '../partials/Post';
import Sorting from '../partials/Sorting';
import Loading from '../partials/Loading';

class Category extends React.Component {
  componentWillReceiveProps (props) {
    // Category has changed
    if (props.match && props.match.params.category !== this.props.match.params.category) {
      this.getPosts(props.match.params.category)
    }
  }

  componentDidMount () {
    this.getPosts(this.props.match && this.props.match.params.category);
  }

  getPosts (category) {
    this.props.getPosts(category);
  }

  render() {
    const { posts } = this.props;

    if ( ! posts) {
      return <Loading />;
    }

    if (posts.error) {
      return <p>{ posts.error }</p>
    }

    return (
      <div>
        <h2>{ this.props.match.params.category || 'Home' }</h2>
        <div className="row">
          <div className="col-md-6">
            <Sorting onSort={(key, value) => this.props.getPosts(this.props.match.params.category, key, value)} />
          </div>
          <div className="col-md-6 text-right">
            <Link to="/posts/new" className="btn btn-primary btn-xs">
              Add post
            </Link>
          </div>
        </div>
        <hr />
        <ul className="list-unstyled">
          {
            posts.length !== 0
              ? posts.map(post => <Post key={post.id} post={post} />)
              : <p className="alert alert-warning">No posts to show for { this.props.match.params.category }</p>
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ post }) => {
  return {
    posts: post.posts,
  };
}

const mapDispatchToProps = dispatch => ({
  getPosts: (categoryId, sortAttr, sortDir) => dispatch(getPosts(categoryId, sortAttr, sortDir)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category));
