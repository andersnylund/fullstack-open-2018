import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ onLogin, onChange, username, password }) => {
  return (
    <div>
      <form method='post' onSubmit={onLogin}>
        <h2>Login</h2>
        <div>
          <input
            type='text'
            value={username}
            onChange={onChange}
            name='username'
          />
        </div>
        <div>
          <input
            type='password'
            value={password}
            onChange={onChange}
            name='password'
          />
        </div>
        <div>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
