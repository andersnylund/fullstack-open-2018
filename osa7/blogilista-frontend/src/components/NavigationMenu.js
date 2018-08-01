import React from 'react';
import PropTypes from 'prop-types';

import { Link, } from 'react-router-dom';
import { Button, withStyles, } from '@material-ui/core';

const styles = {
  container: {
    padding: '10px 0px',
  },
  link: {
    textDecoration: 'none',
    padding: '10px 10px 10px 0px',
  },
};

const NavigationMenu = (props) => {
  const { classes, } = props;

  return (
    <div className={classes.container}>
      <Link to='/' className={classes.link}>
        <Button variant="contained" size="large" color="primary">
          Blogs
        </Button>
      </Link>
      <Link to='/users' className={classes.link}>
        <Button variant="contained" size="large" color="primary">
          Users
        </Button>
      </Link>
    </div>
  );
};

NavigationMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavigationMenu);