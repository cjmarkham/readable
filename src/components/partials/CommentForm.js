import React from 'react';

class CommentForm extends React.Component {
  onSubmit (e) {
    e.preventDefault();

    const params = {
      id: new Date().getTime(),
      body: this.body.value,
      author: this.author.value,
      parentId: this.props.parentId,
    }

    this.props.onSubmit(params);
    this.body.value = '';
    this.author.value = '';
  }

  render () {
    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            required
            ref={input => this.author = input}
            defaultValue={this.props.comment && this.props.comment.author}
            className="form-control" />
        </div>
        <div className="form-group">
          <label>Body</label>
          <textarea
            className="form-control"
            required
            ref={input => this.body = input}
            defaultValue={this.props.comment && this.props.comment.body}
            rows={4} />
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

export default CommentForm;
