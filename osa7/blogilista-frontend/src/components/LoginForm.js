import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

const LoginForm = ({ onLogin, onChange, username, password, }) => {
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
            className='usernameInput'
          />
        </div>
        <div>
          <input
            type='password'
            value={password}
            onChange={onChange}
            name='password'
            className='passwordInput'
          />
        </div>
        <div>
          <Button size='small' variant='contained' type='submit' className='loginButton'>Login</Button>
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
