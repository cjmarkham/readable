import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { getCategories } from '../actions/category';
import Category from './pages/Category';
import PostNew from './pages/PostNew';
import PostEdit from './pages/PostEdit';
import CommentEdit from './pages/CommentEdit';
import Post from './pages/Post';

class App extends React.Component {
  componentDidMount () {
    this.props.getCategories();
  }

  renderCategory (category) {
    return (
      <li key={ category.name }>
        <Link to={`/category/${category.path}`}>
          { category.name }
        </Link>
      </li>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <ul className="list-unstyled">
                  <li>
                    <Link to="/">
                      Home
                    </Link>
                  </li>
                  {
                    this.props.categories &&
                    this.props.categories.map(category => this.renderCategory(category))
                  }
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="panel panel-default">
              <div className="panel-body">
                <Switch>
                  <Route exact path="/" component={Category} />
                  <Route path="/category/:category" component={Category} />
                  <Route exact path="/posts/new" component={PostNew} />
                  <Route exact path="/posts/:postId/edit" component={PostEdit} />
                  <Route exact path="/comments/:commentId/edit" component={CommentEdit} />
                  <Route path="/posts/:postId" component={Post} />
                  <Route render={() => (
                    <p>Four oh Four</p>
                  )} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ category }) => {
  return {
    categories: category.categories,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: data => {
      dispatch(getCategories())
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
