import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';

const styles = {
	root: {
		flexGrow: 1,
	},
	items: {
		padding: 20,
		textDecoration: 'none'
	}
};

const Menu = (props) => {
	const { classes } = props;

	return (
		<div className={classes.root}>
			<AppBar position="static" color="default">
				<Toolbar>
					<NavLink exact to='/' className={classes.items}>
						<Typography variant="title">
							Anecdotes
						</Typography>
					</NavLink>
					<NavLink exact to='/create' className={classes.items}>
						<Typography variant="title">
							Create
						</Typography>
					</NavLink>
					<NavLink exact to='/about' className={classes.items}>
						<Typography variant="title">
							About
						</Typography>
					</NavLink>
				</Toolbar>
			</AppBar>
		</div>
	);
}

Menu.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Menu);