import React from 'react';

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

export default LoginForm;
