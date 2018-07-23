import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	NavLink,
	Link
} from 'react-router-dom';
import { ListItem, List, ListItemText, Divider, Grid, Paper, Typography, withStyles } from '../node_modules/@material-ui/core';
import About from './components/About';
import Menu from './components/Menu';
import AnecdoteList from './components/AnecdoteList';
import Footer from './components/Footer';

const styles = () => ({
	applicationroot: {
		padding: 20
	}
});

const Notification = ({ message }) => {
	const notificationStyle = {
		color: 'green',
		padding: 10,
		borderStyle: 'solid',
		borderWidth: 1,
		borderRadius: 10,
		borderColor: 'green'
	};

	return (
		<div style={notificationStyle}>
			{message}
		</div>
	);
};



const DetailedAnecdote = ({ anecdote }) => {
	return (
		<div>
			<h2>{anecdote.content} by {anecdote.author}</h2>
			<p>{`has ${anecdote.votes} votes`}</p>
			<p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
		</div>
	);
};

class CreateNew extends React.Component {
	constructor() {
		super();
		this.state = {
			content: '',
			author: '',
			info: ''
		};
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.addNew({
			content: this.state.content,
			author: this.state.author,
			info: this.state.info,
			votes: 0
		});
		this.props.history.push('/');
	}

	render() {
		return(
			<div>
				<h2>create a new anecdote</h2>
				<form onSubmit={this.handleSubmit}>
					<div>
						content
						<input name='content' value={this.state.content} onChange={this.handleChange} />
					</div>
					<div>
						author
						<input name='author' value={this.state.author} onChange={this.handleChange} />
					</div>
					<div>
						url for more info
						<input name='info' value={this.state.info} onChange={this.handleChange} />
					</div>
					<button>create</button>
				</form>
			</div>
		);
	}
}

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			anecdotes: [
				{
					content: 'If it hurts, do it more often',
					author: 'Jez Humble',
					info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
					votes: 0,
					id: '1'
				},
				{
					content: 'Premature optimization is the root of all evil',
					author: 'Donald Knuth',
					info: 'http://wiki.c2.com/?PrematureOptimization',
					votes: 0,
					id: '2'
				}
			],
			notification: null
		};
	}

	addNew = (anecdote) => {
		anecdote.id = (Math.random() * 10000).toFixed(0);
		this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) });
		this.notify(`A new anecdote '${anecdote.content}' created!`);
	}

	anecdoteById = (id) =>
		this.state.anecdotes.find(a => a.id === id)

	vote = (id) => {
		const anecdote = this.anecdoteById(id);

		const voted = {
			...anecdote,
			votes: anecdote.votes + 1
		};

		const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a);

		this.setState({ anecdotes });
	}

	notify = (content) => {
		this.setState({ notification: content });
		setTimeout(() => this.setState({ notification: null }), 10000);
	}

	render() {
		return (
			<div className={this.props.classes.applicationroot}>
				<Router>
					<div>
						<Typography variant='display3'>
							Software anecdotes
						</Typography>
						<Menu />
						{this.state.notification ? <Notification message={this.state.notification}/> : null}
						<Route exact path='/anecdotes/:id' render={({ match }) =>
							<DetailedAnecdote anecdote={this.anecdoteById(match.params.id)} />}
						/>
						<Route exact path='/' render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
						<Route path='/about' render={() => <About />} />
						<Route path='/create' render={({ history }) => <CreateNew addNew={this.addNew} notify={this.notify} history={history}/>} />
						<Footer />
					</div>
				</Router>
			</div>
		);
	}
}

export default withStyles(styles)(App);
