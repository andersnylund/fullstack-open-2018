import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, List, Divider, ListItem, ListItemText } from '../../node_modules/@material-ui/core';
import { Link } from 'react-router-dom';


const styles = () => ({
	header: {
		padding: 20
	}
});

const AnecdoteList = ({ anecdotes, classes }) => {

	const linkStyle = {
		textDecoration: 'none'
	};

	return (
		<div>
			<Typography variant='headline' className={classes.header}>
				Anecdotes
			</Typography>
			<List>
				{anecdotes.map(anecdote => {
					return (
						<div key={anecdote.id}>
							<Divider />
							<Link style={linkStyle} to={`/anecdotes/${anecdote.id}`}>
								<ListItem button >
									<ListItemText primary={anecdote.content}></ListItemText>
								</ListItem>
							</Link>
						</div>
					);
				})}
				<Divider />
			</List>
		</div>
	);
};

AnecdoteList.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AnecdoteList);