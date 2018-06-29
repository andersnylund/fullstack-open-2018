import React from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			blogs: [],
			username: '',
			password: '',
			user: null,
			message: null,
		};
	}

	componentDidMount() {

		const blogiListaUser = window.localStorage.getItem('blogiListaUser');
		if (blogiListaUser) {
			this.setState({ user: JSON.parse(blogiListaUser), });
		}

		blogService.getAll()
			.then(blogs => this.setState({ blogs, }))
			.catch((error) => {
				console.error(error);
				this.setState({ message: 'Network error', });
				setTimeout(() => {
					this.setState({ message: null, });
				}, 5000);
			});
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
  	} catch (e) {
  		console.error(e);
  		this.setState({ message: 'Login failed', });
  		setTimeout(() => {
  			this.setState({ message: null, });
  		}, 5000);
  	}
	};
	
	handleLogOut = (event) => {
		window.localStorage.removeItem('blogiListaUser');
		this.setState({ 
			user: null, 
			username: '',
			password: '',
		});
	};

  handleChange = event => {
  	this.setState({ [event.target.name]: event.target.value, });
  };

  render() {
  	if (this.state.user === null) {
  		return (
  			<div>
  				<LoginForm
  					username={this.state.username}
  					password={this.state.password}
  					handleLogin={this.handleLogin}
  					handleChange={this.handleChange}
  				/>
  				<Notification message={this.state.message}></Notification>
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
  			<Notification message={this.state.message}></Notification>
  		</div>
  	);
  }
}

export default App;
