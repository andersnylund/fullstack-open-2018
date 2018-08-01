import React from 'react';
import PropTypes from 'prop-types';

import { Button, Grid, Typography, withStyles, } from '@material-ui/core';

const styles = {
  header: {
    textAlign: 'left',
  },
  info: {
    textAlign: 'right',
    display: 'flex',
    justifyContent: 'right',
  },
  infoItem: {
    padding: '10px 10px',
  },
};

const Header = (props) => {

  const { user, classes, onLogout, } = props;

  return (
    <Grid container spacing={24} className={classes.container}>
      <Grid item xs={6} className={classes.header}>
        <Typography variant='display3'>Blogs</Typography>
      </Grid>
      <Grid item xs={6}>
        {user !== null ?
          <div className={classes.info}>
            <Typography variant='subheading' className={classes.infoItem}><strong>{user.username}</strong> logged in</Typography>
            <Button size='small' variant='contained' onClick={onLogout} className={classes.infoItem}>Logout</Button>
          </div> :
          null}
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);

