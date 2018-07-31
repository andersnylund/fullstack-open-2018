import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BlogList = ({ blogs }) => {

  const sorted = blogs.sort((a, b) => {
    return a.likes < b.likes;
  });

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div>
      {sorted.map(blog =>
        <div key={blog.id} onClick={this.handleExpand} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{`${blog.title} by ${blog.author}`}</Link>
        </div>)}
    </div>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
};

export default BlogList;