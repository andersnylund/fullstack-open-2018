import React from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			blogs: [],
			username: '',
			password: '',
			user: null,
			notification: null,
			isError: false,
			title: '',
			author: '',
			url: '',
		};
	}

	setBlogs = () => {
		blogService.getAll()
		.then(blogs => this.setState({ blogs, }))
		.catch((error) => {
			console.error(error);
			this.notify('Network error', true);
		});
	}

	
	notify = (notification, isError) => {
		this.setState({
			notification,
			isError,
		});
		setTimeout(() => {
			this.setState({
				notification: null
			})
		}, 3000)
	}


	componentDidMount() {
		const blogiListaUser = window.localStorage.getItem('blogiListaUser');
		if (blogiListaUser) {
			this.setState({ user: JSON.parse(blogiListaUser), });
			this.setBlogs();
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
  	} catch (exception) {
  		console.error({exception});
			this.notify(exception.response.data.error, true);
  	}
	};
	

	handleLogOut = () => {
		window.localStorage.removeItem('blogiListaUser');
		this.setState({ 
			user: null, 
			username: '',
			password: '',
			blogs: [],
		});
		this.notify('Logged out', false);
	};


  handleChange = event => {
  	this.setState({ [event.target.name]: event.target.value, });
	};
	

	handleNewBlog = async (event, title, author, url) => {
		event.preventDefault();
		const newBlog = { title, author, url };
		let result;
		try {
			result = await blogService.post(newBlog, this.state.user.token);
		} catch (exception) {
			this.notify(exception, true);
			return;
		}
		this.setState({
			blogs: this.state.blogs.concat(result),
			title: '',
			author: '',
			url: '',
		});
		this.notify(`Added new blog '${result.title}'`, false);
	}


  render() {
  	if (this.state.user === null) {
  		return (
  			<div>
  				<LoginForm
  					username={this.state.username}
  					password={this.state.password}
  					onLogin={this.handleLogin}
  					onChange={this.handleChange}
  				/>
  				<Notification message={this.state.notification} isError={this.state.isError}></Notification>
  			</div>
  		);
		}
		
  	return (
  		<div>
  			<h2>Blogs</h2>
  			<p>{this.state.user.name} logged in</p>
				<button onClick={this.handleLogOut}>Log out</button>
				<table>
  				<tbody>
  					{this.state.blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
  				</tbody>
  			</table>
				<BlogForm 
					onNewBlog={this.handleNewBlog} 
					onChange={this.handleChange}
					title={this.state.title}
					author={this.state.author}
					url={this.state.url}>
				</BlogForm>
  			<Notification message={this.state.notification} isError={this.state.isError}></Notification>
  		</div>
  	);
  }
}

export default App;
