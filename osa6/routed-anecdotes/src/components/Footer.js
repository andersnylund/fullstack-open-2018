import React from 'react';
import { Typography } from '../../node_modules/@material-ui/core';


const Footer = () => (
	<div>
		<Typography>
			Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.
		</Typography>
		<Typography>
			See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
		</Typography>
	</div>
);

export default Footer;