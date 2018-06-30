import React from 'react';

const LoginForm = props => {
	return (
		<div>
			<form method='post' onSubmit={props.onLogin}>
				<h2>Login</h2>
				<div>
					<input
						type='text'
						value={props.username}
						onChange={props.onChange}
						name='username'
					/>
				</div>
				<div>
					<input
						type='password'
						value={props.password}
						onChange={props.onChange}
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
