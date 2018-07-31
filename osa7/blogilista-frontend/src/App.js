import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import blogService from './services/blogService';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import UserList from './components/UserList';

import { notify } from './reducers/notificationReducer';
import { loginUser, logoutUser, setUser, changeLoginFormValue } from './reducers/loginReducer';
import { changeBlogFormValue, setBlogs, addBlog, removeBlog } from './reducers/blogReducer';
import { setUsers } from './reducers/userReducer';
import User from './components/User';

class App extends React.Component {


  componentDidMount() {
    const blogiListaUser = window.localStorage.getItem('blogiListaUser');
    if (blogiListaUser) {
      this.props.setUser(JSON.parse(blogiListaUser));
    }
    this.setBlogs();
    this.setUsers();
  }


  setBlogs = async () => {
    try {
      this.props.setBlogs();
    } catch (exception) {
      console.error({ exception });
      this.props.notify('Network error', true);
    }
  }


  setUsers = async () => {
    try {
      this.props.setUsers();
    } catch (exception) {
      console.error({ exception });
      this.props.notify('Network error', true);
    }
  }


  handleLogin = async (event) => {
    event.preventDefault();
    try {
      await this.props.loginUser(
        this.props.login.username,
        this.props.login.password,
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
    this.props.logoutUser();
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
      await this.props.addBlog(newBlog, this.props.login.user.token);
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
      if (!this.props.login.user) {
        this.props.notify('Login and try again', true);
        return;
      }
      try {
        this.props.removeBlog(blogToDelete, this.props.login.user.token);
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
              username={this.props.login.username}
              password={this.props.login.password}
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

    return (
      <div>
        <h2>Blogs</h2>
        {this.props.login.user === null ?
          loginForm() :
          <Router>
            <div>
              <div><strong>{this.props.login.user.username}</strong> logged in</div>
              <button onClick={this.handleLogOut}>Logout</button>
              {blogForm()}
              <Route exact path="/" render={() =>
                <BlogList blogs={this.props.blog.blogs} user={this.props.login.user} onLike={this.handleLike} onDelete={this.handleDelete}></BlogList>
              } />
              <Route exact path="/users" render={({ history }) =>
                <UserList users={this.props.users} history={history}/>
              }/>
              <Route exact path="/users/:id" render={({ match }) =>
                this.props.users ? <User user={this.props.users.find(u => u.id === match.params.id)} /> : null
              } />
            </div>
          </Router>
        }
        <Notification message={this.props.notification.message} isError={this.props.notification.isError}></Notification>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    notification: state.notificationReducer,
    login: state.loginReducer,
    blog: state.blogReducer,
    users: state.userReducer,
  };
};


export default connect(
  mapStateToProps,
  {
    notify,
    loginUser,
    logoutUser,
    setUser,
    changeLoginFormValue,
    setBlogs,
    changeBlogFormValue,
    addBlog,
    removeBlog,
    setUsers,
  }
)(App);
