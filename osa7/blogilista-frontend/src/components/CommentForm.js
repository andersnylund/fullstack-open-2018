import React, { Component, } from 'react';
import { connect, } from 'react-redux';

import { changeCommentFormValue, addComment, } from '../reducers/blogReducer';
import { notify, } from '../reducers/notificationReducer';

import Button from '@material-ui/core/Button';

class CommentForm extends Component {

  changeValueTo = (value) => {
    this.props.changeCommentFormValue(value);
  }

  submit = (event) => {
    event.preventDefault();
    this.props.addComment(this.props.selectedBlog, this.props.blog.comment);
    this.props.notify(`Comment '${this.props.blog.comment}' added`, false);
    this.changeValueTo('');
  }

  render() {
    return (
      <div>
        <form action="submit" onSubmit={this.submit}>
          <input
            type="text"
            value={this.props.blog.comment}
            onChange={(e) => this.changeValueTo(e.target.value)}
          />
          <Button size='small' variant='contained' type='submit'>Add comment</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    blog: state.blogReducer,
  };
};

export default connect(
  mapStateToProps,
  {
    changeCommentFormValue,
    addComment,
    notify,
  }
)(CommentForm);