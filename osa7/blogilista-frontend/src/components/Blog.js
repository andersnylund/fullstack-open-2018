import React from 'react';
import PropTypes from 'prop-types';

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
  }

  handleExpand = () => {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    };

    const likeButton = () => {
      if(this.props.user && (!this.props.blog.user || this.props.blog.user.username === this.props.user.username)) {
        return (
          <div>
            <button onClick={() => this.props.onDelete(this.props.blog)}>Delete</button>
          </div>
        );
      } else {
        return null;
      }
    };

    const titleAndAuthor = () => {
      return (
        <div onClick={this.handleExpand} className='title'>
          {`${this.props.blog.title} by ${this.props.blog.author}`}
        </div>
      );
    };

    const expanded = () => {
      return (
        <div>
          <div onClick={this.handleExpand} >
            {`${this.props.blog.title} by ${this.props.blog.author}`}
          </div>
          <div>
            <a href={this.props.blog.url}>{this.props.blog.url}</a>
          </div>
          <div>
            {`${this.props.blog.likes} likes`}
            <button onClick={() => this.props.onLike(this.props.blog)}>Like</button>
          </div>
          <div>
            {`added by ${this.props.blog.user ? this.props.blog.user.name : 'unknown'}`}
          </div>
          {likeButton()}
        </div>
      );
    };

    return (
      <div style={blogStyle} className='wrapper'>
        {this.state.isExpanded ? expanded() : titleAndAuthor()}
      </div>
    );
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  user: PropTypes.any
};

export default Blog;
