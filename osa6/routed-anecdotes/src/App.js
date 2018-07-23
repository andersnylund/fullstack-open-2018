import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	NavLink,
	Link
} from 'react-router-dom';

import { ListItem, List, ListItemText, Divider } from '../node_modules/@material-ui/core';

const Menu = () => {

	const baseStyle = {
		padding: 20,
		textDecoration: 'none'
	};

	const style = {
		...baseStyle,
		background: '#aaaaaa',
	};

	const activeStyle = {
		...baseStyle,
		padding: 20,
		background: '#cccccc',
	};

	return (
		<div style={style}>
			<NavLink exact to='/' style={style} activeStyle={activeStyle}>Anecdotes</NavLink>&nbsp;
			<NavLink exact to='/create' style={style} activeStyle={activeStyle}>Create new</NavLink>&nbsp;
			<NavLink exact to='/about' style={style} activeStyle={activeStyle}>About</NavLink>&nbsp;
		</div>
	);
};

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

const AnecdoteList = ({ anecdotes }) => {

	// FIXME this should be a global style. How to do that?
	const linkStyle = {
		textDecoration: 'none'
	};

	return (
		<div>
			<h2>Anecdotes</h2>
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

const DetailedAnecdote = ({ anecdote }) => {
	return (
		<div>
			<h2>{anecdote.content} by {anecdote.author}</h2>
			<p>{`has ${anecdote.votes} votes`}</p>
			<p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
		</div>
	);
};

const About = () => (
	<div>
		<h2>About anecdote app</h2>
		<p>According to Wikipedia:</p>

		<em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is &quot;a story with a point.&quot;</em>

		<p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
	</div>
);

const Footer = () => (
	<div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
	</div>
);

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
			<div>
				<Router>
					<div>
						<h1>Software anecdotes</h1>
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

export default App;
