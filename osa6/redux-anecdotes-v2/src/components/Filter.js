import React from 'react';
import { changeFilter } from '../reducers/filterReducer';
import { connect } from 'react-redux';

class Filter extends React.Component {
	handleChange = (event) => {
		event.preventDefault();
		this.props.changeFilter(event.target.value);
	}
	render() {
		const style = {
			marginBottom: 10
		};

		return (
			<div style={style}>
				<div>Filter</div>
				<input onChange={this.handleChange}/>
			</div>
		);
	}
}

export default connect(
	null,
	{ changeFilter }
)(Filter);