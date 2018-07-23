import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import CssBaseline from '@material-ui/core/CssBaseline';

function MyApp() {
	return (
		<React.Fragment>
			<CssBaseline />
			<App />
		</React.Fragment>
	);
}

ReactDOM.render(<MyApp />, document.getElementById('root'));

