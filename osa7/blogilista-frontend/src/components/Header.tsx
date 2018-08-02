import React from 'react';

import { Button, Grid, Typography, withStyles, } from '@material-ui/core';

const styles: any = {
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

interface IProps {
  user: {
    username: string,
  },
  classes: {
    container: string,
    header: string,
    infoItem: string,
    info: string
  },
  onLogout: any
}


const Header: React.SFC<IProps> = ({ user, classes, onLogout, }) => {

  return (
    <Grid container={true} spacing={24} className={classes.container}>
      <Grid item={true} xs={6} className={classes.header}>
        <Typography variant='display3'>Blogs</Typography>
      </Grid>
      <Grid item={true} xs={6}>
        {user ?
          <div className={classes.info}>
            <Typography variant='subheading' className={classes.infoItem}><strong>{user.username}</strong> logged in</Typography>
            <Button size='small' variant='contained' onClick={onLogout} className={classes.infoItem}>Logout</Button>
          </div> :
          null}
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Header);

