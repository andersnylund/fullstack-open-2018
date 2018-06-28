import React from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
    };
  }

  componentDidMount() {
    blogService.getAll().then(blogs => this.setState({ blogs, }));
  }

  handleLogin = async event => {
    event.preventDefault();

    const result = await loginService.login({
      username: this.state.username,
      password: this.state.password,
    });

    this.setState({
      user: result,
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
        </div>
      );
    }
    return (
      <div>
        <h2>Blogs</h2>
        <p>{this.state.user.name} logged in</p>
        <table>
          <tbody>
            {this.state.blogs.map(blog => <Blog key={blog._id} blog={blog} />)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
