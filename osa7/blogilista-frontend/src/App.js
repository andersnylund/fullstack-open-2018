import React from 'react';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import blogService from './services/blog_service';
import loginService from './services/login_service';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

import { notify } from './reducers/notificationReducer';
import { connect } from 'react-redux';

class App extends React.Component {
	
	
	constructor(props) {
		super(props);
		this.state = {
			blogs: [],
			username: '',
			password: '',
			loginVisible: false,
			user: null,
			title: '',
			author: '',
			url: '',
		};
	}

	
	componentDidMount() {
		const blogiListaUser = window.localStorage.getItem('blogiListaUser');
		if (blogiListaUser) {
			this.setState({ user: JSON.parse(blogiListaUser), });
		}
		this.setBlogs();
	}


	setBlogs = async () => {
		try {
			const blogs = await blogService.getAll();
			this.setState({ blogs });
		} catch (exception) {
			console.error({ exception });
			this.props.notify('Network error', true);
		}
	}


	handleLogin = async (event) => {
		event.preventDefault();

		try {
			const result = await loginService.login({
				username: this.state.username,
				password: this.state.password,
			});
			this.setState({
				user: result,
				username: '',
				password: '',
			});
			window.localStorage.setItem('blogiListaUser', JSON.stringify(result));
			this.setBlogs();
			this.props.notify('Logged in', false);
		} catch (exception) {
			console.error({exception});
			this.props.notify(exception.response.data.error, true);
		}
	};
	

	handleLogOut = () => {
		window.localStorage.removeItem('blogiListaUser');
		this.setState({ 
			user: null, 
			username: '',
			password: '',
		});
		this.props.notify('Logged out', false);
	};


	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value, });
	};
	

	handleNewBlog = async (event, title, author, url) => {
		event.preventDefault();
		this.blogForm.toggleVisibility();
		const newBlog = { title, author, url };
		let result;
		try {
			await blogService.post(newBlog, this.state.user.token);
			result = await blogService.getAll();
		} catch (exception) {
			this.props.notify('Network error', true);
			return;
		}
		this.setState({
			blogs: result,
			title: '',
			author: '',
			url: '',
		});
		this.props.notify(`Added new blog '${title}'`, false);
	}

	handleLike = async (blogToUpdate) => {
		try {
			const updatedBlog = { ...blogToUpdate };
			updatedBlog.likes = blogToUpdate.likes + 1;
			await blogService.put(updatedBlog);
			let newBlogList = [ ...this.state.blogs ];
			this.setState({
				blogs: newBlogList.filter(b => b.id !== blogToUpdate.id).concat(updatedBlog)
			});
			this.props.notify(`Liked blog '${blogToUpdate.title}'`, false);
		} catch (exception) {
			console.error({ exception });
			this.props.notify(exception.response.data.error, true);
		}
	};

	handleDelete = async (blogToDelete) => {
		if (window.confirm(`Delete '${blogToDelete.title}' by ${blogToDelete.author}?`)) {
			if (!this.state.user) {
				this.props.notify('Login and try again', true);
				return;
			}
			try {
				await blogService.remove(blogToDelete, this.state.user.token);
				let newBlogList = [ ...this.state.blogs ];
				this.setState({
					blogs: newBlogList.filter(b => b.id !== blogToDelete.id)
				});
			} catch (exception) {
				console.error({ exception });
				this.props.notify(exception.response.data.error, true);
			}
		}
	}


	render() {	
		const loginForm = () => {
			return (
				<div className='loginForm'>
					<Togglable buttonLabel='Login'>
						<LoginForm
							username={this.state.username}
							password={this.state.password}
							onLogin={this.handleLogin}
							onChange={this.handleChange}
						/>
					</Togglable>
				</div>
			);
		};
	
		const blogForm = () => {
			return (
				<Togglable buttonLabel='Add blog' ref={component => this.blogForm = component}>
					<BlogForm
						onNewBlog={this.handleNewBlog} 
						onChange={this.handleChange}
						title={this.state.title}
						author={this.state.author}
						url={this.state.url}>
					</BlogForm>
				</Togglable>
			);
		};

		return (
			<div>
				<h2>Blogs</h2>
				{this.state.user === null ?
					loginForm() :
					<div>
						<div><strong>{this.state.user.name}</strong> logged in</div>
						<button onClick={this.handleLogOut}>Logout</button>
						{blogForm()}
						<BlogList blogs={this.state.blogs} user={this.state.user} onLike={this.handleLike} onDelete={this.handleDelete}></BlogList>
					</div>
				}
				<Notification message={this.props.notification.message} isError={this.props.notification.isError}></Notification>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		notification: state.notificationReducer
	};
}

export default connect(
	mapStateToProps,
	{ notify }
)(App);
