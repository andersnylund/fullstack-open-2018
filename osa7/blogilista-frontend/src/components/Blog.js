import React from 'react';
import PropTypes from 'prop-types';

import CommentForm from '../components/CommentForm';

import Button from '@material-ui/core/Button';

const Blog = ({ user, blog, onLike, onDelete }) => {

  if (!blog) {
    return null;
  }

  const likeButton = () => {
    if(user && (!blog.user || blog.user.username === user.username)) {
      return (
        <div>
          <Button size='small' variant='contained' onClick={() => onDelete(blog)}>Delete</Button>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className='wrapper'>
      <h3>
        {`${blog.title} by ${blog.author}`}
      </h3>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {`${blog.likes} likes`}
        <Button size='small' variant='contained' onClick={() => onLike(blog)}>Like</Button>
      </div>
      <div>
        {`added by ${blog.user ? blog.user.name : 'unknown'}`}
      </div>
      {likeButton()}
      <div>
        <h3>Comments</h3>
        <ul>
          {blog.comments.map((c, index) => <li key={index}>{c}</li>)}
        </ul>
        <CommentForm selectedBlog={blog}/>
      </div>
    </div>
  );
};



Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  user: PropTypes.any
};

export default Blog;
