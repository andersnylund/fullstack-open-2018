import React from 'react';
import { connect } from 'react-redux';

import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import blogService from './services/blog_service';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

import { notify } from './reducers/notificationReducer';
import { login, logout, setUser, changeLoginFormValue } from './reducers/userReducer';
import { changeBlogFormValue, setBlogs, addBlog, removeBlog } from './reducers/blogReducer';

class App extends React.Component {
	

	componentDidMount() {
		const blogiListaUser = window.localStorage.getItem('blogiListaUser');
		if (blogiListaUser) {
			this.props.setUser(JSON.parse(blogiListaUser));
		}
		this.setBlogs();
	}


	setBlogs = async () => {
		try {
			this.props.setBlogs();
		} catch (exception) {
			console.error({ exception });
			this.props.notify('Network error', true);
		}
	}


	handleLogin = async (event) => {
		event.preventDefault();
		try {
			await this.props.login(
					this.props.user.username,
					this.props.user.password
			);
			this.setBlogs();
			this.props.notify('Logged in', false);
		} catch (exception) {
			console.error({exception});
			this.props.notify(exception.response.data.error, true);
		}
	};
	

	handleLogOut = () => {
		window.localStorage.removeItem('blogiListaUser');
		this.props.logout();
		this.props.notify('Logged out', false);
	};


	handleBlogFormChange = (event) => {
		this.props.changeBlogFormValue(event.target.name, event.target.value);
	}


	handleLoginFormChange = (event) => {
		this.props.changeLoginFormValue(event.target.name, event.target.value);
	};


	handleNewBlog = async (event, title, author, url) => {
		event.preventDefault();
		this.blogForm.toggleVisibility();
		const newBlog = { title, author, url };
		try {
			await this.props.addBlog(newBlog, this.props.user.user.token);
		} catch (exception) {
			this.props.notify('Network error', true);
			return;
		}
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
			if (!this.props.user.user) {
				this.props.notify('Login and try again', true);
				return;
			}
			try {
				this.props.removeBlog(blogToDelete, this.props.user.user.token);
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
							username={this.props.user.username}
							password={this.props.user.password}
							onLogin={this.handleLogin}
							onChange={this.handleLoginFormChange}
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
						onChange={this.handleBlogFormChange}
						title={this.props.blog.title}
						author={this.props.blog.author}
						url={this.props.blog.url}>
					</BlogForm>
				</Togglable>
			);
		};

		console.log('this.props', this.props);

		return (
			<div>
				<h2>Blogs</h2>
				{this.props.user.user === null ?
					loginForm() :
					<div>
						<div><strong>{this.props.user.user.username}</strong> logged in</div>
						<button onClick={this.handleLogOut}>Logout</button>
						{blogForm()}
						<BlogList blogs={this.props.blog.blogs} user={this.props.user.user} onLike={this.handleLike} onDelete={this.handleDelete}></BlogList>
					</div>
				}
				<Notification message={this.props.notification.message} isError={this.props.notification.isError}></Notification>
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		notification: state.notificationReducer,
		user: state.userReducer,
		blog: state.blogReducer,
	};
}


export default connect(
	mapStateToProps,
	{ 
		notify,
		login,
		logout,
		setUser,
		changeLoginFormValue,
		setBlogs,
		changeBlogFormValue,
		addBlog,
		removeBlog,
	}
)(App);
