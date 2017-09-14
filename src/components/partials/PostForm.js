import React from 'react';

class PostForm extends React.Component {
  onSubmit (e) {
    e.preventDefault();

    const params = {
      title: this.title.value,
      body: this.body.value,
      author: this.author.value,
      category: this.category.value,
    }

    this.props.onSubmit(params);
  }

  render () {
    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            ref={input => this.title = input}
            required
            value={this.props.post && this.props.post.title}
            className="form-control" />
        </div>
        <div className="form-group">
          <label>Body</label>
          <textarea
            className="form-control"
            required
            ref={input => this.body = input}
            defaultValue={this.props.post && this.props.post.body}
            rows={4} />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            required
            ref={input => this.category = input}
            defaultValue={this.props.post && this.props.post.category}
            className="form-control">
            {
              this.props.categories.map((category, index) => (
                <option
                  value={category.name}
                  key={index}>
                  { category.name }
                </option>
              ))
            }
          </select>
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            required
            ref={input => this.author = input}
            defaultValue={this.props.post && this.props.post.author}
            className="form-control" />
        </div>
        <button
          type="submit"
          className="btn btn-primary">
          Save
        </button>
      </form>
    );
  }
}

export default PostForm;
