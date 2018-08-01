import React from 'react';
import { Link, } from 'react-router-dom';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText, Divider, withStyles, } from '@material-ui/core';

const styles = {
  link: {
    textDecoration: 'none',
  },
};

const BlogList = (props) => {
  const { blogs, classes, } = props;

  const sorted = blogs.sort((a, b) => {
    return a.likes < b.likes;
  });

  return (
    <div>
      <Divider />
      <List>
        {sorted.map(blog =>
          <ListItem button key={blog.id} onClick={this.handleExpand}>
            <Link to={`/blogs/${blog.id}`} className={classes.link}>
              <ListItemText primary={`${blog.title} by ${blog.author}`} />
            </Link>
          </ListItem>)}
      </List>
      <Divider />
    </div>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BlogList);