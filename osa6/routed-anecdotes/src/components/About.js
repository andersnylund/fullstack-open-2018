import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '../../node_modules/@material-ui/core';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
});

const About = (props) => {
	const { classes } = props;

	const imageStyle = {
		height: '100%',
		width: '100%'
	};

	return (
		<div className={classes.root}>
			<Grid container spacing={24}>
				<Grid item xs={6}>
					<Paper>
						<Typography variant='display2'>
							About anecdote app
						</Typography>
						<Typography variant='subheading'>
							According to Wikipedia:
						</Typography>
						<Typography variant='body1'>
							<em>
								An anecdote is a brief, revealing account of an individual person or an incident.
								Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
								An anecdote is &quot;a story with a point.&quot;
							</em>
						</Typography>
						<Typography variant='body2'>
							Software engineering is full of excellent anecdotes, at this app you can find the best and add more.
						</Typography>
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper>
						<img style={imageStyle} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Brian_Kernighan_in_2012_at_Bell_Labs_1.jpg/1200px-Brian_Kernighan_in_2012_at_Bell_Labs_1.jpg" alt=""/>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

About.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);